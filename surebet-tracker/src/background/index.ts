import Dexie from 'dexie';

interface SelectionBox {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface CaptureMessage {
  type: 'CAPTURE_SCREENSHOT';
  payload: {
    selection: SelectionBox;
    legId: number;
  };
}

interface ActivateSnipMessage {
  type: 'ACTIVATE_SNIP_TOOL';
  payload: {
    tabId: number;
    legId: number;
  };
}

type Message =
  | CaptureMessage
  | ActivateSnipMessage
  | { type: string; payload?: unknown };

// Initialize IndexedDB connection for background script
class BackgroundDB extends Dexie {
  legs!: Dexie.Table<{
    id?: number;
    surebetId: number;
    status: string;
    screenshot?: string;
  }>;
  surebets!: Dexie.Table<{
    id?: number;
    updatedAt: Date;
  }>;

  constructor() {
    super('SurebetTrackerDB');
    this.version(1).stores({
      surebets: '++id, uuid, status, createdAt, updatedAt, expectedProfit',
      legs: '++id, surebetId, order, status, eventDate, bookmaker',
      settings: 'key',
    });
  }
}

const db = new BackgroundDB();

chrome.runtime.onMessage.addListener(
  (message: Message, sender, sendResponse) => {
    if (message.type === 'ACTIVATE_SNIP_TOOL') {
      const { tabId, legId } = (message as ActivateSnipMessage).payload;
      activateSnipTool(tabId, legId);
      sendResponse({ success: true });
      return false;
    }

    if (message.type === 'CAPTURE_SCREENSHOT') {
      const { selection, legId } = (message as CaptureMessage).payload;
      handleScreenshotCapture(selection, legId, sender.tab?.id)
        .then((result) => {
          storeScreenshotResult(legId, result);
        })
        .catch((error) => {
          console.error('Screenshot capture error:', error);
        });
      return false;
    }

    if (message.type === 'SNIP_CANCELLED') {
      return false;
    }

    return false;
  }
);

async function activateSnipTool(tabId: number, legId: number): Promise<void> {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['content.js'],
    });

    await chrome.tabs.sendMessage(tabId, {
      type: 'ACTIVATE_SNIP',
      payload: { legId },
    });
  } catch (error) {
    console.error('Error activating snip tool:', error);
  }
}

async function handleScreenshotCapture(
  selection: SelectionBox,
  _legId: number,
  tabId?: number
): Promise<string> {
  if (!tabId) {
    throw new Error('No tab ID provided');
  }

  const dataUrl = await chrome.tabs.captureVisibleTab({ format: 'png' });

  const croppedImage = await cropImage(dataUrl, selection);

  return croppedImage;
}

async function cropImage(
  dataUrl: string,
  selection: SelectionBox
): Promise<string> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);

  const devicePixelRatio = 1;

  const sx = Math.round(selection.startX * devicePixelRatio);
  const sy = Math.round(selection.startY * devicePixelRatio);
  const sw = Math.round((selection.endX - selection.startX) * devicePixelRatio);
  const sh = Math.round((selection.endY - selection.startY) * devicePixelRatio);

  const canvas = new OffscreenCanvas(sw, sh);
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, sw, sh);

  const croppedBlob = await canvas.convertToBlob({ type: 'image/png' });

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(croppedBlob);
  });
}

async function storeScreenshotResult(
  legId: number,
  imageBase64: string
): Promise<void> {
  try {
    const leg = await db.legs.get(legId);
    if (!leg) {
      console.error('Leg not found:', legId);
      return;
    }

    await db.legs.update(legId, {
      screenshot: imageBase64,
      status: leg.status === 'empty' ? 'captured' : leg.status,
    });

    await db.surebets.update(leg.surebetId, {
      updatedAt: new Date(),
    });

    console.log('Screenshot stored for leg:', legId);
  } catch (error) {
    console.error('Error storing screenshot:', error);
  }
}

chrome.action.onClicked.addListener(() => {});
