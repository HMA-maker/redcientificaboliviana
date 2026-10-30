'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export type AuthModalView = 'login' | 'register' | 'forgot' | null;

interface UserSession {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  authModalView: AuthModalView;
  openAuthModal: (view: AuthModalView) => void;
  closeAuthModal: () => void;
  signInWithEmail: (email: string, pass: string) => Promise<{ error?: string }>;
  signUpWithEmail: (email: string, pass: string, fullName: string) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  authModalView: null,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  signInWithEmail: async () => ({}),
  signUpWithEmail: async () => ({}),
  signInWithGoogle: async () => ({}),
  resetPassword: async () => ({}),
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModalView, setAuthModalView] = useState<AuthModalView>(null);

  useEffect(() => {
    // 1. Si Supabase está configurado en la nube
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '',
            avatarUrl: session.user.user_metadata?.avatar_url,
          });
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '',
            avatarUrl: session.user.user_metadata?.avatar_url,
          });
        } else {
          setUser(null);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      // 2. Modo Local / Codespaces: sesión guardada en localStorage
      const savedUser = localStorage.getItem('rcb_local_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem('rcb_local_user');
        }
      }
      setLoading(false);
    }
  }, []);

  const openAuthModal = (view: AuthModalView) => setAuthModalView(view);
  const closeAuthModal = () => setAuthModalView(null);

  const signInWithEmail = async (email: string, pass: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) return { error: error.message };
      closeAuthModal();
      return {};
    }

    // Emulación local para pruebas en Codespaces
    if (pass.length < 6) {
      return { error: 'La contraseña debe tener al menos 6 caracteres.' };
    }
    const mockUser: UserSession = {
      id: 'local-' + Date.now(),
      email,
      fullName: email.split('@')[0],
    };
    setUser(mockUser);
    localStorage.setItem('rcb_local_user', JSON.stringify(mockUser));
    closeAuthModal();
    return {};
  };

  const signUpWithEmail = async (email: string, pass: string, fullName: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: { data: { full_name: fullName } },
      });
      if (error) return { error: error.message };
      closeAuthModal();
      return {};
    }

    // Emulación local para pruebas en Codespaces
    if (pass.length < 6) {
      return { error: 'La contraseña debe tener al menos 6 caracteres.' };
    }
    const mockUser: UserSession = {
      id: 'local-' + Date.now(),
      email,
      fullName,
    };
    setUser(mockUser);
    localStorage.setItem('rcb_local_user', JSON.stringify(mockUser));
    closeAuthModal();
    return {};
  };

  const signInWithGoogle = async (): Promise<{ error?: string }> => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      if (error) return { error: error.message };
      return {};
    }

    // Emulación local para pruebas en Codespaces
    const mockUser: UserSession = {
      id: 'google-demo-user',
      email: 'investigador.bolivia@gmail.com',
      fullName: 'Dr. Investigador Boliviano',
      avatarUrl: '',
    };
    setUser(mockUser);
    localStorage.setItem('rcb_local_user', JSON.stringify(mockUser));
    closeAuthModal();
    return {};
  };

  const resetPassword = async (email: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/actualizar-password`,
      });
      if (error) return { error: error.message };
    }
    return {};
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('rcb_local_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authModalView,
        openAuthModal,
        closeAuthModal,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        resetPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
