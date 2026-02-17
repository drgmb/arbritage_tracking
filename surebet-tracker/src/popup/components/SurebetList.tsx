import { useSurebetStore } from '../../store/surebetStore';
import { SurebetCard } from './SurebetCard';

export function SurebetList() {
  const { surebets, createSurebet } = useSurebetStore();

  if (surebets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-4xl mb-4">🎯</div>
        <h2 className="text-lg font-medium text-text-primary mb-2">
          Nenhuma surebet ainda
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Crie sua primeira surebet para começar a rastrear suas apostas de arbitragem.
        </p>
        <button onClick={createSurebet} className="btn-primary">
          + Criar Surebet
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {surebets.map((surebet) => (
        <SurebetCard key={surebet.id} surebet={surebet} />
      ))}
    </div>
  );
}
