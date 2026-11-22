import { Link, useLocation } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, type ReactNode } from 'react';
import { LayoutDashboard, CalendarDays, ClipboardList, Clock3, Megaphone, LibraryBig, Users, UserRound, Leaf, Bell, ChevronDown, Menu, X, ArrowUpRight, LogOut, ShieldCheck, ChevronRight, Sun, CheckCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { workspaceQuery } from '@/lib/academic/queries';
import { useAuth } from './auth-context';
const nav = [
  { to: '/', label: 'Início', icon: LayoutDashboard }, { to: '/horarios', label: 'Horários', icon: Clock3 },
  { to: '/atividades', label: 'Atividades', icon: ClipboardList }, { to: '/calendario', label: 'Calendário', icon: CalendarDays },
  { to: '/avisos', label: 'Avisos', icon: Megaphone }, { to: '/materiais', label: 'Materiais', icon: LibraryBig },
  { to: '/turma', label: 'Nossa Turma', icon: Users },
] as const;
export function Brand() { return <div className="brand"><div className="brand-mark"><Leaf size={22} strokeWidth={1.8} /></div><div><div className="brand-name">RENOVA <span>CLASS</span></div><div className="mt-1.5 text-[9px] text-muted-foreground">Organização acadêmica inteligente</div></div></div>; }
export function Shell({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  const { data, refetch } = useQuery({ ...workspaceQuery, enabled: !!user });
  const [menu, setMenu] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [clock, setClock] = useState<Date | null>(null);
  useEffect(() => { setClock(new Date()); const id = setInterval(() => setClock(new Date()), 60000); return () => clearInterval(id); }, []);
  useEffect(() => {
    if (!user) return;
    const channel = supabase.channel(`notifications-${user.id}`).on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, () => { void refetch(); }).subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [user, refetch]);
  const current = nav.find(n => n.to === location.pathname)?.label ?? (location.pathname.startsWith('/admin') ? 'Administração' : location.pathname === '/perfil' ? 'Meu Perfil' : 'Minha conta');
  const name = data?.profile?.full_name || 'Visitante';
  const initials = name.split(' ').slice(0,2).map(n => n[0]).join('');
  const unread = data?.notifications.filter(n => !n.is_read).length ?? 0;
  const signOut = async () => { const { error } = await supabase.auth.signOut(); if (error) toast.error('Não foi possível sair.'); else window.location.assign('/'); };
  return <div className="min-h-screen">
    {menu && <div className="fixed inset-0 z-30 bg-foreground/30 lg:hidden" onClick={() => setMenu(false)} />}
    <aside className={`app-sidebar ${menu ? 'open' : ''}`}>
      <div className="px-6 pt-8 pb-7"><Link to="/" onClick={() => setMenu(false)}><Brand /></Link></div>
      <div className="mx-5 mb-8 rounded-md border border-border bg-background p-3"><div className="flex items-center gap-2.5"><div className="grid size-8 place-items-center rounded-md bg-secondary text-primary"><Users size={16} /></div><div><strong className="text-[11px]">1º B · Energias Renováveis</strong><p className="mt-1 text-[9px] text-muted-foreground">CETI Jeanete Souza</p></div></div></div>
      <div className="px-6 mini-label mb-3">Workspace</div>
      <nav className="px-4">{nav.map(n => <Link key={n.to} to={n.to} onClick={() => setMenu(false)} className={`nav-link ${location.pathname === n.to || (n.to !== '/' && location.pathname.startsWith(n.to)) ? 'active' : ''}`}><n.icon />{n.label}</Link>)}</nav>
      <div className="mx-6 my-5 border-t border-border" />
      <nav className="px-4"><Link to="/perfil" onClick={() => setMenu(false)} className={`nav-link ${location.pathname === '/perfil' ? 'active' : ''}`}><UserRound />Meu Perfil</Link>{data?.role === 'admin' || data?.role === 'teacher' ? <Link to="/admin" className={`nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}><ShieldCheck />Administração</Link> : null}</nav>
      <div className="mt-auto px-5 pt-8 pb-5"><div className="border-t border-border pt-4"><div className="flex items-center gap-2 text-[10px] text-muted-foreground"><span className="size-1.5 rounded-full bg-primary" />Uma turma. Muitas possibilidades.</div><div className="mt-4 flex items-center gap-3"><div className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-primary text-[10px] font-semibold">{initials}</div><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-medium">{name}</p><p className="mt-1 text-[9px] text-muted-foreground">{user ? data?.role === 'admin' ? 'Administrador' : data?.role === 'teacher' ? 'Professor' : 'Aluno · 1º B' : 'Conheça nossa turma'}</p></div>{user ? <Button variant="ghost" size="icon" title="Sair" aria-label="Sair" onClick={signOut}><LogOut size={15} /></Button> : <Button variant="ghost" size="icon" asChild><Link to="/auth" aria-label="Entrar"><ArrowUpRight size={16} /></Link></Button>}</div></div></div>
    </aside>
    <div className="app-body"><header className="topbar"><div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="min-[801px]:hidden" onClick={() => setMenu(true)} aria-label="Abrir menu"><Menu /></Button><span className="text-[12px] text-muted-foreground">Workspace</span><ChevronRight size={13} className="text-muted-foreground"/><span className="text-[12px] font-medium">{current}</span></div><div className="flex items-center gap-4"><span className="hidden sm:flex items-center gap-2 text-[10px] text-muted-foreground"><CalendarDays size={14} />{clock ? new Intl.DateTimeFormat('pt-BR',{ timeZone:'America/Fortaleza', day:'2-digit', month:'long', year:'numeric' }).format(clock) : 'CETI Jeanete Souza'}</span><span className="hidden sm:block h-5 border-l border-border"/><Button variant="ghost" size="icon" aria-label="Notificações" title="Notificações" onClick={() => setNotificationOpen(true)} className="relative"><Bell size={18}/>{unread > 0 && <span className="absolute top-0 right-0 grid size-4 place-items-center rounded-full bg-primary text-primary-foreground text-[9px]">{unread}</span>}</Button><Link to={user ? '/perfil' : '/auth'} className="flex items-center gap-2"><span className="grid size-31 size-[31px] place-items-center rounded-full bg-secondary text-primary text-[10px] font-semibold">{initials}</span><ChevronDown size={12} className="text-muted-foreground" /></Link></div></header>
    <main className="content animate-in-page">{children}<footer className="footer"><span>© {clock?.getFullYear() ?? 2026} Renova Class · CETI Jeanete Souza</span><span className="flex items-center gap-1.5"><Leaf size={11} />Construindo um futuro mais sustentável.</span></footer></main></div>
    <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}><DialogContent><DialogHeader><DialogTitle>Notificações {unread > 0 && `(${unread})`}</DialogTitle></DialogHeader>{!user ? <div className="py-8 text-center"><p className="text-sm text-muted-foreground mb-4">Entre para acompanhar suas notificações.</p><Button asChild><Link to="/auth">Entrar na minha conta</Link></Button></div> : !data?.notifications.length ? <div className="empty-state"><Bell className="mx-auto text-muted-foreground mb-3"/><h3>Tudo em dia por aqui</h3><p>Novas atividades e comunicados aparecerão aqui.</p></div> : <div className="max-h-96 overflow-auto">{data.notifications.map(n => <div key={n.id} className="record flex gap-3 items-center"><div className="flex-1"><p className="font-medium text-sm">{n.title}</p><p className="text-xs text-muted-foreground mt-1">{n.description}</p></div>{!n.is_read && <Button variant="ghost" size="icon" title="Marcar como lida" onClick={async () => { const { error } = await supabase.from('notifications').update({ is_read:true }).eq('id',n.id); if(error) toast.error('Não foi possível atualizar.'); else void refetch(); }}><CheckCheck /></Button>}</div>)}</div>}</DialogContent></Dialog>
  </div>;
}
