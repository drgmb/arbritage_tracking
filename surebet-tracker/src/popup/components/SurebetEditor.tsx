import { useSurebetStore } from '../../store/surebetStore';
import { LegField } from './LegField';
import { formatCurrency } from '../../utils/helpers';

export function SurebetEditor() {
  const { currentSurebet, saveCurrent, isLoading } = useSurebetStore();

  if (!currentSurebet) {
    return (
      <div className="text-center text-text-secondary py-8">
        Nenhuma surebet selecionada
      </div>
    );
  }

  // Calculate profit from legs directly
  const filledLegs = currentSurebet.legs.filter((l) => l.status === 'filled');
  const totalStake = filledLegs.reduce((sum, leg) => sum + (leg.stake || 0), 0);
  const returns = filledLegs
    .filter((l) => l.potentialReturn !== undefined)
    .map((l) => l.potentialReturn!);
  const minReturn = returns.length > 0 ? Math.min(...returns) : 0;
  const expectedProfit =
    filledLegs.length >= 2 ? parseFloat((minReturn - totalStake).toFixed(2)) : 0;
  const profitPercentage =
    totalStake > 0 && filledLegs.length >= 2
      ? ((expectedProfit / totalStake) * 100).toFixed(2)
      : '0.00';

  const handleSave = async () => {
    await saveCurrent();
  };

  return (
    <div className="space-y-4">
      {/* Legs */}
      {currentSurebet.legs.map((leg) => (
        <LegField key={leg.id} leg={leg} isRequired={leg.order <= 2} />
      ))}

      {/* Summary */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="font-medium mb-3 text-text-primary">RESUMO</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Stake Total:</span>
            <span className="text-text-primary font-medium">
              {formatCurrency(totalStake)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Retorno Garantido:</span>
            <span className="text-text-primary font-medium">
              {formatCurrency(totalStake + expectedProfit)}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-border">
            <span className="text-text-secondary">Lucro Esperado:</span>
            <span
              className={`font-semibold ${
                expectedProfit >= 0 ? 'text-success' : 'text-error'
              }`}
            >
              {formatCurrency(expectedProfit)} ({profitPercentage}%)
            </span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={isLoading}
        className="w-full btn-primary py-3 text-center"
      >
        {isLoading ? 'Salvando...' : 'Salvar Alterações'}
      </button>
    </div>
  );
}
