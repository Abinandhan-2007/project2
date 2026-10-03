import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { login as apiLogin, register as apiRegister, getCurrentUser, getErrorMessage } from '../services/api';
import secureStore from '../services/secureStore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Restore session from SecureStore on startup
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedToken = await secureStore.getToken();
        const cachedUser = await secureStore.getUserData();

        if (storedToken) {
          setToken(storedToken);
          if (cachedUser) {
            setUser(cachedUser);
          }

          // Verify token against backend /api/auth/me
          try {
            const res = await getCurrentUser();
            if (res?.data) {
              setUser(res.data);
              await secureStore.saveUserData(res.data);
            }
          } catch (e) {
            console.warn('Session verification failed on startup:', e);
            // If token expired, clear
            if (e.response?.status === 401) {
              await secureStore.clearAuthStorage();
              setToken(null);
              setUser(null);
            }
          }
        }
      } catch (err) {
        console.error('Failed to restore secure auth session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await apiLogin(email, password);
      const authData = response.data; // AuthResponse
      const jwtToken = authData.token;
      const userProfile = authData.user;

      // Save to hardware-backed SecureStore
      await secureStore.saveToken(jwtToken);
      await secureStore.saveUserData(userProfile);

      setToken(jwtToken);
      setUser(userProfile);
      return { success: true, user: userProfile };
    } catch (err) {
      const message = getErrorMessage(err);
      setAuthError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await apiRegister(userData);
      const authData = response.data;
      const jwtToken = authData.token;
      const userProfile = authData.user;

      await secureStore.saveToken(jwtToken);
      await secureStore.saveUserData(userProfile);

      setToken(jwtToken);
      setUser(userProfile);
      return { success: true, user: userProfile };
    } catch (err) {
      const message = getErrorMessage(err);
      setAuthError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await secureStore.clearAuthStorage();
      setToken(null);
      setUser(null);
      setAuthError(null);
    } catch (e) {
      console.error('Error during logout:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = useCallback(async () => {
    try {
      const res = await getCurrentUser();
      if (res?.data) {
        setUser(res.data);
        await secureStore.saveUserData(res.data);
      }
    } catch (e) {
      console.warn('Failed to refresh profile:', e);
    }
  }, []);

  const value = {
    user,
    token,
    isLoading,
    authError,
    login,
    register,
    logout,
    refreshProfile,
    isCustomer: user?.role === 'CUSTOMER',
    isProvider: user?.role === 'PROVIDER',
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
