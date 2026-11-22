export const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
export const statusLabels: Record<string, string> = { pending: 'Pendente', in_progress: 'Em andamento', completed: 'Concluído', overdue: 'Atrasado' };
export function activityStatus(due: string, status: string | undefined, now = new Date()) {
  if (status === 'completed') return 'completed';
  if (new Date(due).getTime() < now.getTime()) return 'overdue';
  return status ?? 'pending';
}
export function canManage(role: string) { return role === 'teacher' || role === 'admin'; }
export function dateInfo(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Fortaleza', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date);
  const dayName = parts.find(p => p.type === 'weekday')?.value ?? '';
  const weekday = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(dayName);
  const time = `${parts.find(p => p.type === 'hour')?.value ?? '00'}:${parts.find(p => p.type === 'minute')?.value ?? '00'}`;
  return { weekday, time };
}
export function formatDate(date: string, includeTime = false) {
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Fortaleza', day: '2-digit', month: 'short', ...(includeTime ? { hour: '2-digit', minute: '2-digit' } : {}) }).format(new Date(date));
}
export function toFortalezaISO(localDateTime: string) { return new Date(`${localDateTime}:00-03:00`).toISOString(); }
export function head(title: string, description: string) {
  return { meta: [{ title: `${title} · RENOVA CLASS` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} · RENOVA CLASS` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
