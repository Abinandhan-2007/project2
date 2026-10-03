import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CalendarCheck2,
  FileCheck,
  CheckCircle2,
  Star,
  Search,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  Users,
  AlertTriangle,
  Briefcase,
  Layers,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import { MOCK_CATEGORIES, MOCK_PROVIDERS, MOCK_BOOKINGS_DATA, MOCK_ADMIN_METRICS } from '../mocks/mockData';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const currentRole = user?.role || 'CUSTOMER';

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Row matching Dashboard in screenshot */}
        <header className="h-20 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex-1 max-w-xl">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search services, providers, or bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition shadow-2xs"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5 stroke-[2.2]" />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-3.5 pl-6">
            <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                {user?.fullName || 'Abinandhan'}
              </span>
              <span className="text-[10px] text-slate-400 font-medium capitalize">
                {currentRole.toLowerCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Role Dashboard Body */}
        <main className="flex-1 p-8 space-y-8 max-w-7xl w-full">
          
          {/* ============================================================== */}
          {/* 1. CUSTOMER DASHBOARD (Screens 4 & Image 1 Middle-Left)        */}
          {/* ============================================================== */}
          {currentRole === 'CUSTOMER' && (
            <>
              {/* Headline */}
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Good morning, {user?.fullName || 'Abinandhan'}!
                </h1>
                <p className="text-xs text-slate-500">
                  Find trusted professionals or manage your ongoing services.
                </p>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Active Bookings */}
                <div
                  onClick={() => navigate('/bookings')}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-card transition duration-150 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3">
                    <CalendarCheck2 className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">3</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">Active Bookings</p>
                </div>

                {/* Open Claim */}
                <div
                  onClick={() => navigate('/claims')}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-card transition duration-150 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 mb-3">
                    <AlertTriangle className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">1</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">Open Claim</p>
                </div>

                {/* Completed Jobs */}
                <div
                  onClick={() => navigate('/bookings')}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-card transition duration-150 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
                    <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">2</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">Completed Jobs</p>
                </div>

                {/* Your Rating */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-3">
                    <Star className="w-5 h-5 stroke-[2] fill-purple-600" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">4.8</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">Your Rating</p>
                </div>
              </div>

              {/* Popular Services Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900">Popular Services</h2>
                  <Link
                    to="/services"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <span>View all</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {/* Electricians */}
                  <div
                    onClick={() => navigate('/services?category=electrical')}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-card transition duration-150 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="h-32 bg-slate-100 overflow-hidden">
                      <img
                        src="/hero-technician.jpg"
                        alt="Electricians"
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">Electricians</h4>
                      <p className="text-xs text-slate-500 font-medium">From ₹409</p>
                      <div className="flex items-center space-x-1 text-[11px] text-amber-500 pt-1 font-semibold">
                        <span>★ 4.7</span>
                        <span className="text-slate-400 font-normal">(1.2k+ reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Plumbers */}
                  <div
                    onClick={() => navigate('/services?category=plumbing')}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-card transition duration-150 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="h-32 bg-slate-100 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&auto=format&fit=crop&q=80"
                        alt="Plumbers"
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">Plumbers</h4>
                      <p className="text-xs text-slate-500 font-medium">From ₹399</p>
                      <div className="flex items-center space-x-1 text-[11px] text-amber-500 pt-1 font-semibold">
                        <span>★ 4.6</span>
                        <span className="text-slate-400 font-normal">(980+ reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Appliance Technicians */}
                  <div
                    onClick={() => navigate('/services?category=appliances')}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-card transition duration-150 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="h-32 bg-slate-100 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80"
                        alt="Appliance Technicians"
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">Appliance Technicians</h4>
                      <p className="text-xs text-slate-500 font-medium">From ₹599</p>
                      <div className="flex items-center space-x-1 text-[11px] text-amber-500 pt-1 font-semibold">
                        <span>★ 4.5</span>
                        <span className="text-slate-400 font-normal">(760+ reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Tutors */}
                  <div
                    onClick={() => navigate('/services?category=tutoring')}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-card transition duration-150 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="h-32 bg-slate-100 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&auto=format&fit=crop&q=80"
                        alt="Tutors"
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">Tutors</h4>
                      <p className="text-xs text-slate-500 font-medium">From ₹300</p>
                      <div className="flex items-center space-x-1 text-[11px] text-amber-500 pt-1 font-semibold">
                        <span>★ 4.8</span>
                        <span className="text-slate-400 font-normal">(1.5k+ reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Differentiator Quick-Access Banner */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Evidence-Gap Recovery Engine Active</span>
                  </div>
                  <h3 className="text-lg font-bold">1 Active Dispute on Claim #CL-001</h3>
                  <p className="text-xs text-blue-100">
                    The engine has calculated a Case Sufficiency Score of 62% and formulated recommended evidence requests.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/claims')}
                  className="bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 shadow-sm transition"
                >
                  View Recovery Engine
                </button>
              </div>
            </>
          )}

          {/* ============================================================== */}
          {/* 2. PROVIDER DASHBOARD (Image 2 Provider Portal)                */}
          {/* ============================================================== */}
          {currentRole === 'PROVIDER' && (
            <>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Welcome back, Ramesh!
                </h1>
                <p className="text-xs text-slate-500">
                  Here's what's happening with your services today.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <span className="text-2xl font-extrabold text-slate-900 block">12</span>
                  <span className="text-xs font-semibold text-slate-500 mt-1 block">Total Bookings</span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-2 block">+2 this week</span>
                </div>

                <div
                  onClick={() => navigate('/provider/requests')}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs cursor-pointer hover:shadow-card transition"
                >
                  <span className="text-2xl font-extrabold text-slate-900 block">3</span>
                  <span className="text-xs font-semibold text-slate-500 mt-1 block">Pending Quotations</span>
                  <span className="text-[10px] text-blue-600 font-semibold mt-2 block">View Requests &rarr;</span>
                </div>

                <div
                  onClick={() => navigate('/claims')}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs cursor-pointer hover:shadow-card transition"
                >
                  <span className="text-2xl font-extrabold text-amber-600 block">1</span>
                  <span className="text-xs font-semibold text-slate-500 mt-1 block">Active Cases</span>
                  <span className="text-[10px] text-amber-600 font-semibold mt-2 block">Action Required</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <span className="text-2xl font-extrabold text-slate-900 block">4.8</span>
                  <span className="text-xs font-semibold text-slate-500 mt-1 block">Rating</span>
                  <span className="text-[10px] text-slate-400 font-semibold mt-2 block">(24 reviews)</span>
                </div>
              </div>

              {/* Upcoming Bookings & Grow Business */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">Upcoming Bookings</h3>
                    <Link to="/provider/requests" className="text-xs text-blue-600 font-semibold">View all</Link>
                  </div>

                  <div className="space-y-3">
                    {MOCK_BOOKINGS_DATA.map((b) => (
                      <div key={b.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-900">{b.serviceTitle}</p>
                          <p className="text-[11px] text-slate-500">{b.id} &bull; {b.date} &bull; {b.time}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grow Business Widget */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Grow Your Business</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Keep your services updated, maintain verifiable claim proofs, and earn priority placement in search.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/provider/services')}
                    className="w-full mt-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition"
                  >
                    Manage Services
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ============================================================== */}
          {/* 3. ADMIN DASHBOARD (Image 2 Admin Portal)                      */}
          {/* ============================================================== */}
          {currentRole === 'ADMIN' && (
            <>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  System Overview
                </h1>
                <p className="text-xs text-slate-500">
                  Monitor platform activity, verifiable claim compliance, and dispute resolution metrics.
                </p>
              </div>

              {/* 4 Admin Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <span className="text-2xl font-extrabold text-slate-900 block">{MOCK_ADMIN_METRICS.totalUsers}</span>
                  <span className="text-xs font-semibold text-slate-500 mt-1 block">Total Users</span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-2 block">{MOCK_ADMIN_METRICS.usersDelta}</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <span className="text-2xl font-extrabold text-slate-900 block">{MOCK_ADMIN_METRICS.totalBookings}</span>
                  <span className="text-xs font-semibold text-slate-500 mt-1 block">Total Bookings</span>
                  <span className="text-[10px] text-blue-600 font-semibold mt-2 block">{MOCK_ADMIN_METRICS.bookingsDelta}</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <span className="text-2xl font-extrabold text-amber-600 block">{MOCK_ADMIN_METRICS.openCases}</span>
                  <span className="text-xs font-semibold text-slate-500 mt-1 block">Open Cases</span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-2 block">{MOCK_ADMIN_METRICS.casesDelta}</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <span className="text-2xl font-extrabold text-slate-900 block">{MOCK_ADMIN_METRICS.resolvedCases}</span>
                  <span className="text-xs font-semibold text-slate-500 mt-1 block">Resolved Cases</span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-2 block">{MOCK_ADMIN_METRICS.resolvedDelta}</span>
                </div>
              </div>

              {/* Charts & Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Bookings Trend Chart Widget */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Bookings Trend</h3>
                      <p className="text-[11px] text-slate-400">Weekly job volume across all trade specialists</p>
                    </div>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                      Last 7 days
                    </span>
                  </div>

                  {/* Trend Graphic */}
                  <div className="h-44 w-full flex items-end justify-between gap-3 pt-6 px-2">
                    {[45, 62, 58, 80, 72, 95, 110].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          style={{ height: `${h}%` }}
                          className="w-full bg-blue-600/80 hover:bg-blue-600 rounded-t-lg transition duration-200"
                        />
                        <span className="text-[10px] text-slate-400 font-medium">Day {i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Category Distribution */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Category Distribution</h3>
                    <p className="text-[11px] text-slate-400">Active market share</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {MOCK_ADMIN_METRICS.categoryDistribution.map((c) => (
                      <div key={c.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-700">{c.name}</span>
                          <span className="text-slate-900 font-bold">{c.percentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${c.percentage}%`, backgroundColor: c.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
}
