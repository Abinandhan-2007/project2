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
  Briefcase,
  Layers,
  FileText,
  Users,
  BarChart3,
  Settings,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Deep Navy Sidebar Component matching the TrustLoop visual design system.
 * Dynamically switches navigation items based on active role (Customer, Provider, Admin),
 * and provides a 1-click role switcher for seamless evaluation.
 */
export default function Sidebar({ className = '' }) {
  const { user, logout, isCustomer, isProvider, isAdmin, setRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSwitchRole = (newRole) => {
    if (setRole) {
      setRole(newRole);
    } else {
      const updated = { ...user, role: newRole };
      localStorage.setItem('trustloop_user', JSON.stringify(updated));
      window.location.reload();
    }
  };

  // Customer Navigation
  const customerNav = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Browse Services', path: '/services', icon: Search },
    { label: 'My Bookings', path: '/bookings', icon: CalendarCheck2, badge: '3' },
    { label: 'My Claims', path: '/claims', icon: FileCheck, badge: '1 Open', badgeColor: 'bg-amber-500' },
    { label: 'Messages', path: '/messages', icon: MessageSquare },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  // Provider Navigation
  const providerNav = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Services', path: '/provider/services', icon: Layers },
    { label: 'Bookings', path: '/provider/requests', icon: CalendarCheck2, badge: '3' },
    { label: 'Quotations', path: '/provider/requests', icon: FileText },
    { label: 'My Cases', path: '/claims', icon: FileCheck, badge: '1 Active', badgeColor: 'bg-amber-500' },
    { label: 'Messages', path: '/messages', icon: MessageSquare },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  // Admin Navigation
  const adminNav = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Users', path: '/admin/users', icon: Users, badge: '248' },
    { label: 'Providers', path: '/services', icon: Briefcase },
    { label: 'Bookings', path: '/bookings', icon: CalendarCheck2, badge: '142' },
    { label: 'Cases', path: '/claims', icon: FileCheck, badge: '18 Open', badgeColor: 'bg-rose-500' },
    { label: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { label: 'Settings', path: '/profile', icon: Settings },
  ];

  const currentRole = user?.role || 'CUSTOMER';
  const navItems = currentRole === 'ADMIN' ? adminNav : currentRole === 'PROVIDER' ? providerNav : customerNav;

  return (
    <aside className={`w-64 bg-[#0d1527] text-slate-300 flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-[#1e293b] select-none ${className}`}>
      <div>
        {/* Brand Header */}
        <div className="h-18 flex items-center px-6 border-b border-[#1e293b] space-x-3">
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
            <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-extrabold text-base text-white tracking-tight">TrustLoop</span>
            <span className="block text-[10px] text-blue-400 font-semibold -mt-0.5">
              {currentRole === 'ADMIN' ? 'Admin Portal' : currentRole === 'PROVIDER' ? 'Provider Portal' : 'Customer Portal'}
            </span>
          </div>
        </div>

        {/* Role Switcher Pill for Interview / Evaluator Testing */}
        <div className="px-5 py-3 border-b border-[#1e293b]/70 bg-[#090e1a]/60">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-slate-400 font-medium">Portal View:</span>
            <span className="font-bold text-blue-400 uppercase tracking-wide">{currentRole}</span>
          </div>
          <div className="grid grid-cols-3 gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => handleSwitchRole('CUSTOMER')}
              className={`py-1 text-[10px] font-bold rounded transition ${
                currentRole === 'CUSTOMER' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Cust
            </button>
            <button
              type="button"
              onClick={() => handleSwitchRole('PROVIDER')}
              className={`py-1 text-[10px] font-bold rounded transition ${
                currentRole === 'PROVIDER' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Prov
            </button>
            <button
              type="button"
              onClick={() => handleSwitchRole('ADMIN')}
              className={`py-1 text-[10px] font-bold rounded transition ${
                currentRole === 'ADMIN' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1" aria-label="Sidebar navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.label + item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
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
                    item.badgeColor || 'bg-slate-800 text-slate-300'
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
      <div className="p-4 border-t border-[#1e293b]">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-2">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
              {user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2) : 'TL'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">
                {user?.fullName || 'User'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.email || 'user@trustloop.com'}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
