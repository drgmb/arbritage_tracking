const state = {
  isActive: false,
  isSelecting: false,
  startX: 0,
  startY: 0,
  overlay: null,
  selectionBox: null,
  instructions: null,
  actionsPanel: null,
  legId: null
};
function createOverlay() {
  if (state.overlay) return;
  state.overlay = document.createElement("div");
  state.overlay.id = "surebet-snip-overlay";
  state.overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    cursor: crosshair;
    z-index: 2147483647;
  `;
  state.instructions = document.createElement("div");
  state.instructions.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #1E293B;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-family: system-ui, sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 2147483647;
    ">
      <span style="font-size: 18px;">🎯</span>
      Arraste para selecionar a área do betslip
      <span style="margin-left: 8px; background: #334155; padding: 2px 8px; border-radius: 4px; font-size: 12px;">
        ESC para cancelar
      </span>
    </div>
  `;
  state.overlay.appendChild(state.instructions);
  document.body.appendChild(state.overlay);
  state.overlay.addEventListener("mousedown", handleMouseDown);
  state.overlay.addEventListener("mousemove", handleMouseMove);
  state.overlay.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("keydown", handleKeyDown);
}
function createSelectionBox(x, y) {
  state.selectionBox = document.createElement("div");
  state.selectionBox.style.cssText = `
    position: fixed;
    border: 2px dashed #6366F1;
    background: rgba(99, 102, 241, 0.15);
    pointer-events: none;
    left: ${x}px;
    top: ${y}px;
    width: 0;
    height: 0;
    z-index: 2147483647;
  `;
  state.overlay?.appendChild(state.selectionBox);
}
function updateSelectionBox(endX, endY) {
  if (!state.selectionBox) return;
  const left = Math.min(state.startX, endX);
  const top = Math.min(state.startY, endY);
  const width = Math.abs(endX - state.startX);
  const height = Math.abs(endY - state.startY);
  state.selectionBox.style.left = `${left}px`;
  state.selectionBox.style.top = `${top}px`;
  state.selectionBox.style.width = `${width}px`;
  state.selectionBox.style.height = `${height}px`;
}
function showPreview(selection) {
  if (!state.selectionBox) return;
  state.selectionBox.style.cssText = `
    position: fixed;
    border: 3px solid #6366F1;
    background: transparent;
    pointer-events: none;
    box-shadow:
      0 0 0 9999px rgba(0, 0, 0, 0.6),
      0 0 20px rgba(99, 102, 241, 0.5);
    border-radius: 4px;
    left: ${selection.startX}px;
    top: ${selection.startY}px;
    width: ${selection.endX - selection.startX}px;
    height: ${selection.endY - selection.startY}px;
    z-index: 2147483647;
  `;
  if (state.instructions) {
    state.instructions.style.display = "none";
  }
  state.actionsPanel = document.createElement("div");
  const panelTop = Math.min(selection.endY + 10, window.innerHeight - 60);
  state.actionsPanel.innerHTML = `
    <div style="
      position: fixed;
      left: ${selection.startX}px;
      top: ${panelTop}px;
      display: flex;
      gap: 8px;
      background: #1E293B;
      padding: 8px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      z-index: 2147483647;
    ">
      <button id="surebet-confirm" style="
        padding: 8px 16px;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        background: #6366F1;
        color: white;
        border: none;
        font-family: system-ui, sans-serif;
        font-size: 14px;
      ">
        ✓ Confirmar
      </button>
      <button id="surebet-retry" style="
        padding: 8px 16px;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        background: #334155;
        color: #94A3B8;
        border: none;
        font-family: system-ui, sans-serif;
        font-size: 14px;
      ">
        ↺ Refazer
      </button>
      <button id="surebet-cancel" style="
        padding: 8px 16px;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        background: transparent;
        color: #EF4444;
        border: 1px solid #EF4444;
        font-family: system-ui, sans-serif;
        font-size: 14px;
      ">
        ✕ Cancelar
      </button>
    </div>
  `;
  document.body.appendChild(state.actionsPanel);
  document.getElementById("surebet-confirm")?.addEventListener("click", () => {
    confirmSelection(selection);
  });
  document.getElementById("surebet-retry")?.addEventListener("click", () => {
    retrySelection();
  });
  document.getElementById("surebet-cancel")?.addEventListener("click", () => {
    cleanup();
    sendCancelled();
  });
}
function handleMouseDown(e) {
  if (state.actionsPanel) return;
  state.isSelecting = true;
  state.startX = e.clientX;
  state.startY = e.clientY;
  createSelectionBox(e.clientX, e.clientY);
}
function handleMouseMove(e) {
  if (!state.isSelecting) return;
  updateSelectionBox(e.clientX, e.clientY);
}
function handleMouseUp(e) {
  if (!state.isSelecting) return;
  state.isSelecting = false;
  const selection = {
    startX: Math.min(state.startX, e.clientX),
    startY: Math.min(state.startY, e.clientY),
    endX: Math.max(state.startX, e.clientX),
    endY: Math.max(state.startY, e.clientY)
  };
  const width = selection.endX - selection.startX;
  const height = selection.endY - selection.startY;
  if (width < 20 || height < 20) {
    if (state.selectionBox) {
      state.selectionBox.remove();
      state.selectionBox = null;
    }
    return;
  }
  if (state.overlay) {
    state.overlay.style.background = "transparent";
    state.overlay.style.pointerEvents = "none";
  }
  showPreview(selection);
}
function handleKeyDown(e) {
  if (e.key === "Escape") {
    cleanup();
    sendCancelled();
  }
}
async function confirmSelection(selection) {
  cleanup();
  try {
    chrome.runtime.sendMessage({
      type: "CAPTURE_SCREENSHOT",
      payload: {
        selection,
        legId: state.legId
      }
    });
  } catch (error) {
    console.error("Error sending capture message:", error);
  }
}
function retrySelection() {
  if (state.actionsPanel) {
    state.actionsPanel.remove();
    state.actionsPanel = null;
  }
  if (state.selectionBox) {
    state.selectionBox.remove();
    state.selectionBox = null;
  }
  if (state.instructions) {
    state.instructions.style.display = "block";
  }
  if (state.overlay) {
    state.overlay.style.background = "rgba(0, 0, 0, 0.5)";
    state.overlay.style.pointerEvents = "auto";
  }
}
function sendCancelled() {
  chrome.runtime.sendMessage({ type: "SNIP_CANCELLED" });
}
function cleanup() {
  if (state.overlay) {
    state.overlay.removeEventListener("mousedown", handleMouseDown);
    state.overlay.removeEventListener("mousemove", handleMouseMove);
    state.overlay.removeEventListener("mouseup", handleMouseUp);
    state.overlay.remove();
    state.overlay = null;
  }
  if (state.actionsPanel) {
    state.actionsPanel.remove();
    state.actionsPanel = null;
  }
  document.removeEventListener("keydown", handleKeyDown);
  state.selectionBox = null;
  state.instructions = null;
  state.isActive = false;
  state.isSelecting = false;
  state.legId = null;
}
function activate(legId) {
  if (state.isActive) return;
  state.isActive = true;
  state.legId = legId;
  createOverlay();
}
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "ACTIVATE_SNIP") {
    activate(message.payload?.legId || null);
    sendResponse({ success: true });
  }
  return true;
});
