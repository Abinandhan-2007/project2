import React, { useState, useEffect } from 'react';
import {
  CalendarCheck2,
  FileCheck,
  CheckCircle2,
  Star,
  ArrowRight,
  ShieldCheck,
  Search,
  AlertTriangle,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatusChip from '../components/ui/StatusChip';
import ScoreRing from '../components/ui/ScoreRing';
import { MOCK_POPULAR_SERVICES } from '../mocks/mockData';
import { getHealth } from '../services/api';

export default function DashboardPage() {
  const { user, isCustomer, isProvider, isAdmin } = useAuth();
  const [backendHealth, setBackendHealth] = useState(null);

  useEffect(() => {
    const probe = async () => {
      try {
        const res = await getHealth();
        setBackendHealth(res);
      } catch (e) {
        console.warn('Backend probe warning:', e.message);
      }
    };
    probe();
  }, []);

  const statCards = [
    {
      label: 'Active Bookings',
      value: '3',
      subtext: 'Next: Today at 2:00 PM',
      icon: CalendarCheck2,
      color: 'blue',
    },
    {
      label: 'Open Claims',
      value: '1',
      subtext: '1 under rule-based review',
      icon: FileCheck,
      color: 'rose',
      badge: 'Action Required',
    },
    {
      label: 'Completed Jobs',
      value: '14',
      subtext: '100% evidence verified',
      icon: CheckCircle2,
      color: 'emerald',
    },
    {
      label: 'Overall Rating',
      value: '4.95',
      subtext: 'Based on 48 reviews',
      icon: Star,
      color: 'amber',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Deep Navy Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          title={`${isCustomer ? 'Customer' : isProvider ? 'Provider' : 'Admin'} Dashboard`}
          subtitle={`Welcome back, ${user?.fullName || 'User'} (${user?.role})`}
        />

        <main className="flex-1 p-6 lg:p-8 space-y-8 max-w-7xl w-full">
          
          {/* Greeting Banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Evidence-Gap Engine Active</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Hello, {user?.fullName || 'User'}!
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                You have 1 active service dispute awaiting evidence submission. Our rule-based engine has identified 2 specific missing requirements.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <a href="http://localhost:8080/swagger-ui.html" target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                  API Docs
                </Button>
              </a>
              <Button variant="secondary" size="sm" className="bg-white text-blue-700 hover:bg-blue-50 font-bold">
                View Open Case
              </Button>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx} padding="default" className="flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {stat.label}
                      </span>
                      <p className="text-2xl font-extrabold text-slate-900 mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{stat.subtext}</span>
                    {stat.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                        {stat.badge}
                      </span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Dispute Quick Attention Preview Card */}
          <Card className="border-amber-200 bg-amber-50/30 p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-5">
                <ScoreRing score={68} threshold={75} size={90} strokeWidth={8} label="Sufficiency" />
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <StatusChip status="Open Dispute" />
                    <span className="text-xs font-bold text-slate-500">Case #TL-8492</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Whole-Home Panel Upgrade &mdash; Missing Multimeter Test Evidence
                  </h3>
                  <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                    Rule-based analysis calculated Sufficiency at 68% (threshold: 75%).
                    Fairness check confirms provider has not yet been given a standard 48hr window to upload load test logs.
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Button variant="primary" size="md">
                  Resolve Evidence Gap
                </Button>
              </div>
            </div>
          </Card>

          {/* Popular Services Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Popular Services Ready for Booking</h3>
                <p className="text-xs text-slate-500">Top-rated local technicians with verifiable claim track records</p>
              </div>
              <Button variant="outline" size="sm">
                View Catalog
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_POPULAR_SERVICES.slice(0, 2).map((srv) => (
                <Card key={srv.id} hover className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                        {srv.category}
                      </span>
                      <div className="flex items-center space-x-1 text-xs font-bold text-slate-700">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{srv.rating}</span>
                        <span className="text-slate-400 font-normal">({srv.reviewCount})</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{srv.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">Provider: {srv.providerName}</p>

                    <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                      {srv.badges.map((b, i) => (
                        <span key={i} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-base font-extrabold text-slate-900">${srv.hourlyRate}</span>
                      <span className="text-xs text-slate-400"> / hour</span>
                    </div>
                    <Button variant="primary" size="sm">
                      Book Service
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
