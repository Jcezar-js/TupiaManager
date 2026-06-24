import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthState } from '../types/index';
import { AuthContext, decodeToken } from './useAuth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AuthState>(() => {
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      const userId = decodeToken(token);
      return { token, userId };
    }
    return { token: null, userId: null };
  });
  const navigate = useNavigate();

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

