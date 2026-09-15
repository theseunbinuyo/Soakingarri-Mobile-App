import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_STORAGE_KEY = 'soakingarri:isAuthenticated';

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(AUTH_STORAGE_KEY)
      .then((value) => setIsAuthenticated(value === 'true'))
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = useCallback(() => {
    setIsAuthenticated(true);
    AsyncStorage.setItem(AUTH_STORAGE_KEY, 'true').catch(() => {});
  }, []);

  const signOut = useCallback(() => {
    setIsAuthenticated(false);
    AsyncStorage.removeItem(AUTH_STORAGE_KEY).catch(() => {});
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, isLoading, signIn, signOut }),
    [isAuthenticated, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
