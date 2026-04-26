import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthState } from '../types/index';

interface AuthContextType extends AuthState {
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeToken(token: string): string | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.id || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ token: null, userId: null });
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      const userId = decodeToken(token);
      setState({ token, userId });
    }
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      sessionStorage.removeItem('auth_token');
      setState({ token: null, userId: null });
      navigate('/login', { replace: true });
    };

    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, [navigate]);

  const login = (token: string) => {
    const userId = decodeToken(token);
    sessionStorage.setItem('auth_token', token);
    setState({ token, userId });
  };

  const logout = () => {
    sessionStorage.removeItem('auth_token');
    setState({ token: null, userId: null });
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
