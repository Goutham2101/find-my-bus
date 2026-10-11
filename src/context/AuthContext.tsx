import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  registerUser: (data: { name: string; email: string; phone: string; password: string }) => Promise<void>;
  switchUserRole: (newRole: UserRole) => void;
  logoutUser: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    authService.getCurrentUser().then((u) => {
      setUser(u);
      setIsLoading(false);
    });
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const u = await authService.loginWithEmail(email, pass);
      setUser(u);
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (data: { name: string; email: string; phone: string; password: string }) => {
    setIsLoading(true);
    try {
      const u = await authService.register(data);
      setUser(u);
    } finally {
      setIsLoading(false);
    }
  };

  const switchUserRole = (newRole: UserRole) => {
    const updated = authService.switchRole(newRole);
    setUser({ ...updated });
  };

  const logoutUser = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateUser = async (updates: Partial<User>) => {
    const updated = await authService.updateProfile(updates);
    setUser({ ...updated });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'passenger',
        isLoading,
        login,
        registerUser,
        switchUserRole,
        logoutUser,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
