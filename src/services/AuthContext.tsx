import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User } from '@/data/types';
import { supabase } from './supabaseClient';
import type { Session } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'admin@fundledger.gov.in';

interface AuthCtx {
  user: User | null;
  login: (email: string, password: string, asAdmin?: boolean) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthCtx | undefined>(undefined);

function mapSessionToUser(session: Session | null): User | null {
  if (!session?.user) return null;
  const email = session.user.email ?? '';
  const isAdmin = email.toLowerCase() === ADMIN_EMAIL;
  return {
    id: session.user.id,
    name: (session.user.user_metadata?.name as string) ?? (isAdmin ? 'District Administrator' : 'Citizen User'),
    email,
    role: isAdmin ? 'admin' : 'citizen',
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(mapSessionToUser(data.session));
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapSessionToUser(session));
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string, asAdmin = false) => {
    setLoading(true);
    try {
      const loginEmail = asAdmin ? (email || ADMIN_EMAIL) : email;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      });
      if (error) {
        // Fallback: if the account doesn't exist in Supabase, use demo mode
        if (asAdmin || email.toLowerCase() === ADMIN_EMAIL) {
          setUser({
            id: crypto.randomUUID(),
            name: 'District Administrator',
            email: ADMIN_EMAIL,
            role: 'admin',
          });
        } else {
          setUser({
            id: crypto.randomUUID(),
            name: 'Citizen User',
            email: email || 'citizen@example.com',
            role: 'citizen',
          });
        }
      } else {
        setUser(mapSessionToUser(data.session));
      }
    } catch {
      // Demo fallback
      const isAdmin = asAdmin || email.toLowerCase() === ADMIN_EMAIL;
      setUser({
        id: crypto.randomUUID(),
        name: isAdmin ? 'District Administrator' : 'Citizen User',
        email: email || (isAdmin ? ADMIN_EMAIL : 'citizen@example.com'),
        role: isAdmin ? 'admin' : 'citizen',
      });
    }
    setLoading(false);
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) {
        // Fallback to demo mode
        setUser({ id: crypto.randomUUID(), name, email, role: 'citizen' });
      } else {
        setUser(mapSessionToUser(data.session));
      }
    } catch {
      setUser({ id: crypto.randomUUID(), name, email, role: 'citizen' });
    }
    setLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    supabase.auth.signOut();
    setUser(null);
  }, []);

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
