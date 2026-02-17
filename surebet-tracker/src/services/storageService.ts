import { db, SurebetRecord, LegRecord, SurebetStatus } from './database';
import { v4 as uuidv4 } from 'uuid';

export interface LegData {
  eventName?: string;
  selection?: string;
  odds?: number;
  stake?: number;
  eventDate?: string;
  bookmaker?: string;
  confidence?: number;
}

export const storageService = {
  // ============================================
  // SUREBETS - CRUD
  // ============================================

  async createSurebet(): Promise<SurebetRecord & { legs: LegRecord[] }> {
    const surebet: SurebetRecord = {
      uuid: uuidv4(),
      status: 'created',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.transaction('rw', db.surebets, db.legs, async () => {
      const surebetId = await db.surebets.add(surebet);

      const legs: LegRecord[] = [
        { surebetId: surebetId as number, order: 1, status: 'empty' },
        { surebetId: surebetId as number, order: 2, status: 'empty' },
        { surebetId: surebetId as number, order: 3, status: 'empty' },
      ];

      await db.legs.bulkAdd(legs);

      const insertedLegs = await db.legs
        .where('surebetId')
        .equals(surebetId as number)
        .sortBy('order');

      return {
        ...surebet,
        id: surebetId as number,
        legs: insertedLegs,
      };
    });

    return result;
  },

  async getSurebetById(
    id: number
  ): Promise<(SurebetRecord & { legs: LegRecord[] }) | null> {
    const surebet = await db.surebets.get(id);
    if (!surebet) return null;

    const legs = await db.legs.where('surebetId').equals(id).sortBy('order');

    return { ...surebet, legs };
  },

  async getAllSurebets(options?: {
    status?: SurebetStatus;
    limit?: number;
    offset?: number;
  }): Promise<(SurebetRecord & { legs: LegRecord[] })[]> {
    let results = await db.surebets.orderBy('updatedAt').reverse().toArray();

    if (options?.status) {
      results = results.filter((s) => s.status === options.status);
    }

    if (options?.offset) {
      results = results.slice(options.offset);
    }

    if (options?.limit) {
      results = results.slice(0, options.limit);
    }

    const surebetsWithLegs = await Promise.all(
      results.map(async (surebet) => {
        const legs = await db.legs
          .where('surebetId')
          .equals(surebet.id!)
          .sortBy('order');
        return { ...surebet, legs };
      })
    );

    return surebetsWithLegs;
  },

  async updateSurebet(id: number, data: Partial<SurebetRecord>): Promise<void> {
    await db.surebets.update(id, {
      ...data,
      updatedAt: new Date(),
    });
  },

  async deleteSurebet(id: number): Promise<void> {
    await db.transaction('rw', db.surebets, db.legs, async () => {
      await db.legs.where('surebetId').equals(id).delete();
      await db.surebets.delete(id);
    });
  },

  // ============================================
  // LEGS
  // ============================================

  async updateLegFromExtraction(
    legId: number,
    extractedData: LegData
  ): Promise<void> {
    const potentialReturn =
      extractedData.odds && extractedData.stake
        ? parseFloat((extractedData.odds * extractedData.stake).toFixed(2))
        : undefined;

    const hasRequiredFields =
      extractedData.eventName &&
      extractedData.selection &&
      extractedData.odds &&
      extractedData.stake;

    await db.legs.update(legId, {
      status: hasRequiredFields ? 'filled' : 'captured',
      eventName: extractedData.eventName || undefined,
      selection: extractedData.selection || undefined,
      odds: extractedData.odds || undefined,
      stake: extractedData.stake || undefined,
      eventDate: extractedData.eventDate
        ? new Date(extractedData.eventDate)
        : undefined,
      bookmaker: extractedData.bookmaker || undefined,
      potentialReturn,
      confidence: extractedData.confidence || undefined,
      extractedAt: new Date(),
    });

    const leg = await db.legs.get(legId);
    if (leg) {
      await this.recalculateSurebetStatus(leg.surebetId);
    }
  },

  async updateLeg(legId: number, data: Partial<LegRecord>): Promise<void> {
    const currentLeg = await db.legs.get(legId);
    if (!currentLeg) return;

    const updatedData = { ...currentLeg, ...data };

    if (updatedData.odds && updatedData.stake) {
      updatedData.potentialReturn = parseFloat(
        (updatedData.odds * updatedData.stake).toFixed(2)
      );
    }

    const hasRequiredFields =
      updatedData.eventName &&
      updatedData.selection &&
      updatedData.odds &&
      updatedData.stake;

    if (hasRequiredFields && updatedData.status !== 'filled') {
      updatedData.status = 'filled';
    }

    await db.legs.update(legId, updatedData);

    await this.recalculateSurebetStatus(currentLeg.surebetId);
  },

  async setLegScreenshot(legId: number, screenshot: string): Promise<void> {
    const leg = await db.legs.get(legId);
    if (!leg) return;

    await db.legs.update(legId, {
      screenshot,
      status: leg.status === 'empty' ? 'captured' : leg.status,
    });
  },

  async clearLeg(legId: number): Promise<void> {
    const leg = await db.legs.get(legId);
    if (!leg) return;

    await db.legs.update(legId, {
      status: 'empty',
      eventName: undefined,
      selection: undefined,
      odds: undefined,
      stake: undefined,
      eventDate: undefined,
      bookmaker: undefined,
      potentialReturn: undefined,
      confidence: undefined,
      screenshot: undefined,
      extractedAt: undefined,
    });

    await this.recalculateSurebetStatus(leg.surebetId);
  },

  // ============================================
  // CÁLCULOS AUTOMÁTICOS
  // ============================================

  async recalculateSurebetStatus(surebetId: number): Promise<void> {
    const legs = await db.legs.where('surebetId').equals(surebetId).toArray();

    const filledLegs = legs.filter((l) => l.status === 'filled');
    const requiredLegs = legs.filter((l) => l.order <= 2);
    const requiredFilled = requiredLegs.filter((l) => l.status === 'filled');

    let status: SurebetStatus;
    if (filledLegs.length === 0) {
      status = 'created';
    } else if (requiredFilled.length >= 2) {
      status = 'completed';
    } else {
      status = 'in_progress';
    }

    let totalStake = 0;
    let expectedProfit = 0;
    let profitPercentage = 0;

    if (status === 'completed' && filledLegs.length >= 2) {
      totalStake = filledLegs.reduce((sum, leg) => sum + (leg.stake || 0), 0);

      const returns = filledLegs
        .filter((l) => l.potentialReturn !== undefined)
        .map((l) => l.potentialReturn!);

      if (returns.length > 0) {
        const minReturn = Math.min(...returns);
        expectedProfit = parseFloat((minReturn - totalStake).toFixed(2));
        profitPercentage =
          totalStake > 0
            ? parseFloat(((expectedProfit / totalStake) * 100).toFixed(2))
            : 0;
      }
    }

    await db.surebets.update(surebetId, {
      status,
      totalStake: totalStake || undefined,
      expectedProfit: expectedProfit || undefined,
      profitPercentage: profitPercentage || undefined,
      updatedAt: new Date(),
    });
  },

  // ============================================
  // SETTINGS (API Key, etc)
  // ============================================

  async getApiKey(): Promise<string | null> {
    const setting = await db.settings.get('gemini_api_key');
    return setting?.value || null;
  },

  async setApiKey(key: string): Promise<void> {
    await db.settings.put({ key: 'gemini_api_key', value: key });
  },

  // ============================================
  // ESTATÍSTICAS
  // ============================================

  async getStats(dateRange?: { start: Date; end: Date }): Promise<{
    total: number;
    completed: number;
    inProgress: number;
    created: number;
    totalProfit: number;
    avgProfitPercentage: number;
    byBookmaker: Record<string, number>;
  }> {
    let surebets = await db.surebets.toArray();

    if (dateRange) {
      surebets = surebets.filter(
        (s) => s.createdAt >= dateRange.start && s.createdAt <= dateRange.end
      );
    }

    const completed = surebets.filter((s) => s.status === 'completed');

    const filledLegs = await db.legs.where('status').equals('filled').toArray();
    const byBookmaker: Record<string, number> = {};
    filledLegs.forEach((leg) => {
      if (leg.bookmaker) {
        byBookmaker[leg.bookmaker] = (byBookmaker[leg.bookmaker] || 0) + 1;
      }
    });

    const totalProfit = completed.reduce(
      (sum, s) => sum + (s.expectedProfit || 0),
      0
    );
    const avgProfitPercentage =
      completed.length > 0
        ? completed.reduce((sum, s) => sum + (s.profitPercentage || 0), 0) /
          completed.length
        : 0;

    return {
      total: surebets.length,
      completed: completed.length,
      inProgress: surebets.filter((s) => s.status === 'in_progress').length,
      created: surebets.filter((s) => s.status === 'created').length,
      totalProfit: parseFloat(totalProfit.toFixed(2)),
      avgProfitPercentage: parseFloat(avgProfitPercentage.toFixed(2)),
      byBookmaker,
    };
  },

  // ============================================
  // BUSCA
  // ============================================

  async searchSurebets(query: string): Promise<SurebetRecord[]> {
    if (!query.trim()) {
      return this.getAllSurebets();
    }

    const queryLower = query.toLowerCase().trim();
    const allLegs = await db.legs.toArray();

    const matchingSurebetIds = new Set(
      allLegs
        .filter(
          (leg) =>
            leg.eventName?.toLowerCase().includes(queryLower) ||
            leg.selection?.toLowerCase().includes(queryLower) ||
            leg.bookmaker?.toLowerCase().includes(queryLower)
        )
        .map((leg) => leg.surebetId)
    );

    if (matchingSurebetIds.size === 0) return [];

    return db.surebets
      .where('id')
      .anyOf([...matchingSurebetIds])
      .reverse()
      .sortBy('updatedAt');
  },

  // ============================================
  // EXPORT / IMPORT
  // ============================================

  async exportToJSON(): Promise<string> {
    const surebets = await db.surebets.toArray();
    const legs = await db.legs.toArray();

    return JSON.stringify(
      {
        version: 1,
        exportedAt: new Date().toISOString(),
        surebets,
        legs,
      },
      null,
      2
    );
  },

  async importFromJSON(
    jsonString: string
  ): Promise<{ imported: number; errors: number }> {
    const data = JSON.parse(jsonString);
    let imported = 0;
    let errors = 0;

    await db.transaction('rw', db.surebets, db.legs, async () => {
      for (const surebet of data.surebets) {
        try {
          const oldId = surebet.id;
          delete surebet.id;

          const newId = await db.surebets.add({
            ...surebet,
            createdAt: new Date(surebet.createdAt),
            updatedAt: new Date(surebet.updatedAt),
          });

          const surebetLegs = data.legs.filter(
            (l: LegRecord) => l.surebetId === oldId
          );
          for (const leg of surebetLegs) {
            delete leg.id;
            await db.legs.add({
              ...leg,
              surebetId: newId as number,
              eventDate: leg.eventDate ? new Date(leg.eventDate) : undefined,
              extractedAt: leg.extractedAt
                ? new Date(leg.extractedAt)
                : undefined,
            });
          }

          imported++;
        } catch (err) {
          console.error('Erro ao importar surebet:', err);
          errors++;
        }
      }
    });

    return { imported, errors };
  },

  // ============================================
  // MANUTENÇÃO
  // ============================================

  async deleteOlderThan(days: number): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const oldSurebets = await db.surebets
      .where('createdAt')
      .below(cutoffDate)
      .toArray();

    const idsToDelete = oldSurebets.map((s) => s.id!);

    if (idsToDelete.length === 0) return 0;

    await db.transaction('rw', db.surebets, db.legs, async () => {
      await db.legs.where('surebetId').anyOf(idsToDelete).delete();
      await db.surebets.bulkDelete(idsToDelete);
    });

    return idsToDelete.length;
  },

  async getDatabaseSize(): Promise<{
    surebets: number;
    legs: number;
    estimatedKB: number;
  }> {
    const surebetsCount = await db.surebets.count();
    const legsCount = await db.legs.count();
    const estimatedKB = Math.round(surebetsCount * 2 + legsCount * 0.5);

    return { surebets: surebetsCount, legs: legsCount, estimatedKB };
  },

  async clearAll(): Promise<void> {
    await db.transaction('rw', db.surebets, db.legs, async () => {
      await db.legs.clear();
      await db.surebets.clear();
    });
  },
};

