import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as authService from '@/services/auth.service';

const AuthContext = createContext(null);

const roleDashboardMap = {
  student: '/dashboard/student',
  teacher: '/dashboard/teacher',
  admin: '/dashboard/admin',
};

function getDashboardPath(user) {
  return roleDashboardMap[user?.role] || '/dashboard/student';
}

function needsOnboarding(user) {
  if (!user) return false;
  const completed = localStorage.getItem(`onboarding_${user.id || user._id}`);
  return completed !== 'true';
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsLoading(false);
      return;
    }
    authService
      .getProfile()
      .then((data) => setUser(data.user ?? data))
      .catch(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(
    async (email, password) => {
      const data = await authService.login(email, password);
      const u = data.user ?? data;
      setUser(u);
      toast.success('Welcome back!');
      if (needsOnboarding(u)) {
        navigate('/onboarding', { replace: true });
      } else {
        navigate(getDashboardPath(u), { replace: true });
      }
    },
    [navigate],
  );

  const register = useCallback(
    async (userData) => {
      const data = await authService.register(userData);
      const u = data.user ?? data;
      setUser(u);
      toast.success('Account created successfully!');
      navigate('/onboarding', { replace: true });
    },
    [navigate],
  );

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    navigate('/', { replace: true });
    toast.success('Logged out successfully');
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
