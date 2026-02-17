# 🎯 PROMPT: Chrome Extension - Surebet Tracker Pro

> **Contexto**: Você é um desenvolvedor sênior especializado em extensões Chrome, TypeScript, e integrações com IA. Sua missão é criar uma extensão profissional e robusta para tracking de surebets.

---

## 📋 VISÃO GERAL DO PROJETO

Desenvolva uma **extensão Google Chrome** para gerenciamento e tracking de **Surebets** (apostas de arbitragem). A extensão deve permitir ao usuário:

1. Criar e gerenciar múltiplas surebets
2. Capturar screenshots de betslips usando uma ferramenta de seleção de área (snip tool)
3. Usar IA (Google Gemini) para extrair automaticamente os dados das apostas
4. Organizar as surebets em diferentes estados de progresso

---

## 🏗️ ARQUITETURA TÉCNICA

### Stack Tecnológico
```
├── Manifest V3 (Chrome Extension)
├── TypeScript + Vite (Build system)
├── React 18+ (UI Components)
├── TailwindCSS (Styling)
├── Zustand ou Context API (State Management)
├── Google Gemini API (Vision AI)
└── Chrome Storage API (Persistência)
```

### Estrutura de Diretórios
```
surebet-tracker/
├── src/
│   ├── popup/              # Interface principal (popup)
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── SurebetCard.tsx
│   │   │   ├── LegField.tsx
│   │   │   ├── ScreenshotOverlay.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   └── CreateSurebetModal.tsx
│   │   └── hooks/
│   ├── content/            # Content script (screenshot overlay)
│   │   └── snipTool.ts
│   ├── background/         # Service worker
│   │   └── index.ts
│   ├── services/
│   │   ├── geminiService.ts
│   │   └── storageService.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
├── public/
│   ├── manifest.json
│   └── icons/
├── vite.config.ts
└── package.json
```

---

## 📦 MODELOS DE DADOS

### Interfaces TypeScript

```typescript
// types/index.ts

interface Surebet {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: SurebetStatus;
  legs: Leg[];
  totalStake?: number;
  expectedProfit?: number;
  notes?: string;
}

type SurebetStatus = 'created' | 'in_progress' | 'completed';

interface Leg {
  id: string;
  order: 1 | 2 | 3;
  status: LegStatus;
  data?: LegData;
  screenshot?: string; // Base64
}

type LegStatus = 'empty' | 'captured' | 'filled';

interface LegData {
  eventName: string;        // Ex: "Real Madrid vs Barcelona"
  selection: string;        // Ex: "Real Madrid ML", "Over 2.5 Goals"
  odds: number;             // Ex: 2.15
  stake: number;            // Ex: 100.00
  eventDate: string;        // Ex: "2024-03-15 20:00"
  bookmaker?: string;       // Ex: "Bet365", "Betano"
  potentialReturn?: number; // Calculado: stake * odds
  confidence?: number;      // Confiança da IA (0-100)
}

interface GeminiExtractionResult {
  success: boolean;
  data?: LegData;
  rawResponse?: string;
  error?: string;
}
```

---

## 🎨 INTERFACE DO USUÁRIO (UI/UX)

### Design System

```
Cores:
├── Primary: #6366F1 (Indigo)
├── Success: #22C55E (Green) 
├── Warning: #F59E0B (Amber)
├── Error: #EF4444 (Red)
├── Background: #0F172A (Slate 900)
├── Surface: #1E293B (Slate 800)
├── Border: #334155 (Slate 700)
└── Text: #F8FAFC (Slate 50)

Tipografia:
├── Font: Inter ou SF Pro (system-ui fallback)
├── Headings: 600-700 weight
└── Body: 400-500 weight
```

### Layout do Popup (400px width × auto height)

