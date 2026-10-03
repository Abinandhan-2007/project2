import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  CalendarCheck2,
  FileCheck,
  MessageSquare,
  User,
  LogOut,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Deep Navy Sidebar Component matching the TrustLoop visual design system.
 */
export default function Sidebar({ className = '' }) {
  const { user, logout, isCustomer, isProvider, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Browse Services', path: '/services', icon: Search },
    { label: 'My Bookings', path: '/bookings', icon: CalendarCheck2, badge: '3' },
    { label: 'My Claims', path: '/claims', icon: FileCheck, badge: '1 Dispute', badgeColor: 'bg-rose-500' },
    { label: 'Messages', path: '/messages', icon: MessageSquare, badge: 'New' },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className={`w-64 bg-navy-sidebar text-slate-300 flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-navy-light select-none ${className}`}>
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-navy-light space-x-3">
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-base text-white tracking-tight">TrustLoop</span>
            <span className="block text-[10px] text-blue-400 font-medium -mt-0.5">Recovery Engine</span>
          </div>
        </div>

        {/* User Role Tag */}
        <div className="px-6 py-3 border-b border-navy-light/60 bg-navy-dark/40">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Signed in as:</span>
            <span className="font-semibold text-blue-300 bg-blue-900/40 border border-blue-500/30 px-2 py-0.5 rounded-full text-[11px]">
              {user?.role || 'GUEST'}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5" aria-label="Sidebar navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.badgeColor || 'bg-slate-700 text-slate-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-navy-light">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/50 border border-slate-800 mb-2">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
              {user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2) : 'TL'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{user?.fullName || 'Demo User'}</p>
              <p className="text-[11px] text-slate-400 truncate">{user?.email || 'user@trustloop.com'}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
