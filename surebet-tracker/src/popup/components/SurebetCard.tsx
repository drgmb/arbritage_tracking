import type { SurebetWithLegs } from '../../store/surebetStore';
import { StatusBadge } from './StatusBadge';
import {
  formatRelativeTime,
  formatCurrency,
  countFilledLegs,
  getEventNamePreview,
} from '../../utils/helpers';
import { useSurebetStore } from '../../store/surebetStore';

interface SurebetCardProps {
  surebet: SurebetWithLegs;
}

export function SurebetCard({ surebet }: SurebetCardProps) {
  const { selectSurebet, deleteSurebet } = useSurebetStore();
  const filledCount = countFilledLegs(surebet.legs);
  const eventName = getEventNamePreview(surebet.legs);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Tem certeza que deseja excluir esta surebet?')) {
      if (surebet.id) {
        deleteSurebet(surebet.id);
      }
    }
  };

  const handleSelect = () => {
    if (surebet.id) {
      selectSurebet(surebet.id);
    }
  };

  const getActionButton = () => {
    switch (surebet.status) {
      case 'created':
        return (
          <button onClick={handleSelect} className="btn-primary text-sm">
            Preencher
          </button>
        );
      case 'in_progress':
        return (
          <button onClick={handleSelect} className="btn-primary text-sm">
            Continuar
          </button>
        );
      case 'completed':
        return (
          <button onClick={handleSelect} className="btn-secondary text-sm">
            Ver Detalhes
          </button>
        );
    }
  };

  return (
    <div
      className="bg-surface border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer"
      onClick={handleSelect}
    >
      <StatusBadge
        status={surebet.status}
        filledCount={filledCount}
        totalCount={
          surebet.legs.filter((l) => l.order <= 2).length +
          (surebet.legs[2]?.status !== 'empty' ? 1 : 0)
        }
      />

      <h3 className="mt-2 font-medium text-text-primary truncate">
        {eventName}
      </h3>

      <div className="mt-1 text-sm text-text-secondary">
        Criado: {formatRelativeTime(surebet.createdAt)}
      </div>

      {surebet.status === 'completed' && surebet.expectedProfit !== undefined && (
        <div className="mt-2 text-success font-medium">
          Lucro Esperado: {formatCurrency(surebet.expectedProfit)}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        {getActionButton()}
        <button onClick={handleDelete} className="btn-danger text-sm">
          Excluir
        </button>
      </div>
    </div>
  );
}
