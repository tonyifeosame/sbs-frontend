import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

const API_URL = 'http://localhost:8080';

interface User {
  username: string;
  avatar_url: string;
  wins?: number;
  losses?: number;
  // Add other user properties as needed
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      console.debug('[AuthContext] fetchProfile start', { token });
      if (token) {
        try {
          const response = await fetch(`${API_URL}/profile`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          console.debug('[AuthContext] /profile response status', response.status);
          if (response.ok) {
            const data = await response.json();
            console.debug('[AuthContext] /profile data', data);
            setUser(data);
          } else {
            // Token is invalid or expired (401) -> remove token, otherwise keep token but clear user
            const errBody = await response.text();
            console.warn('[AuthContext] /profile returned non-OK', { status: response.status, body: errBody });
            if (response.status === 401) {
              // Token is invalid or expired
              localStorage.removeItem('token');
              setToken(null);
              setUser(null);
            } else {
              // server returned other non-OK (e.g., 500) - keep token but clear user
              setUser(null);
            }
          }
        } catch (err) {
          console.error("Failed to fetch profile:", err);
          // Don't clear token here (network issue) so user won't be logged out unnecessarily
          setUser(null);
        }
      } else {
        console.debug('[AuthContext] no token available');
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, [token]);

  const login = async (newToken: string) => {
    console.debug('[AuthContext] login called', { newToken: newToken ? '***REDACTED***' : null });
    setIsLoading(true);
    try {
      // First validate token by fetching profile with the new token
      const response = await fetch(`${API_URL}/profile`, {
        headers: { 'Authorization': `Bearer ${newToken}` },
      });
      if (!response.ok) {
        const body = await response.text().catch(() => '')
        throw new Error(body || `Login validation failed: ${response.status}`);
      }
      const data = await response.json();
      // token valid — persist and set state
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(data);
    } catch (err) {
      console.error('[AuthContext] login validation error', err);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};