```
┌─────────────────────────────────────────┐
│  🎯 Surebet Tracker          [+ Nova]   │  ← Header com botão criar
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐│
│  │ 🟡 Em Progresso (2/3 pernas)       ││  ← Card Surebet
│  │ Real Madrid vs Barcelona            ││
│  │ Criado: há 5 min                    ││
│  │ [Continuar]              [Excluir]  ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 🟢 Completa (3/3 pernas)           ││
│  │ Lakers vs Celtics                   ││
│  │ Lucro Esperado: R$ 25,40           ││
│  │ [Ver Detalhes]          [Arquivar] ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ ⚪ Criada (0/3 pernas)             ││
│  │ Aguardando preenchimento            ││
│  │ [Preencher]              [Excluir] ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

### Modal de Edição de Surebet

```
┌─────────────────────────────────────────────────┐
│  ← Voltar       Surebet #1234          [Salvar] │
├─────────────────────────────────────────────────┤
│                                                 │
│  PERNA 1                           [Obrigatória]│
│  ┌─────────────────────────────────────────────┐│
│  │ ┌─────┐                                     ││
│  │ │ 📷  │  [Capturar Screenshot]             ││
│  │ └─────┘                                     ││
│  │                                             ││
│  │ Evento:    [_________________________]      ││
│  │ Seleção:   [_________________________]      ││
│  │ Odd:       [______]  Stake: [______]        ││
│  │ Data:      [___________]  Bookie: [______]  ││
│  │                                             ││
│  │ Status: 🟢 Preenchido        Confiança: 95% ││
│  └─────────────────────────────────────────────┘│
│                                                 │
│  PERNA 2                           [Obrigatória]│
│  ┌─────────────────────────────────────────────┐│
│  │ ┌─────┐                                     ││
│  │ │ 📷  │  [Capturar Screenshot]             ││
│  │ └─────┘                                     ││
│  │ ... (mesmos campos)                         ││
│  └─────────────────────────────────────────────┘│
│                                                 │
│  PERNA 3                             [Opcional] │
│  ┌─────────────────────────────────────────────┐│
│  │ ☐ Adicionar terceira perna                  ││
│  │ (Expandir para mostrar campos)              ││
│  └─────────────────────────────────────────────┘│
│                                                 │
│  ─────────────────────────────────────────────  │
│  RESUMO                                         │
│  Stake Total: R$ 300,00                         │
│  Retorno Garantido: R$ 325,40                   │
│  Lucro Esperado: R$ 25,40 (8.47%)              │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📸 SNIP TOOL (Ferramenta de Screenshot)

### Comportamento Esperado

1. **Ativação**: Usuário clica no botão "Capturar Screenshot" em uma perna
2. **Overlay**: Injeta overlay fullscreen semitransparente na página atual
3. **Seleção**: Cursor muda para crosshair, usuário desenha retângulo
4. **Preview**: Mostra preview da área selecionada com opções [Confirmar] [Refazer]
5. **Captura**: Usa `chrome.tabs.captureVisibleTab()` e recorta a área
6. **Processamento**: Envia para Gemini API e preenche os campos

### Implementação Content Script

```typescript
// content/snipTool.ts

interface SelectionBox {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

class SnipTool {
  private overlay: HTMLDivElement | null = null;
  private selectionBox: HTMLDivElement | null = null;
  private isSelecting: boolean = false;
  private selection: SelectionBox | null = null;

  public activate(): Promise<SelectionBox> {
    return new Promise((resolve, reject) => {
      this.createOverlay();
      this.attachEventListeners(resolve, reject);
    });
  }

  private createOverlay(): void {
    // Overlay escuro semitransparente cobrindo toda a tela
    this.overlay = document.createElement('div');
    this.overlay.id = 'surebet-snip-overlay';
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      cursor: crosshair;
      z-index: 2147483647;
    `;
    
    // Instruções
    const instructions = document.createElement('div');
    instructions.innerHTML = `
      <div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
                  background: #1E293B; color: white; padding: 12px 24px; 
                  border-radius: 8px; font-family: system-ui; font-size: 14px;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        🎯 Arraste para selecionar a área do betslip • 
        <kbd style="background: #334155; padding: 2px 6px; border-radius: 4px;">ESC</kbd> para cancelar
      </div>
    `;
    this.overlay.appendChild(instructions);
    
    document.body.appendChild(this.overlay);
  }

  private createSelectionBox(x: number, y: number): void {
    this.selectionBox = document.createElement('div');
    this.selectionBox.style.cssText = `
      position: fixed;
      border: 2px dashed #6366F1;
      background: rgba(99, 102, 241, 0.1);
      pointer-events: none;
      left: ${x}px;
      top: ${y}px;
    `;
    this.overlay?.appendChild(this.selectionBox);
  }

  // ... resto da implementação
}

