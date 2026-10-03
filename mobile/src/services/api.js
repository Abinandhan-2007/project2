import axios from 'axios';
import { API_BASE_URL } from '../config/env';
import { getToken, clearAuthStorage } from './secureStore';

/**
 * Axios client instance for TrustLoop Mobile App.
 * Matches web app architecture: automatic JWT injection via SecureStore,
 * consistent error format extraction, and central timeout/headers.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor: reads JWT from SecureStore and injects Bearer header
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn('Failed to retrieve token for request:', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: automatically handles session invalidation
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('401 Unauthorized encountered on mobile: clearing SecureStore session');
      await clearAuthStorage();
    }
    return Promise.reject(error);
  }
);

// Extract standardized error messages
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.message) {
    if (error.message.includes('Network Error')) {
      return `Cannot reach server at ${API_BASE_URL}. Ensure Spring Boot is running and phone/emulator is on the same network.`;
    }
    return error.message;
  }
  return 'An unexpected network error occurred';
};

// API Services
export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data; // ApiResponse<AuthResponse>
};

export const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/api/auth/me');
  return response.data; // ApiResponse<UserSummaryDto>
};

export const getHealth = async () => {
  const response = await api.get('/api/health');
  return response.data;
};

export default api;
