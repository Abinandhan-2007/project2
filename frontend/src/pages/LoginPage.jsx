import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { DEMO_USERS } from '../mocks/mockData';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [socialTooltip, setSocialTooltip] = useState(null);
  const [googleConfigHelp, setGoogleConfigHelp] = useState(false);

  const { login, loginWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email address and password.');
      return;
    }

    const result = await login(email.trim(), password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result.error || 'Invalid email or password.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setErrorMessage('');
    if (!credentialResponse?.credential) {
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
    setErrorMessage('Google Sign-In failed or was blocked by origin restriction (invalid_client).');
    setGoogleConfigHelp(true);
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
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        
        {/* Brand Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-3 group">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/25 group-hover:bg-blue-700 transition">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              TrustLoop
            </span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to your account
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200/80 shadow-card">
          
          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{errorMessage}</span>
                {googleConfigHelp && (
                  <p className="mt-1 text-[11px] text-rose-600">
                    <strong>Tip:</strong> In Google Cloud Console, add <code>http://localhost:5173</code> to <em>Authorized JavaScript origins</em> for Client ID <code>328652220146...</code>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-600 font-medium">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Password reset link will be sent to your email.')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-blue-500/30 transition duration-150 disabled:opacity-60"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Switch to Register */}
          <div className="mt-5 text-center text-xs text-slate-500">
            <span>Don't have an account? </span>
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
              Create one
            </Link>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400 font-medium">
                or
              </span>
            </div>
          </div>

          {/* 3 Social Buttons: Google, Apple, Microsoft */}
          <div className="grid grid-cols-3 gap-3 relative">
            
            {/* Google Button with Embedded GoogleLogin Overlay */}
            <div className="relative group">
              <div className="w-full py-2.5 px-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 flex items-center justify-center space-x-2 transition cursor-pointer shadow-2xs">
                {/* Google SVG Icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Google</span>
              </div>

              {/* Invisible native Google login trigger over the styled button */}
              <div className="absolute inset-0 opacity-0 overflow-hidden cursor-pointer">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  type="standard"
                  shape="rectangular"
                  size="medium"
                  width="130"
                />
              </div>
            </div>

            {/* Apple Button */}
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setSocialTooltip('Apple login coming soon')}
                onMouseLeave={() => setSocialTooltip(null)}
                className="w-full py-2.5 px-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 flex items-center justify-center space-x-2 transition cursor-pointer shadow-2xs"
              >
                {/* Apple SVG Icon */}
                <svg className="w-4 h-4 fill-slate-900 shrink-0" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.03-7.64-7.85-11.84-14.47-6.22-9.84-11.13-20.94-14.72-33.32-3.59-12.38-5.38-23.75-5.38-34.12 0-14.83 3.82-27.24 11.45-37.24 7.63-10 17.38-15.11 29.26-15.35 4.83 0 10.46 1.29 16.89 3.86 6.43 2.57 10.43 3.91 12 4.02 2.37-.34 6.64-1.78 12.82-4.32 6.18-2.54 11.59-3.68 16.24-3.41 12.37.6 22.42 4.88 30.15 12.84-10.74 6.53-15.96 15.63-15.66 27.3.3 9.4 3.94 17.27 10.92 23.6 6.98 6.33 15.3 10.02 24.96 11.06-2.09 6.28-4.59 12.88-7.51 19.8zm-30.82-108.9c0-6.72 2.45-13.06 7.35-19.01 4.9-5.95 11-9.92 18.3-11.91.56 1.48.84 3.03.84 4.66 0 6.6-2.52 13-7.56 19.2-5.04 6.2-11.19 10.15-18.45 11.85-.32-1.57-.48-3.17-.48-4.79z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>

            {/* Microsoft Button */}
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setSocialTooltip('Microsoft login coming soon')}
                onMouseLeave={() => setSocialTooltip(null)}
                className="w-full py-2.5 px-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 flex items-center justify-center space-x-2 transition cursor-pointer shadow-2xs"
              >
                {/* Microsoft SVG Icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
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

          {/* Quick-fill Demo Accounts Bar (Convenient testing) */}
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

        </div>

      </div>
    </div>
  );
}
