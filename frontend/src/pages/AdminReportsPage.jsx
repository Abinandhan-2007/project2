import React from 'react';
import {
  BarChart3,
  Download,
  CalendarCheck2,
  FileCheck,
  Clock,
  TrendingUp,
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import { MOCK_ADMIN_METRICS } from '../mocks/mockData';

export default function AdminReportsPage() {
  const handleDownload = () => {
    alert('Generating platform compliance and recovery audit report (CSV)...');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8 space-y-6 max-w-5xl w-full">
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Reports &amp; Analytics
              </h1>
              <p className="text-xs text-slate-500">
                Audit platform claims throughput, recovery resolution speed, and booking volume.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-2xl font-extrabold text-slate-900 block">{MOCK_ADMIN_METRICS.totalBookings}</span>
              <span className="text-xs font-semibold text-slate-500 mt-1 block">Total Bookings</span>
              <span className="text-[10px] text-blue-600 font-semibold mt-1 block">+12% vs last month</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-2xl font-extrabold text-slate-900 block">{MOCK_ADMIN_METRICS.resolvedCases}</span>
              <span className="text-xs font-semibold text-slate-500 mt-1 block">Resolved Cases</span>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">100% auditable evidence</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-2xl font-extrabold text-slate-900 block">{MOCK_ADMIN_METRICS.avgResolutionDays}</span>
              <span className="text-xs font-semibold text-slate-500 mt-1 block">Avg Resolution Time</span>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">72% faster than industry</span>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Booking Trend (Last 14 Days)</h3>
              <p className="text-[11px] text-slate-400">Daily service bookings and completed verifiable claims</p>
            </div>

            <div className="h-56 w-full flex items-end justify-between gap-2 pt-8 px-2 border-b border-slate-100 pb-2">
              {[35, 42, 50, 48, 65, 72, 85, 90, 80, 95, 110, 105, 120, 135].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    style={{ height: `${(val / 140) * 100}%` }}
                    className="w-full bg-blue-600/85 hover:bg-blue-600 rounded-t transition"
                    title={`Day ${idx + 1}: ${val} bookings`}
                  />
                  <span className="text-[9px] text-slate-400">D{idx + 1}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span>Period: Apr 10, 2025 – Apr 24, 2025</span>
              <span className="font-semibold text-slate-800">Total Volume: 1,122 Hours</span>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
