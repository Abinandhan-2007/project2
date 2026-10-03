import axios from 'axios';

/**
 * Central Axios API client for TrustLoop Web App.
 * Automatically injects:
 * - 'ngrok-skip-browser-warning: true' header for ngrok tunneling
 * - 'Authorization: Bearer <token>' if JWT is saved in localStorage
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

// Request interceptor: attaches JWT token if stored
api.interceptors.request.use(
  (config) => {
    // Ensure ngrok skip header is present on every single request
    config.headers['ngrok-skip-browser-warning'] = 'true';

    const token = localStorage.getItem('trustloop_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handles session invalidation
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('trustloop_token');
      localStorage.removeItem('trustloop_user');
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/api/auth/me');
  return response.data;
};

export const loginWithGoogle = async (idToken, role = 'CUSTOMER') => {
  const response = await api.post('/api/auth/google', { idToken, role });
  return response.data;
};

export const getHealth = async () => {
  const response = await api.get('/api/health');
  return response.data;
};

export default api;
