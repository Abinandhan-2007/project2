import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Search,
  MapPin,
  Zap,
  Wrench,
  Tv,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Scale,
  FileCheck2,
  Cpu,
  Layers,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatusChip from '../components/ui/StatusChip';
import { MOCK_CATEGORIES, MOCK_TRUST_METRICS } from '../mocks/mockData';

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('Seattle, WA');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e?.preventDefault();
    navigate(`/services?q=${encodeURIComponent(searchQuery)}&loc=${encodeURIComponent(locationQuery)}`);
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Zap':
        return Zap;
      case 'Wrench':
        return Wrench;
      case 'Tv':
        return Tv;
      case 'GraduationCap':
        return GraduationCap;
      default:
        return Wrench;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/30 group-hover:bg-blue-700 transition">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">TrustLoop</span>
              <span className="block text-[11px] font-semibold text-blue-600 -mt-1 tracking-wide uppercase">
                Verifiable Services
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-blue-600 transition">Browse Services</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition">Evidence-Gap Engine</a>
            <a href="#trust-metrics" className="hover:text-blue-600 transition">Trust & Metrics</a>
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">
                Join Network
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            {/* Research Differentiator Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-soft">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              <span>Evidence-Gap Guided Service Recovery Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
              Local Services Backed by <span className="text-blue-600">Verifiable Evidence</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Every job is converted into auditable claims. If an issue arises, our rule-based
              recovery engine quantifies missing evidence and ensures fair-opportunity checks before recommending next steps.
            </p>

            {/* Hero Search Box */}
            <form onSubmit={handleSearch} className="mt-8 p-2.5 bg-white rounded-2xl shadow-card border border-slate-200/80 flex flex-col md:flex-row items-center gap-2 max-w-2xl mx-auto">
              <div className="flex-1 flex items-center px-3 py-2 w-full">
                <Search className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
                <input
                  type="text"
                  placeholder="What service do you need? (e.g. Electrician, Plumbing)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200" />

              <div className="flex items-center px-3 py-2 w-full md:w-48">
                <MapPin className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Location"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <Button type="submit" variant="primary" size="md" className="w-full md:w-auto px-6 font-semibold">
                Find Services
              </Button>
            </form>

            {/* Quick Search Tags */}
            <div className="flex items-center justify-center flex-wrap gap-2 text-xs text-slate-500 pt-2">
              <span className="font-semibold text-slate-600">Popular:</span>
              <button
                type="button"
                onClick={() => setSearchQuery('Panel Upgrade')}
                className="bg-slate-200/70 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition"
              >
                Panel Upgrade
              </button>
              <button
                type="button"
                onClick={() => setSearchQuery('Pipe Leak')}
                className="bg-slate-200/70 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition"
              >
                Pipe Leak
              </button>
              <button
                type="button"
                onClick={() => setSearchQuery('HVAC Compressor')}
                className="bg-slate-200/70 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition"
              >
                HVAC Diagnostic
              </button>
              <button
                type="button"
                onClick={() => setSearchQuery('Algorithms Tutor')}
                className="bg-slate-200/70 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition"
              >
                CS Tutor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section id="trust-metrics" className="bg-white border-b border-slate-200/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {MOCK_TRUST_METRICS.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                  {metric.value}
                </p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tiles Section */}
      <section id="services" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              <span>Verified Marketplace Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Available Trade Specialists
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md mt-2 md:mt-0">
            Each category enforces standard claim templates and transparent evidence capture protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_CATEGORIES.map((cat) => {
            const IconComponent = getCategoryIcon(cat.icon);
            return (
              <Card
                key={cat.id}
                hover
                onClick={() => navigate(`/services?category=${cat.id}`)}
                className="flex flex-col justify-between group border-slate-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition duration-200">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {cat.count} pros
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Browse Category</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How It Works & Core Differentiator */}
      <section id="how-it-works" className="py-16 bg-white border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">The TrustLoop Invariant</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              How Verifiable Claims & Recovery Work
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Missing evidence is <b>never</b> treated as proof of fault. It is decision support, not a legal verdict.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 font-extrabold text-sm flex items-center justify-center">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Agreed Work to Claims</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accepted quotation line-items automatically turn into auditable claims with predefined evidence requirements (photos, receipts, multimeter readings).
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 font-extrabold text-sm flex items-center justify-center">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">Evidence-Gap Scoring</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When a case is opened, the engine evaluates claim criticality (w_i), missing coverage (1 - c_i), and conflicting assertions (λ_i * x_i) to pinpoint exact gaps.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 font-extrabold text-sm flex items-center justify-center">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Fair-Opportunity Resolution</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The engine checks if the requested party had reasonable capacity and time to provide evidence before recommending an action (Request Evidence, Reassign, or Human Review).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-navy-sidebar text-slate-400 py-10 border-t border-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-white font-bold text-base">TrustLoop</span>
            <span className="text-xs text-slate-500">Local Services Marketplace & Recovery</span>
          </div>

          <p className="text-xs text-slate-500 text-center md:text-right">
            Placement-Ready Architecture &bull; Rule-based Analysis &bull; Monorepo
          </p>
        </div>
      </footer>
    </div>
  );
}