export const snipTool = new SnipTool();
```

### CSS do Overlay (estilos inline para evitar conflitos)

```css
/* Área selecionada - "buraco" no overlay */
.selection-preview {
  position: fixed;
  border: 3px solid #6366F1;
  box-shadow: 
    0 0 0 9999px rgba(0, 0, 0, 0.6),
    0 0 20px rgba(99, 102, 241, 0.5);
  border-radius: 4px;
}

/* Botões de ação após seleção */
.snip-actions {
  position: fixed;
  display: flex;
  gap: 8px;
  background: #1E293B;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.snip-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.snip-btn-confirm {
  background: #6366F1;
  color: white;
}

.snip-btn-retry {
  background: #334155;
  color: #94A3B8;
}
```

---

## 🤖 INTEGRAÇÃO GOOGLE GEMINI

### Configuração do Serviço

```typescript
// services/geminiService.ts

const GEMINI_API_KEY = 'YOUR_API_KEY'; // Armazenar de forma segura
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export async function extractBetslipData(imageBase64: string): Promise<GeminiExtractionResult> {
  const prompt = `
Você é um especialista em análise de betslips (comprovantes de apostas esportivas).

Analise a imagem do betslip e extraia as seguintes informações em formato JSON:

{
  "eventName": "Nome do evento/partida (ex: Real Madrid vs Barcelona)",
  "selection": "A seleção/entrada da aposta (ex: Real Madrid ML, Over 2.5 Goals, Handicap -1.5)",
  "odds": numero_decimal (ex: 2.15),
  "stake": valor_apostado_em_numero (ex: 100.00),
  "eventDate": "Data e hora do evento no formato YYYY-MM-DD HH:mm",
  "bookmaker": "Nome da casa de apostas se visível (ex: Bet365, Betano, 1xBet)",
  "confidence": numero_de_0_a_100 (sua confiança na extração)
}

REGRAS IMPORTANTES:
1. Se não conseguir identificar algum campo, use null
2. Odds devem estar em formato decimal (não fracionário)
3. Para stake, extraia apenas o número, sem símbolo de moeda
4. Se a data não estiver visível, use null
5. Seja preciso - é melhor retornar null do que um valor incorreto

Retorne APENAS o JSON, sem markdown ou explicações adicionais.
`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: 'image/png',
                data: imageBase64.replace(/^data:image\/\w+;base64,/, '')
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.1, // Baixa temperatura para respostas mais precisas
          topK: 1,
          topP: 1,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const result: GeminiResponse = await response.json();
    const textResponse = result.candidates[0]?.content?.parts[0]?.text;
    
    if (!textResponse) {
      throw new Error('Empty response from Gemini');
    }

    // Parse JSON da resposta
    const data = JSON.parse(textResponse) as LegData;
    
    // Calcular retorno potencial
    if (data.odds && data.stake) {
      data.potentialReturn = parseFloat((data.odds * data.stake).toFixed(2));
    }

    return {
      success: true,
      data,
      rawResponse: textResponse
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
```

### Tratamento de Erros e Fallbacks

```typescript
// Retry logic com exponential backoff
async function extractWithRetry(
  imageBase64: string, 
  maxRetries: number = 3
): Promise<GeminiExtractionResult> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await extractBetslipData(imageBase64);
      if (result.success) return result;
      
      // Se falhou mas não é erro de rede, não tenta de novo
      if (!result.error?.includes('network')) {
        return result;
      }
    } catch (error) {
      lastError = error as Error;
    }
    
    // Exponential backoff: 1s, 2s, 4s
    await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
  }
  
  return {
    success: false,
    error: lastError?.message || 'Max retries exceeded'
  };
}
```

---

## 💾 PERSISTÊNCIA DE DADOS

### Storage Service

```typescript
// services/storageService.ts

