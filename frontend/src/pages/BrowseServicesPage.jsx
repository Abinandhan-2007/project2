import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  MapPin,
  Filter,
  CheckCircle2,
  Star,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import { MOCK_PROVIDERS, MOCK_CATEGORIES } from '../mocks/mockData';

export default function BrowseServicesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const queryParam = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [activeFilterChip, setActiveFilterChip] = useState('All');

  const filteredProviders = useMemo(() => {
    return MOCK_PROVIDERS.filter((p) => {
      // Text match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.trade.toLowerCase().includes(q) ||
          p.serviceTitle.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Category match
      if (selectedCategory !== 'all') {
        const catLow = selectedCategory.toLowerCase();
        if (catLow.includes('elect') && !p.trade.toLowerCase().includes('elect')) return false;
        if (catLow.includes('plumb') && !p.trade.toLowerCase().includes('plumb')) return false;
        if (catLow.includes('appliance') && !p.trade.toLowerCase().includes('appliance')) return false;
        if (catLow.includes('tutor') && !p.trade.toLowerCase().includes('tutor')) return false;
      }

      // Filter chips
      if (activeFilterChip === 'Top Rated' && p.rating < 4.8) return false;
      if (activeFilterChip === 'Verified' && !p.verified) return false;
      if (activeFilterChip === 'Available Today' && !p.availableToday) return false;

      return true;
    });
  }, [searchQuery, selectedCategory, activeFilterChip]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8 space-y-6 max-w-7xl w-full">
          
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Local Professionals
            </h1>
            <p className="text-xs text-slate-500">
              Choose from verified and highly rated service providers.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3.5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              
              {/* Search input */}
              <div className="md:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search service or provider..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              {/* Category Dropdown */}
              <div className="md:col-span-3 relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="electrical">Electricians</option>
                  <option value="plumbing">Plumbers</option>
                  <option value="appliances">Appliance Technicians</option>
                  <option value="tutoring">Tutors</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Location Dropdown */}
              <div className="md:col-span-3 relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                >
                  <option value="All Locations">Your Location</option>
                  <option value="Bangalore">Indiranagar, Bangalore</option>
                  <option value="Koramangala">Koramangala, Bangalore</option>
                  <option value="HSR Layout">HSR Layout, Bangalore</option>
                  <option value="Whitefield">Whitefield, Bangalore</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center space-x-2 pt-1 border-t border-slate-100 text-xs">
              {['All', 'Top Rated', 'Verified', 'Available Today'].map((chip) => {
                const isActive = activeFilterChip === chip;
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setActiveFilterChip(chip)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Providers List */}
          <div className="space-y-4">
            {filteredProviders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80">
                <p className="text-sm font-semibold text-slate-700">No service providers match your search.</p>
                <p className="text-xs text-slate-400 mt-1">Try resetting your filters or search keywords.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setActiveFilterChip('All');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-card transition duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Left: Avatar & Info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={provider.avatar}
                      alt={provider.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-bold text-slate-900">{provider.name}</h3>
                        {provider.verified && (
                          <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                            <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 font-medium">
                        {provider.trade} &bull; {provider.experience}
                      </p>

                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-amber-500 font-bold">★ {provider.rating}</span>
                        <span className="text-slate-400">({provider.reviewsCount} reviews)</span>
                        <span className="text-slate-300">&bull;</span>
                        <span className="text-slate-500 text-[11px]">{provider.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Price & View Profile Button */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <span className="text-sm font-bold text-slate-900 block mb-1">
                      {provider.startingPrice}
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate(`/provider/${provider.id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-2xs transition"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
