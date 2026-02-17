import { D as Dexie } from './assets/import-wrapper-prod-DNqE4QG5.js';

class BackgroundDB extends Dexie {
  legs;
  surebets;
  constructor() {
    super("SurebetTrackerDB");
    this.version(1).stores({
      surebets: "++id, uuid, status, createdAt, updatedAt, expectedProfit",
      legs: "++id, surebetId, order, status, eventDate, bookmaker",
      settings: "key"
    });
  }
}
const db = new BackgroundDB();
chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    if (message.type === "ACTIVATE_SNIP_TOOL") {
      const { tabId, legId } = message.payload;
      activateSnipTool(tabId, legId);
      sendResponse({ success: true });
      return false;
    }
    if (message.type === "CAPTURE_SCREENSHOT") {
      const { selection, legId } = message.payload;
      handleScreenshotCapture(selection, legId, sender.tab?.id).then((result) => {
        storeScreenshotResult(legId, result);
      }).catch((error) => {
        console.error("Screenshot capture error:", error);
      });
      return false;
    }
    if (message.type === "SNIP_CANCELLED") {
      return false;
    }
    return false;
  }
);
async function activateSnipTool(tabId, legId) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"]
    });
    await chrome.tabs.sendMessage(tabId, {
      type: "ACTIVATE_SNIP",
      payload: { legId }
    });
  } catch (error) {
    console.error("Error activating snip tool:", error);
  }
}
async function handleScreenshotCapture(selection, _legId, tabId) {
  if (!tabId) {
    throw new Error("No tab ID provided");
  }
  const dataUrl = await chrome.tabs.captureVisibleTab({ format: "png" });
  const croppedImage = await cropImage(dataUrl, selection);
  return croppedImage;
}
async function cropImage(dataUrl, selection) {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);
  const devicePixelRatio = 1;
  const sx = Math.round(selection.startX * devicePixelRatio);
  const sy = Math.round(selection.startY * devicePixelRatio);
  const sw = Math.round((selection.endX - selection.startX) * devicePixelRatio);
  const sh = Math.round((selection.endY - selection.startY) * devicePixelRatio);
  const canvas = new OffscreenCanvas(sw, sh);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get canvas context");
  }
  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, sw, sh);
  const croppedBlob = await canvas.convertToBlob({ type: "image/png" });
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(croppedBlob);
  });
}
async function storeScreenshotResult(legId, imageBase64) {
  try {
    const leg = await db.legs.get(legId);
    if (!leg) {
      console.error("Leg not found:", legId);
      return;
    }
    await db.legs.update(legId, {
      screenshot: imageBase64,
      status: leg.status === "empty" ? "captured" : leg.status
    });
    await db.surebets.update(leg.surebetId, {
      updatedAt: /* @__PURE__ */ new Date()
    });
    console.log("Screenshot stored for leg:", legId);
  } catch (error) {
    console.error("Error storing screenshot:", error);
  }
}
chrome.action.onClicked.addListener(() => {
});
