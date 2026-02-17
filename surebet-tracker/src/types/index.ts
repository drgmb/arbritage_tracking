// Re-export types from database for backward compatibility
export type {
  SurebetRecord as Surebet,
  LegRecord as Leg,
  SurebetStatus,
  LegStatus,
} from '../services/database';

export type { LegData } from '../services/storageService';

export interface SelectionBox {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface GeminiExtractionResult {
  success: boolean;
  data?: {
    eventName?: string;
    selection?: string;
    odds?: number;
    stake?: number;
    eventDate?: string;
    bookmaker?: string;
    confidence?: number;
  };
  rawResponse?: string;
  error?: string;
}

export type MessageType =
  | 'ACTIVATE_SNIP_TOOL'
  | 'CAPTURE_SCREENSHOT'
  | 'SNIP_SELECTION_COMPLETE'
  | 'SNIP_CANCELLED';

export interface ExtensionMessage {
  type: MessageType;
  payload?: unknown;
}

export interface CaptureScreenshotMessage extends ExtensionMessage {
  type: 'CAPTURE_SCREENSHOT';
  payload: {
    selection: SelectionBox;
  };
}

export interface SnipSelectionCompleteMessage extends ExtensionMessage {
  type: 'SNIP_SELECTION_COMPLETE';
  payload: {
    selection: SelectionBox;
  };
}