// Legacy helpers for compatibility
export function createNewSurebet() {
  return storageService.createSurebet();
}

export function calculateSurebetStatus(surebet: {
  legs: Array<{ status: string }>;
}): SurebetStatus {
  const filledLegs = surebet.legs.filter((l) => l.status === 'filled').length;
  const requiredFilled = surebet.legs
    .filter((_l, i) => i < 2)
    .filter((l) => l.status === 'filled').length;

  if (filledLegs === 0) return 'created';
  if (requiredFilled >= 2) return 'completed';
  return 'in_progress';
}

export function calculateExpectedProfit(surebet: {
  legs: Array<{ data?: { stake?: number; potentialReturn?: number } }>;
}): { totalStake: number; expectedProfit: number } {
  const filledLegs = surebet.legs.filter((l) => l.data);

  if (filledLegs.length < 2) {
    return { totalStake: 0, expectedProfit: 0 };
  }

  const totalStake = filledLegs.reduce(
    (sum, leg) => sum + (leg.data?.stake || 0),
    0
  );

  const minReturn = Math.min(
    ...filledLegs.map((leg) => leg.data?.potentialReturn || 0)
  );

  return {
    totalStake,
    expectedProfit: parseFloat((minReturn - totalStake).toFixed(2)),
  };
}

export function updateLegData(
  leg: LegRecord,
  data: Partial<LegData>
): LegRecord {
  const updatedLeg = { ...leg };

  if (data.eventName !== undefined) updatedLeg.eventName = data.eventName;
  if (data.selection !== undefined) updatedLeg.selection = data.selection;
  if (data.odds !== undefined) updatedLeg.odds = data.odds;
  if (data.stake !== undefined) updatedLeg.stake = data.stake;
  if (data.bookmaker !== undefined) updatedLeg.bookmaker = data.bookmaker;
  if (data.confidence !== undefined) updatedLeg.confidence = data.confidence;
  if (data.eventDate !== undefined)
    updatedLeg.eventDate = new Date(data.eventDate);

  if (updatedLeg.odds && updatedLeg.stake) {
    updatedLeg.potentialReturn = parseFloat(
      (updatedLeg.odds * updatedLeg.stake).toFixed(2)
    );
  }

  const hasRequiredFields =
    updatedLeg.eventName &&
    updatedLeg.selection &&
    updatedLeg.odds &&
    updatedLeg.stake;

  updatedLeg.status = hasRequiredFields ? 'filled' : 'captured';

  return updatedLeg;
}