const STORAGE_KEY = 'surebets';

export const storageService = {
  async getAllSurebets(): Promise<Surebet[]> {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    return result[STORAGE_KEY] || [];
  },

  async saveSurebet(surebet: Surebet): Promise<void> {
    const surebets = await this.getAllSurebets();
    const index = surebets.findIndex(s => s.id === surebet.id);
    
    if (index >= 0) {
      surebets[index] = { ...surebet, updatedAt: new Date() };
    } else {
      surebets.unshift(surebet); // Adiciona no início
    }
    
    await chrome.storage.local.set({ [STORAGE_KEY]: surebets });
  },

  async deleteSurebet(id: string): Promise<void> {
    const surebets = await this.getAllSurebets();
    const filtered = surebets.filter(s => s.id !== id);
    await chrome.storage.local.set({ [STORAGE_KEY]: filtered });
  },

  async updateSurebetStatus(id: string): Promise<void> {
    const surebets = await this.getAllSurebets();
    const surebet = surebets.find(s => s.id === id);
    
    if (surebet) {
      const filledLegs = surebet.legs.filter(l => l.status === 'filled').length;
      const requiredLegs = surebet.legs.filter(l => l.order <= 2).length;
      
      if (filledLegs === 0) {
        surebet.status = 'created';
      } else if (filledLegs >= requiredLegs) {
        surebet.status = 'completed';
        // Calcular lucro esperado
        this.calculateExpectedProfit(surebet);
      } else {
        surebet.status = 'in_progress';
      }
      
      await this.saveSurebet(surebet);
    }
  },

  calculateExpectedProfit(surebet: Surebet): void {
    const filledLegs = surebet.legs.filter(l => l.data);
    if (filledLegs.length < 2) return;
    
    const totalStake = filledLegs.reduce((sum, leg) => 
      sum + (leg.data?.stake || 0), 0);
    
    // Para surebet, o retorno mínimo é garantido
    const minReturn = Math.min(...filledLegs.map(leg => 
      leg.data?.potentialReturn || 0));
    
    surebet.totalStake = totalStake;
    surebet.expectedProfit = parseFloat((minReturn - totalStake).toFixed(2));
  }
};
```

---

## 📄 MANIFEST.JSON

```json
{
  "manifest_version": 3,
  "name": "Surebet Tracker Pro",
  "version": "1.0.0",
  "description": "Gerencie suas surebets com captura automática via IA",
  "permissions": [
    "activeTab",
    "storage",
    "scripting"
  ],
  "host_permissions": [
    "<all_urls>"
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "background": {
    "service_worker": "background.js",
    "type": "module"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ],
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

---

## 🔄 FLUXO DE COMUNICAÇÃO

```
┌─────────┐     message      ┌────────────┐    executeScript    ┌─────────────┐
│  Popup  │ ───────────────► │ Background │ ──────────────────► │   Content   │
│  (React)│                  │  (SW)      │                     │  (SnipTool) │
└─────────┘                  └────────────┘                     └─────────────┘
     │                             │                                   │
     │                             │    captureVisibleTab              │
     │                             │◄──────────────────────────────────│
     │                             │                                   │
     │    sendResponse (image)     │                                   │
     │◄────────────────────────────│                                   │
     │                             │                                   │
     │         Gemini API          │                                   │
     │────────────────────────────►│                                   │
     │                             │                                   │
     │    extracted data           │                                   │
     │◄────────────────────────────│                                   │
     │                             │                                   │
     ▼                             │                                   │
  Update UI                        │                                   │
  & Storage                        │                                   │
```

### Background Service Worker

```typescript
// background/index.ts

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CAPTURE_SCREENSHOT') {
    handleScreenshotCapture(message.selection)
      .then(sendResponse)
      .catch(error => sendResponse({ error: error.message }));
    return true; // Indica resposta assíncrona
  }
  
  if (message.type === 'ACTIVATE_SNIP_TOOL') {
    activateSnipTool(message.tabId);
    return false;
  }
});

async function handleScreenshotCapture(selection: SelectionBox): Promise<string> {
  // Captura a tab visível
  const dataUrl = await chrome.tabs.captureVisibleTab(null, { format: 'png' });
  
  // Recorta a área selecionada usando OffscreenCanvas
  const croppedImage = await cropImage(dataUrl, selection);
  
  return croppedImage;
}

async function cropImage(dataUrl: string, selection: SelectionBox): Promise<string> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);
  
  const canvas = new OffscreenCanvas(
    selection.endX - selection.startX,
    selection.endY - selection.startY
  );
  const ctx = canvas.getContext('2d')!;
  
  ctx.drawImage(
    bitmap,
    selection.startX, selection.startY,
    selection.endX - selection.startX,
    selection.endY - selection.startY,
    0, 0,
    canvas.width, canvas.height
  );
  
  const croppedBlob = await canvas.convertToBlob({ type: 'image/png' });
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(croppedBlob);
  });
}
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Fase 1: Setup Inicial
- [ ] Configurar projeto Vite + React + TypeScript
- [ ] Configurar TailwindCSS
- [ ] Criar estrutura de diretórios
- [ ] Configurar manifest.json
- [ ] Criar ícones da extensão

### Fase 2: UI Base
- [ ] Criar layout do popup
- [ ] Implementar componente SurebetCard
- [ ] Implementar componente LegField
- [ ] Implementar modal de criação/edição
- [ ] Adicionar animações e transições

### Fase 3: Snip Tool
- [ ] Implementar overlay de seleção
- [ ] Adicionar interação de desenho do retângulo
- [ ] Implementar preview da seleção
- [ ] Integrar com chrome.tabs.captureVisibleTab
- [ ] Recorte da imagem

### Fase 4: Integração Gemini
- [ ] Configurar chamada à API
- [ ] Implementar parsing da resposta
- [ ] Adicionar indicador de loading
- [ ] Tratamento de erros
- [ ] Retry logic

### Fase 5: Persistência
- [ ] Implementar storageService
- [ ] CRUD completo de surebets
- [ ] Cálculo automático de status
- [ ] Cálculo de lucro esperado

### Fase 6: Polimento
- [ ] Validações de formulário
- [ ] Feedback visual (toasts, loading states)
- [ ] Keyboard shortcuts (ESC para cancelar)
- [ ] Testes manuais end-to-end
- [ ] Otimização de performance

---

## 🎯 CRITÉRIOS DE ACEITE

1. **Funcional**:
   - Criar, editar, deletar surebets
   - Capturar screenshots com área de seleção customizada
   - Extração automática de dados via Gemini com >90% de acurácia
   - Persistência entre sessões

2. **UX/UI**:
   - Interface responsiva e fluida
   - Feedback visual para todas as ações
   - Loading states durante processamento IA
   - Transições suaves entre estados

3. **Técnico**:
   - Sem erros no console
   - Manifest V3 compliant
   - Código TypeScript tipado corretamente
   - Componentes React bem estruturados

---

## 💡 DICAS DE IMPLEMENTAÇÃO

1. **Snip Tool**: Use `pointer-events: none` no selection box para não interferir com os eventos de mouse do overlay

2. **Gemini API**: A API gratuita tem rate limits - implemente debouncing e caching

3. **Performance**: Comprima as imagens antes de enviar para a API (canvas.toBlob com quality 0.8)

4. **Estado**: Use Zustand para estado global - mais simples que Redux para esse escopo

5. **Debugging**: Adicione console.logs coloridos para diferentes módulos durante desenvolvimento

---

## 📝 NOTAS ADICIONAIS

- **API Key Security**: Considere usar um backend proxy para não expor a API key no client-side
- **Internacionalização**: O prompt do Gemini está em português - considere detectar idioma
- **Backup**: Implemente export/import de dados via JSON
- **Tema**: Considere adicionar tema claro além do escuro

---

*Este prompt foi criado para ser usado com Claude Code ou similar. Execute as fases em ordem e teste cada uma antes de prosseguir.*