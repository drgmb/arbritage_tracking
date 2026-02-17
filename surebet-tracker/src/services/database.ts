import Dexie, { Table } from 'dexie';

// ============== TIPOS ==============

export type SurebetStatus = 'created' | 'in_progress' | 'completed';
export type LegStatus = 'empty' | 'captured' | 'filled';

export interface SurebetRecord {
  id?: number;
  uuid: string;
  status: SurebetStatus;
  createdAt: Date;
  updatedAt: Date;
  totalStake?: number;
  expectedProfit?: number;
  profitPercentage?: number;
  notes?: string;
  tags?: string[];
}

export interface LegRecord {
  id?: number;
  surebetId: number;
  order: 1 | 2 | 3;
  status: LegStatus;
  eventName?: string;
  selection?: string;
  odds?: number;
  stake?: number;
  eventDate?: Date;
  bookmaker?: string;
  potentialReturn?: number;
  confidence?: number;
  screenshot?: string;
  extractedAt?: Date;
}

export interface SettingsRecord {
  key: string;
  value: string;
}

// ============== DATABASE ==============

class SurebetDatabase extends Dexie {
  surebets!: Table<SurebetRecord>;
  legs!: Table<LegRecord>;
  settings!: Table<SettingsRecord>;

  constructor() {
    super('SurebetTrackerDB');

    this.version(1).stores({
      surebets: '++id, uuid, status, createdAt, updatedAt, expectedProfit',
      legs: '++id, surebetId, order, status, eventDate, bookmaker',
      settings: 'key',
    });
  }
}

export const db = new SurebetDatabase();

// Debug helper
if (typeof window !== 'undefined') {
  (window as unknown as { db: SurebetDatabase }).db = db;
}
