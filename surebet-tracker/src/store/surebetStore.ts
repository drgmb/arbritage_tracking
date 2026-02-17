import { create } from 'zustand';
import { SurebetRecord, LegRecord } from '../services/database';
import { storageService, LegData } from '../services/storageService';

type View = 'list' | 'editor' | 'settings';

export type SurebetWithLegs = SurebetRecord & { legs: LegRecord[] };

interface SurebetStore {
  surebets: SurebetWithLegs[];
  currentSurebet: SurebetWithLegs | null;
  currentLegId: number | null;
  isLoading: boolean;
  isExtracting: boolean;
  error: string | null;
  view: View;
  apiKey: string | null;

  loadSurebets: () => Promise<void>;
  createSurebet: () => Promise<SurebetWithLegs>;
  selectSurebet: (id: number) => Promise<void>;
  updateLeg: (legId: number, data: Partial<LegData>) => Promise<void>;
  setLegScreenshot: (legId: number, screenshot: string) => Promise<void>;
  deleteSurebet: (id: number) => Promise<void>;
  saveCurrent: () => Promise<void>;
  setView: (view: View) => void;
  setCurrentLegId: (legId: number | null) => void;
  setIsExtracting: (isExtracting: boolean) => void;
  setError: (error: string | null) => void;
  loadApiKey: () => Promise<void>;
  saveApiKey: (key: string) => Promise<void>;
  goBack: () => void;
  refreshCurrentSurebet: () => Promise<void>;
}

export const useSurebetStore = create<SurebetStore>((set, get) => ({
  surebets: [],
  currentSurebet: null,
  currentLegId: null,
  isLoading: false,
  isExtracting: false,
  error: null,
  view: 'list',
  apiKey: null,

  loadSurebets: async () => {
    set({ isLoading: true, error: null });
    try {
      const surebets = await storageService.getAllSurebets();
      set({ surebets, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Erro ao carregar',
        isLoading: false,
      });
    }
  },

  createSurebet: async () => {
    const newSurebet = await storageService.createSurebet();
    set((state) => ({
      surebets: [newSurebet, ...state.surebets],
      currentSurebet: newSurebet,
      view: 'editor',
    }));
    return newSurebet;
  },

  selectSurebet: async (id: number) => {
    const surebet = await storageService.getSurebetById(id);
    if (surebet) {
      set({ currentSurebet: surebet, view: 'editor' });
    }
  },

  updateLeg: async (legId: number, data: Partial<LegData>) => {
    const { currentSurebet } = get();
    if (!currentSurebet) return;

    // Find the leg and update it
    const leg = currentSurebet.legs.find((l) => l.id === legId);
    if (!leg) return;

    // Convert LegData to LegRecord partial
    const legRecordData: Partial<LegRecord> = {};
    if (data.eventName !== undefined) legRecordData.eventName = data.eventName;
    if (data.selection !== undefined) legRecordData.selection = data.selection;
    if (data.odds !== undefined) legRecordData.odds = data.odds;
    if (data.stake !== undefined) legRecordData.stake = data.stake;
    if (data.bookmaker !== undefined) legRecordData.bookmaker = data.bookmaker;
    if (data.confidence !== undefined) legRecordData.confidence = data.confidence;
    if (data.eventDate !== undefined) {
      legRecordData.eventDate = new Date(data.eventDate);
    }

    await storageService.updateLeg(legId, legRecordData);

    // Refresh current surebet
    await get().refreshCurrentSurebet();
  },

  setLegScreenshot: async (legId: number, screenshot: string) => {
    await storageService.setLegScreenshot(legId, screenshot);
    await get().refreshCurrentSurebet();
  },

  deleteSurebet: async (id: number) => {
    await storageService.deleteSurebet(id);
    set((state) => ({
      surebets: state.surebets.filter((s) => s.id !== id),
      currentSurebet:
        state.currentSurebet?.id === id ? null : state.currentSurebet,
      view: state.currentSurebet?.id === id ? 'list' : state.view,
    }));
  },

  saveCurrent: async () => {
    const { currentSurebet } = get();
    if (!currentSurebet || !currentSurebet.id) return;

    set({ isLoading: true });
    try {
      await storageService.updateSurebet(currentSurebet.id, {
        notes: currentSurebet.notes,
      });

      // Reload surebets list
      const surebets = await storageService.getAllSurebets();
      set({
        surebets,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Erro ao salvar',
        isLoading: false,
      });
    }
  },

  refreshCurrentSurebet: async () => {
    const { currentSurebet } = get();
    if (!currentSurebet?.id) return;

    const refreshed = await storageService.getSurebetById(currentSurebet.id);
    if (refreshed) {
      set({ currentSurebet: refreshed });

      // Also update in the list
      set((state) => ({
        surebets: state.surebets.map((s) =>
          s.id === refreshed.id ? refreshed : s
        ),
      }));
    }
  },

  setView: (view: View) => set({ view }),

  setCurrentLegId: (legId: number | null) => set({ currentLegId: legId }),

  setIsExtracting: (isExtracting: boolean) => set({ isExtracting }),

  setError: (error: string | null) => set({ error }),

  loadApiKey: async () => {
    const apiKey = await storageService.getApiKey();
    set({ apiKey });
  },

  saveApiKey: async (key: string) => {
    await storageService.setApiKey(key);
    set({ apiKey: key });
  },

  goBack: () => {
    const { view, currentSurebet } = get();
    if (view === 'editor' && currentSurebet) {
      get().saveCurrent();
    }
    set({ view: 'list', currentSurebet: null, currentLegId: null });
  },
}));
