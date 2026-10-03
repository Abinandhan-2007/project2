import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Search,
  Zap,
  Droplet,
  Wrench,
  GraduationCap,
  UserCheck,
  CreditCard,
  FileCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronRight,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatusChip from '../components/ui/StatusChip';
import { MOCK_CATEGORIES, MOCK_TRUST_METRICS } from '../mocks/mockData';

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e?.preventDefault();
    navigate(`/services?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/services?category=${encodeURIComponent(categoryName.toLowerCase())}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      {/* 1. Header / Navbar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/25">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              TrustLoop
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-9 text-sm font-medium text-slate-600">
            <Link to="/" className="text-blue-600 font-semibold hover:text-blue-700 transition">
              Home
            </Link>
            <a href="#services" className="hover:text-blue-600 transition">
              Services
            </a>
            <a href="#how-it-works" className="hover:text-blue-600 transition">
              How It Works
            </a>
            <a href="#about" className="hover:text-blue-600 transition">
              About
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-5">
            <Link
              to="/login"
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition"
            >
              Login
            </Link>
            <Link to="/register">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm shadow-blue-500/30 transition duration-150">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-7">
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 tracking-tight leading-[1.18]">
                  Trusted Local Services.<br />
                  <span className="text-slate-900">Verified Professionals. Fair Resolutions.</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed pt-2">
                  Book skilled professionals, get work done, and stay protected with our evidence-backed service recovery system.
                </p>
              </div>

              {/* Search Pill Bar */}
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-white rounded-full p-2 pl-6 shadow-sm border border-slate-200/90 max-w-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition"
              >
                <input
                  type="text"
                  placeholder="Search for services (e.g., electrician, plumber, tutor...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none pr-3"
                />
                <button
                  type="submit"
                  className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/30 transition"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 stroke-[2.2]" />
                </button>
              </form>

              {/* 4 Circular Category Icons */}
              <div className="pt-4">
                <div className="grid grid-cols-4 gap-4 max-w-lg">
                  {/* Electricians */}
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('electricians')}
                    className="flex flex-col items-center group text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 group-hover:scale-105 group-hover:bg-amber-100/80 transition duration-150 shadow-xs">
                      <Zap className="w-6 h-6 fill-amber-500 stroke-amber-500" />
                    </div>
                    <span className="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition">
                      Electricians
                    </span>
                  </button>

                  {/* Plumbers */}
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('plumbers')}
                    className="flex flex-col items-center group text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 group-hover:scale-105 group-hover:bg-blue-100/80 transition duration-150 shadow-xs">
                      <Droplet className="w-6 h-6 fill-blue-500 stroke-blue-500" />
                    </div>
                    <span className="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition">
                      Plumbers
                    </span>
                  </button>

                  {/* Appliance Technicians */}
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('appliance')}
                    className="flex flex-col items-center group text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-500 group-hover:scale-105 group-hover:bg-purple-100/80 transition duration-150 shadow-xs">
                      <Wrench className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition leading-tight">
                      Appliance Technicians
                    </span>
                  </button>

                  {/* Tutors */}
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('tutors')}
                    className="flex flex-col items-center group text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 group-hover:scale-105 group-hover:bg-emerald-100/80 transition duration-150 shadow-xs">
                      <GraduationCap className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition">
                      Tutors
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-none">
                {/* Main Technician Image */}
                <div className="rounded-[2.5rem] overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xl shadow-slate-200/60 aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3.5] relative">
                  <img
                    src="/hero-technician.jpg"
                    alt="Skilled technician working on electrical panel with safety equipment"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  
                  {/* Real Work Badge Overlay */}
                  <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 bg-blue-600 text-white rounded-2xl px-5 py-3.5 shadow-xl shadow-blue-900/25 border border-blue-400/30 text-left">
                    <p className="text-sm font-bold leading-tight">Real Work</p>
                    <p className="text-sm font-bold leading-tight mt-0.5">Real Evidence</p>
                    <p className="text-sm font-bold leading-tight mt-0.5">Real Trust</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Trust Strip (3 Horizontal Cards) */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Verified Professionals */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <UserCheck className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Verified Professionals
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Background-checked &amp; rated
                </p>
              </div>
            </div>

            {/* Card 2: Secure Payments */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <CreditCard className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Secure Payments
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Safe &amp; flexible options
                </p>
              </div>
            </div>

            {/* Card 3: Evidence-Based Recovery */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <FileCheck className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Evidence-Based Recovery
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fair and transparent process
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Browse Services Grid */}
      <section id="services" className="py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Service Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Popular Services
              </h2>
            </div>
            <Link
              to="/services"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center space-x-1 mt-3 sm:mt-0"
            >
              <span>View all services</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/services?category=${cat.id}`)}
                className="bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-blue-500/40 hover:shadow-card transition duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100/70 text-blue-700">
                      {cat.count} pros
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      From {cat.startingPrice}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Explore specialists</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works (The Research-Oriented Differentiator) */}
      <section id="how-it-works" className="py-16 bg-[#f8fafc] border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              The TrustLoop Invariant
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Evidence-Gap Guided Recovery Engine
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Missing evidence is <b>never</b> treated as proof of fault. It is decision support, not a legal verdict.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-extrabold text-sm flex items-center justify-center">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Verifiable Claims</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accepted quotation line-items turn into auditable claims with predefined requirements (before/after photos, diagnostic readings, parts receipts).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-extrabold text-sm flex items-center justify-center">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">Evidence-Gap Scoring</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When a case is opened, the engine evaluates claim criticality (w_i), missing coverage (1 - c_i), and conflicting assertions (λ_i * x_i) to pinpoint exact gaps.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-extrabold text-sm flex items-center justify-center">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Fair-Opportunity Resolution</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The engine ensures the requested party had reasonable capacity and time before recommending actions (Request Evidence, Reassign, or Human Review).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer id="about" className="mt-auto bg-[#0d1527] text-slate-400 py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-white font-bold text-base">TrustLoop</span>
            <span className="text-xs text-slate-500">Local Services Marketplace &amp; Recovery Engine</span>
          </div>

          <p className="text-xs text-slate-500 text-center md:text-right">
            Placement-Ready Full-Stack System &bull; Java 21 Spring Boot + React Vite &bull; MIT
          </p>
        </div>
      </footer>
    </div>
  );
}
