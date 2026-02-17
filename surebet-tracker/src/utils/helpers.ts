export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatRelativeTime(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) {
    return 'agora';
  } else if (diffMins < 60) {
    return `há ${diffMins} min`;
  } else if (diffHours < 24) {
    return `há ${diffHours}h`;
  } else if (diffDays < 7) {
    return `há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
  } else {
    return formatDate(date);
  }
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    created: 'Criada',
    in_progress: 'Em Progresso',
    completed: 'Completa',
  };
  return labels[status] || status;
}

export function getLegStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    empty: 'Vazio',
    captured: 'Capturado',
    filled: 'Preenchido',
  };
  return labels[status] || status;
}

export function countFilledLegs(legs: Array<{ status: string }>): number {
  return legs.filter((l) => l.status === 'filled').length;
}

export function getEventNamePreview(
  legs: Array<{ eventName?: string }>
): string {
  const filledLeg = legs.find((l) => l.eventName);
  return filledLeg?.eventName || 'Aguardando preenchimento';
}
