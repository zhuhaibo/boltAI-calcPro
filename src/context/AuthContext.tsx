import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : { isAuthenticated: false, username: null };
  });

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const login = (username: string) => {
    setAuth({ isAuthenticated: true, username });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, username: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}