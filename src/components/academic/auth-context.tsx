import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
const AuthContext = createContext<{ user: User | null; loading: boolean }>({ user: null, loading: true });
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();
  useEffect(() => {
    let live = true;
    const refresh = async () => { const { data } = await supabase.auth.getUser(); if (live) { setUser(data.user); setLoading(false); } };
    const { data: listener } = supabase.auth.onAuthStateChange(event => {
      if (!['SIGNED_IN','SIGNED_OUT','USER_UPDATED'].includes(event)) return;
      if (event === 'SIGNED_OUT') { setUser(null); queryClient.removeQueries({ queryKey: ['workspace'] }); }
      else { void refresh(); void queryClient.invalidateQueries({ queryKey: ['workspace'] }); }
      void router.invalidate();
    });
    void refresh();
    return () => { live = false; listener.subscription.unsubscribe(); };
  }, [router, queryClient]);
  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
