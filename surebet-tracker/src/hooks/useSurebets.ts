import { useState, useEffect, useCallback } from 'react';
import { storageService, LegData } from '../services/storageService';
import { SurebetRecord, LegRecord, SurebetStatus } from '../services/database';

export type SurebetWithLegs = SurebetRecord & { legs: LegRecord[] };

/**
 * Hook para listar e gerenciar múltiplas surebets
 */
export function useSurebets(filterStatus?: SurebetStatus) {
  const [surebets, setSurebets] = useState<SurebetWithLegs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await storageService.getAllSurebets({
        status: filterStatus,
      });
      setSurebets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar surebets');
      console.error('useSurebets error:', err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createSurebet = useCallback(async () => {
    const newSurebet = await storageService.createSurebet();
    await refresh();
    return newSurebet;
  }, [refresh]);

  const deleteSurebet = useCallback(
    async (id: number) => {
      await storageService.deleteSurebet(id);
      await refresh();
    },
    [refresh]
  );

  const searchSurebets = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        await refresh();
        return;
      }
      setLoading(true);
      const results = await storageService.searchSurebets(query);
      // Need to fetch legs for search results
      const resultsWithLegs = await Promise.all(
        results.map(async (surebet) => {
          const full = await storageService.getSurebetById(surebet.id!);
          return full!;
        })
      );
      setSurebets(resultsWithLegs.filter(Boolean) as SurebetWithLegs[]);
      setLoading(false);
    },
    [refresh]
  );

  return {
    surebets,
    loading,
    error,
    refresh,
    createSurebet,
    deleteSurebet,
    searchSurebets,
  };
}

/**
 * Hook para gerenciar uma surebet específica com suas legs
 */
export function useSurebet(id: number | null) {
  const [surebet, setSurebet] = useState<SurebetWithLegs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (id === null) {
      setSurebet(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await storageService.getSurebetById(id);
      setSurebet(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar surebet');
      console.error('useSurebet error:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateLegFromExtraction = useCallback(
    async (legId: number, data: LegData) => {
      await storageService.updateLegFromExtraction(legId, data);
      await refresh();
    },
    [refresh]
  );

  const updateLeg = useCallback(
    async (legId: number, data: Partial<LegRecord>) => {
      await storageService.updateLeg(legId, data);
      await refresh();
    },
    [refresh]
  );

  const setLegScreenshot = useCallback(
    async (legId: number, screenshot: string) => {
      await storageService.setLegScreenshot(legId, screenshot);
      await refresh();
    },
    [refresh]
  );

  const clearLeg = useCallback(
    async (legId: number) => {
      await storageService.clearLeg(legId);
      await refresh();
    },
    [refresh]
  );

  const updateNotes = useCallback(
    async (notes: string) => {
      if (id) {
        await storageService.updateSurebet(id, { notes });
        await refresh();
      }
    },
    [id, refresh]
  );

  return {
    surebet,
    loading,
    error,
    refresh,
    updateLegFromExtraction,
    updateLeg,
    setLegScreenshot,
    clearLeg,
    updateNotes,
  };
}

/**
 * Hook para estatísticas
 */
export function useStats() {
  const [stats, setStats] = useState<Awaited<
    ReturnType<typeof storageService.getStats>
  > | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(
    async (dateRange?: { start: Date; end: Date }) => {
      setLoading(true);
      const data = await storageService.getStats(dateRange);
      setStats(data);
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { stats, loading, refresh };
}

/**
 * Hook para API key
 */
export function useApiKey() {
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storageService.getApiKey().then((key) => {
      setApiKeyState(key);
      setLoading(false);
    });
  }, []);

  const saveApiKey = useCallback(async (key: string) => {
    await storageService.setApiKey(key);
    setApiKeyState(key);
  }, []);

  return { apiKey, loading, saveApiKey };
}
