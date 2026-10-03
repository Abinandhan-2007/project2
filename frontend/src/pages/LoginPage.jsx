import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, AlertCircle, Sparkles } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { DEMO_USERS } from '../mocks/mockData';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [socialTooltip, setSocialTooltip] = useState(null);

  const { login, loginWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    const result = await login(email.trim(), password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result.error || 'Failed to authenticate. Check credentials.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setErrorMessage('');
    if (!credentialResponse.credential) {
      setErrorMessage('Google authentication did not return a credential.');
      return;
    }

    const result = await loginWithGoogle(credentialResponse.credential, 'CUSTOMER');
    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result.error || 'Google authentication failed.');
    }
  };

  const handleGoogleError = () => {
    setErrorMessage('Google Sign-In was cancelled or encountered an error.');
  };

  const handleDemoFill = (roleKey) => {
    const demo = DEMO_USERS[roleKey];
    if (demo) {
      setEmail(demo.email);
      setPassword(demo.password);
      setErrorMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center space-x-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">TrustLoop</span>
        </Link>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
          Sign in to your account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Access verifiable claims, active service bookings, and dispute recovery
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Card className="py-8 px-6 sm:px-10 border-slate-200">
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Active Google Sign-In */}
          <div className="mb-6">
            <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5 text-center">
              Sign In With Google OAuth
            </span>
            <div className="flex justify-center w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                shape="rectangular"
                size="large"
                theme="outline"
                text="signin_with"
                width="340"
              />
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-semibold tracking-wider">
                Or sign in with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-xs text-slate-400">min 6 chars</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full font-semibold mt-2"
            >
              Sign In with Email
            </Button>
          </form>

          {/* Other Social Logins - Disabled with 'coming soon' tooltip */}
          <div className="mt-6">
            <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">
              Other Providers
            </span>

            <div className="grid grid-cols-2 gap-3 relative">
              {/* Apple Button */}
              <div className="relative">
                <button
                  type="button"
                  disabled
                  onMouseEnter={() => setSocialTooltip('Apple login coming soon')}
                  onMouseLeave={() => setSocialTooltip(null)}
                  className="w-full py-2 px-3 border border-slate-200 rounded-xl text-xs font-medium text-slate-400 bg-slate-50 opacity-60 cursor-not-allowed flex items-center justify-center space-x-1.5"
                >
                  <span className="font-bold text-slate-500"></span>
                  <span>Apple</span>
                </button>
              </div>

              {/* Microsoft Button */}
              <div className="relative">
                <button
                  type="button"
                  disabled
                  onMouseEnter={() => setSocialTooltip('Microsoft login coming soon')}
                  onMouseLeave={() => setSocialTooltip(null)}
                  className="w-full py-2 px-3 border border-slate-200 rounded-xl text-xs font-medium text-slate-400 bg-slate-50 opacity-60 cursor-not-allowed flex items-center justify-center space-x-1.5"
                >
                  <span className="font-bold text-slate-500">田</span>
                  <span>Microsoft</span>
                </button>
              </div>

              {/* Tooltip Overlay */}
              {socialTooltip && (
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-lg pointer-events-none z-20 whitespace-nowrap">
                  {socialTooltip}
                </div>
              )}
            </div>
          </div>

          {/* Quick-fill Demo Accounts Section */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">
              Quick-Fill Demo Credentials
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoFill('customer')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition text-center"
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('provider')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition text-center"
              >
                Provider
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('admin')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition text-center"
              >
                Admin
              </button>
            </div>
          </div>

          {/* Switch to Register */}
          <div className="mt-6 text-center text-xs text-slate-500">
            <span>Don't have an account? </span>
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
