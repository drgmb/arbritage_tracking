import type { SurebetStatus } from '../../types';
import { getStatusLabel } from '../../utils/helpers';

interface StatusBadgeProps {
  status: SurebetStatus;
  filledCount: number;
  totalCount: number;
}

export function StatusBadge({ status, filledCount, totalCount }: StatusBadgeProps) {
  const colors = {
    created: {
      dot: 'bg-slate-400',
      text: 'text-slate-400',
    },
    in_progress: {
      dot: 'bg-warning',
      text: 'text-warning',
    },
    completed: {
      dot: 'bg-success',
      text: 'text-success',
    },
  };

  const { dot, text } = colors[status];

  return (
    <div className={`flex items-center gap-2 text-sm ${text}`}>
      <span className={`w-2 h-2 rounded-full ${dot}`}></span>
      <span className="font-medium">{getStatusLabel(status)}</span>
      <span className="text-text-secondary">
        ({filledCount}/{totalCount} pernas)
      </span>
    </div>
  );
}
