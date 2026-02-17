import { useState, useEffect } from 'react';
import { useSurebetStore } from '../../store/surebetStore';

export function Settings() {
  const { apiKey, saveApiKey } = useSurebetStore();
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setInputKey(apiKey || '');
  }, [apiKey]);

  const handleSave = async () => {
    await saveApiKey(inputKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="font-medium mb-4 text-text-primary">API do Google Gemini</h3>

        <p className="text-sm text-text-secondary mb-4">
          Para usar a extração automática via IA, você precisa de uma chave de API do Google Gemini.
          Obtenha a sua em{' '}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Google AI Studio
          </a>
          .
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-text-secondary mb-1">
              Chave da API
            </label>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIza..."
              className="w-full"
            />
          </div>

          <button
            onClick={handleSave}
            className={`btn-primary w-full ${saved ? 'bg-success' : ''}`}
          >
            {saved ? '✓ Salvo!' : 'Salvar'}
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="font-medium mb-2 text-text-primary">Sobre</h3>
        <p className="text-sm text-text-secondary">
          Surebet Tracker Pro v1.0.0
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Gerencie suas apostas de arbitragem com captura automática via IA.
        </p>
      </div>
    </div>
  );
}
