import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BrowseServicesPage from './pages/BrowseServicesPage';
import ProviderDetailPage from './pages/ProviderDetailPage';
import BookingsPage from './pages/BookingsPage';
import ClaimsRecoveryPage from './pages/ClaimsRecoveryPage';
import ProfilePage from './pages/ProfilePage';
import ProviderRequestsPage from './pages/ProviderRequestsPage';
import ProviderServicesPage from './pages/ProviderServicesPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminReportsPage from './pages/AdminReportsPage';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '328652220146-me5chkad2saioda4qmehoi9fesmqr9io.apps.googleusercontent.com';

// UX Route Guard (backend still strictly enforces all permissions)
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Group 1: Public Pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Group 2: Customer Shell & Marketplace */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <BrowseServicesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/provider/:id"
              element={
                <ProtectedRoute>
                  <ProviderDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <BookingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Group 3: Claims & Evidence-Gap Recovery Engine */}
            <Route
              path="/claims"
              element={
                <ProtectedRoute>
                  <ClaimsRecoveryPage />
                </ProtectedRoute>
              }
            />

            {/* Provider Portal Specific Views */}
            <Route
              path="/provider/requests"
              element={
                <ProtectedRoute>
                  <ProviderRequestsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/provider/services"
              element={
                <ProtectedRoute>
                  <ProviderServicesPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Portal Specific Views */}
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <AdminUsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute>
                  <AdminReportsPage />
                </ProtectedRoute>
              }
            />

            {/* Aliases & Fallbacks */}
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
