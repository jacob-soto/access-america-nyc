import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  type User,
} from 'firebase/auth';
import { getFirebaseApp } from '../firebase';

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isRoot: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

function normalizeEmail(email: string | null | undefined): string {
  return (email ?? '').trim().toLowerCase();
}

function computeIsRoot(user: User | null): boolean {
  if (!user) return false;

  const rootUid = (import.meta.env.VITE_ROOT_ADMIN_UID ?? '').trim();
  if (rootUid && user.uid === rootUid) return true;

  const rootEmail = normalizeEmail(import.meta.env.VITE_ROOT_ADMIN_EMAIL);
  if (rootEmail && normalizeEmail(user.email) === rootEmail) return true;

  return false;
}

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(getFirebaseApp());
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const value: AuthState = useMemo(() => {
    return {
      user,
      isLoading,
      isRoot: computeIsRoot(user),
      signIn: async () => {
        const auth = getAuth(getFirebaseApp());
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      },
      signOut: async () => {
        const auth = getAuth(getFirebaseApp());
        await signOut(auth);
      },
    };
  }, [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}

