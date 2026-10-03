import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login as apiLogin, register as apiRegister, loginWithGoogle as apiLoginWithGoogle, getCurrentUser } from '../services/api';
import { DEMO_USERS } from '../mocks/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on initial render
  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const storedToken = localStorage.getItem('trustloop_token');
        const storedUser = localStorage.getItem('trustloop_user');

        if (storedToken) {
          setToken(storedToken);
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }

          // Verify with live backend if reachable
          try {
            const res = await getCurrentUser();
            if (res?.data) {
              setUser(res.data);
              localStorage.setItem('trustloop_user', JSON.stringify(res.data));
            }
          } catch (e) {
            console.warn('Backend session verification failed, falling back to cached profile:', e.message);
          }
        }
      } catch (err) {
        console.error('Failed to restore auth session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // 1. Try real backend first
      const res = await apiLogin(email, password);
      const authData = res.data;
      const jwtToken = authData.token;
      const userProfile = authData.user;

      localStorage.setItem('trustloop_token', jwtToken);
      localStorage.setItem('trustloop_user', JSON.stringify(userProfile));

      setToken(jwtToken);
      setUser(userProfile);
      return { success: true, user: userProfile };
    } catch (err) {
      console.warn('Live API login failed, checking demo fallback accounts:', err.message);

      // 2. Demo fallback check if backend is offline during frontend design review
      const matchedDemo = Object.values(DEMO_USERS).find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (matchedDemo) {
        const mockToken = 'mock_jwt_token_' + matchedDemo.role.toLowerCase();
        const profile = {
          id: 'demo-' + matchedDemo.role.toLowerCase(),
          email: matchedDemo.email,
          fullName: matchedDemo.fullName,
          role: matchedDemo.role,
        };

        localStorage.setItem('trustloop_token', mockToken);
        localStorage.setItem('trustloop_user', JSON.stringify(profile));

        setToken(mockToken);
        setUser(profile);
        return { success: true, user: profile };
      }

      const message = err.response?.data?.message || err.message || 'Invalid email or password';
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const res = await apiRegister(userData);
      const authData = res.data;
      const jwtToken = authData.token;
      const userProfile = authData.user;

      localStorage.setItem('trustloop_token', jwtToken);
      localStorage.setItem('trustloop_user', JSON.stringify(userProfile));

      setToken(jwtToken);
      setUser(userProfile);
      return { success: true, user: userProfile };
    } catch (err) {
      console.warn('Live API registration failed, using mock fallback:', err.message);

      // Mock registration fallback
      const mockToken = 'mock_jwt_token_' + userData.role.toLowerCase();
      const profile = {
        id: 'user-' + Date.now(),
        email: userData.email,
        fullName: userData.fullName,
        role: userData.role,
        phone: userData.phone || null,
      };

      localStorage.setItem('trustloop_token', mockToken);
      localStorage.setItem('trustloop_user', JSON.stringify(profile));

      setToken(mockToken);
      setUser(profile);
      return { success: true, user: profile };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (credential, role = 'CUSTOMER') => {
    setIsLoading(true);
    try {
      // 1. Send ID Token to backend POST /api/auth/google
      const res = await apiLoginWithGoogle(credential, role);
      const authData = res.data;
      const jwtToken = authData.token;
      const userProfile = authData.user;

      localStorage.setItem('trustloop_token', jwtToken);
      localStorage.setItem('trustloop_user', JSON.stringify(userProfile));

      setToken(jwtToken);
      setUser(userProfile);
      return { success: true, user: userProfile };
    } catch (err) {
      console.warn('Backend Google auth failed, parsing token client-side:', err.message);

      try {
        // 2. Decode credential JWT directly as fallback
        const decoded = jwtDecode(credential);
        const profile = {
          id: decoded.sub || 'google-' + Date.now(),
          email: decoded.email,
          fullName: decoded.name || 'Google User',
          role: role,
          picture: decoded.picture || null,
        };

        const mockToken = 'google_jwt_token_' + profile.id;
        localStorage.setItem('trustloop_token', mockToken);
        localStorage.setItem('trustloop_user', JSON.stringify(profile));

        setToken(mockToken);
        setUser(profile);
        return { success: true, user: profile };
      } catch (decodeErr) {
        console.error('Failed to decode Google credential:', decodeErr);
        return { success: false, error: 'Failed to process Google sign-in credentials.' };
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('trustloop_token');
    localStorage.removeItem('trustloop_user');
    setToken(null);
    setUser(null);
  };

  const loginAsDemo = (roleKey) => {
    const demo = DEMO_USERS[roleKey.toLowerCase()];
    if (demo) {
      return login(demo.email, demo.password);
    }
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    loginWithGoogle,
    logout,
    loginAsDemo,
    isAuthenticated: !!user,
    isCustomer: user?.role === 'CUSTOMER',
    isProvider: user?.role === 'PROVIDER',
    isAdmin: user?.role === 'ADMIN',
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
