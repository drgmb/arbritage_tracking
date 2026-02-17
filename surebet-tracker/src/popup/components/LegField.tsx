import { useState } from 'react';
import { LegRecord } from '../../services/database';
import { LegData } from '../../services/storageService';
import { useSurebetStore } from '../../store/surebetStore';
import { extractWithRetry } from '../../services/geminiService';
import { getLegStatusLabel } from '../../utils/helpers';

interface LegFieldProps {
  leg: LegRecord;
  isRequired: boolean;
}

export function LegField({ leg, isRequired }: LegFieldProps) {
  const { updateLeg, apiKey } = useSurebetStore();
  const [isExpanded, setIsExpanded] = useState(
    leg.status !== 'empty' || leg.order <= 2
  );
  const [isCapturing, setIsCapturing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);

  const handleFieldChange = (
    field: keyof LegData,
    value: string | number
  ) => {
    if (!leg.id) return;

    const processedValue = ['odds', 'stake'].includes(field)
      ? parseFloat(value as string) || 0
      : value;
    updateLeg(leg.id, { [field]: processedValue } as Partial<LegData>);
  };

  const handleCaptureScreenshot = async () => {
    if (!apiKey) {
      setExtractionError('Configure a API key nas configurações primeiro.');
      return;
    }

    setIsCapturing(true);
    setExtractionError(null);

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab?.id) {
        throw new Error('Não foi possível acessar a aba atual');
      }

      await chrome.runtime.sendMessage({
        type: 'ACTIVATE_SNIP_TOOL',
        payload: { tabId: tab.id, legId: leg.id },
      });

      window.close();
    } catch (error) {
      setExtractionError(
        error instanceof Error ? error.message : 'Erro ao iniciar captura'
      );
      setIsCapturing(false);
    }
  };

  const handleExtractFromScreenshot = async () => {
    if (!leg.screenshot || !leg.id) return;

    setIsExtracting(true);
    setExtractionError(null);

    try {
      const result = await extractWithRetry(leg.screenshot);

      if (result.success && result.data) {
        updateLeg(leg.id, result.data);
      } else {
        setExtractionError(result.error || 'Erro na extração');
      }
    } catch (error) {
      setExtractionError(
        error instanceof Error ? error.message : 'Erro desconhecido'
      );
    } finally {
      setIsExtracting(false);
    }
  };

  const statusColors = {
    empty: 'bg-slate-600',
    captured: 'bg-warning',
    filled: 'bg-success',
  };

  // Format eventDate for datetime-local input
  const formatDateForInput = (date?: Date): string => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  if (!isExpanded && !isRequired) {
    return (
      <div
        className="bg-surface border border-border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors"
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-4 h-4 accent-primary"
            checked={false}
            onChange={() => setIsExpanded(true)}
          />
          <span className="text-text-secondary">Adicionar terceira perna</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium flex items-center gap-2">
          PERNA {leg.order}
          <span
            className={`text-xs px-2 py-0.5 rounded ${
              isRequired
                ? 'bg-primary/20 text-primary'
                : 'bg-slate-600/20 text-slate-400'
            }`}
          >
            {isRequired ? 'Obrigatória' : 'Opcional'}
          </span>
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <span
            className={`w-2 h-2 rounded-full ${statusColors[leg.status]}`}
          ></span>
          <span className="text-text-secondary">
            {getLegStatusLabel(leg.status)}
          </span>
          {leg.confidence && (
            <span className="text-primary">({leg.confidence}%)</span>
          )}
        </div>
      </div>

      {/* Screenshot Section */}
      <div className="mb-4">
        <div className="flex gap-2">
          {leg.screenshot ? (
            <div className="flex-shrink-0 w-20 h-20 rounded border border-border overflow-hidden">
              <img
                src={leg.screenshot}
                alt="Screenshot"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-20 h-20 rounded border border-dashed border-border flex items-center justify-center text-3xl text-text-secondary">
              📷
            </div>
          )}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleCaptureScreenshot}
              disabled={isCapturing}
              className="btn-secondary text-sm"
            >
              {isCapturing
                ? 'Aguardando...'
                : leg.screenshot
                ? 'Recapturar'
                : 'Capturar Screenshot'}
            </button>
            {leg.screenshot && (
              <button
                onClick={handleExtractFromScreenshot}
                disabled={isExtracting}
                className="btn-primary text-sm"
              >
                {isExtracting ? 'Extraindo...' : 'Extrair com IA'}
              </button>
            )}
          </div>
        </div>

        {extractionError && (
          <p className="mt-2 text-sm text-error">{extractionError}</p>
        )}

        {isExtracting && (
          <div className="mt-2 flex items-center gap-2 text-sm text-primary">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
            Processando imagem com IA...
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-text-secondary mb-1">
            Evento
          </label>
          <input
            type="text"
            placeholder="Ex: Real Madrid vs Barcelona"
            value={leg.eventName || ''}
            onChange={(e) => handleFieldChange('eventName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-1">
            Seleção
          </label>
          <input
            type="text"
            placeholder="Ex: Real Madrid ML, Over 2.5 Goals"
            value={leg.selection || ''}
            onChange={(e) => handleFieldChange('selection', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-text-secondary mb-1">
              Odd
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="2.15"
              value={leg.odds || ''}
              onChange={(e) => handleFieldChange('odds', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">
              Stake
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="100.00"
              value={leg.stake || ''}
              onChange={(e) => handleFieldChange('stake', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-text-secondary mb-1">
              Data
            </label>
            <input
              type="datetime-local"
              value={formatDateForInput(leg.eventDate)}
              onChange={(e) => handleFieldChange('eventDate', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">
              Casa
            </label>
            <input
              type="text"
              placeholder="Bet365"
              value={leg.bookmaker || ''}
              onChange={(e) => handleFieldChange('bookmaker', e.target.value)}
            />
          </div>
        </div>

        {leg.potentialReturn && (
          <div className="pt-2 border-t border-border">
            <span className="text-sm text-text-secondary">
              Retorno Potencial:{' '}
            </span>
            <span className="text-success font-medium">
              R$ {leg.potentialReturn.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
