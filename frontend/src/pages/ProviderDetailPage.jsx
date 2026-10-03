import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Star,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Check,
  AlertCircle,
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import { MOCK_PROVIDERS } from '../mocks/mockData';

export default function ProviderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const provider = MOCK_PROVIDERS.find((p) => p.id === id) || MOCK_PROVIDERS[0];

  const dates = [
    { id: 'd1', label: 'Today', sub: 'Apr 26' },
    { id: 'd2', label: 'Tomorrow', sub: 'Apr 27' },
    { id: 'd3', label: 'Sun', sub: 'Apr 28' },
    { id: 'd4', label: 'Mon', sub: 'Apr 29' },
  ];

  const times = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];

  const [selectedDate, setSelectedDate] = useState('d1');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleBooking = () => {
    setBookingLoading(true);
    setTimeout(() => {
      setBookingLoading(false);
      setIsBooked(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8 space-y-6 max-w-4xl w-full mx-auto">
          
          {/* Back link */}
          <div>
            <Link
              to="/services"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to listings</span>
            </Link>
          </div>

          {/* Provider Overview Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-6">
            
            {/* Header: Photo, Name, Rating */}
            <div className="flex items-center space-x-4 border-b border-slate-100 pb-5">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-bold text-slate-900">{provider.name}</h1>
                  {provider.verified && (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-amber-500 font-bold">★ {provider.rating}</span>
                  <span className="text-slate-400">({provider.reviewsCount} reviews)</span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-slate-500">{provider.experience}</span>
                </div>
              </div>
            </div>

            {/* Service Details & Price */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Service Details
                  </span>
                  <h2 className="text-base font-bold text-slate-900 mt-0.5">
                    {provider.serviceTitle}
                  </h2>
                </div>
                <span className="text-base font-bold text-slate-900">
                  {provider.startingPrice}
                </span>
              </div>

              {/* Checklist */}
              <div className="space-y-2 pt-2">
                {provider.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Select Date & Time */}
            <div className="space-y-4 pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 block">
                Select Date &amp; Time
              </span>

              {/* Date Pills */}
              <div className="grid grid-cols-4 gap-3">
                {dates.map((d) => {
                  const isSelected = selectedDate === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDate(d.id)}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-2xs font-bold'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-medium'
                      }`}
                    >
                      <span className="block text-xs">{d.label}</span>
                      <span className="block text-[11px] text-slate-500 mt-0.5">{d.sub}</span>
                    </button>
                  );
                })}
              </div>

              {/* Time Slots */}
              <div className="grid grid-cols-4 gap-3 pt-1">
                {times.map((t) => {
                  const isSelected = selectedTime === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 px-3 rounded-xl border text-center text-xs transition cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-2xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-medium'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Book Now Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={bookingLoading}
                onClick={handleBooking}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-sm shadow-blue-500/30 transition disabled:opacity-60 cursor-pointer"
              >
                {bookingLoading ? 'Processing Booking...' : 'Book Now'}
              </button>
            </div>

          </div>

          {/* Success Booking Modal */}
          {isBooked && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Booking Confirmed!</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your appointment with <strong>{provider.name}</strong> for <strong>{selectedTime}</strong> has been scheduled.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-left text-xs space-y-1 text-slate-600 border border-slate-100">
                  <p><strong>Service:</strong> {provider.serviceTitle}</p>
                  <p><strong>Estimated:</strong> {provider.startingPrice}</p>
                  <p><strong>Status:</strong> <span className="text-emerald-600 font-semibold">Confirmed &amp; Claim Ready</span></p>
                </div>
                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/bookings')}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
                  >
                    View in My Bookings
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsBooked(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
