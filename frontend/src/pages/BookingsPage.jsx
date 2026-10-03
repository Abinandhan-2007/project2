import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarCheck2,
  Clock,
  MapPin,
  AlertCircle,
  FileCheck,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import { MOCK_BOOKINGS_DATA } from '../mocks/mockData';

export default function BookingsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredBookings = MOCK_BOOKINGS_DATA.filter((b) => {
    if (activeTab === 'Upcoming') return b.status === 'Confirmed' || b.status === 'Pending';
    if (activeTab === 'Completed') return b.status === 'Completed';
    if (activeTab === 'Cancelled') return b.status === 'Cancelled';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8 space-y-6 max-w-5xl w-full">
          
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              My Bookings
            </h1>
            <p className="text-xs text-slate-500">
              Manage your active service appointments and check claim status.
            </p>
          </div>

          {/* Tabs: Upcoming, Completed, Cancelled */}
          <div className="flex space-x-2 border-b border-slate-200">
            {['Upcoming', 'Completed', 'Cancelled'].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-4 text-xs font-semibold transition border-b-2 cursor-pointer ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80">
                <p className="text-sm font-semibold text-slate-700">No {activeTab.toLowerCase()} bookings found.</p>
                <button
                  type="button"
                  onClick={() => navigate('/services')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl"
                >
                  Browse Services
                </button>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-card transition duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={booking.providerAvatar}
                      alt={booking.providerName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-bold text-slate-900">
                          {booking.serviceTitle}
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            booking.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
                              : 'bg-amber-50 text-amber-600 border border-amber-200/60'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 font-medium">
                        {booking.providerName}
                      </p>

                      <p className="text-xs text-slate-400">
                        {booking.date} &bull; {booking.time}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center space-x-3 shrink-0">
                    {booking.hasClaim && (
                      <button
                        type="button"
                        onClick={() => navigate('/claims')}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold rounded-xl hover:bg-amber-100 transition"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Dispute #CL-001</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedBooking(booking)}
                      className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-2xs transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Booking Details Modal */}
          {selectedBooking && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{selectedBooking.serviceTitle}</h3>
                    <p className="text-xs text-slate-400">Booking ID: {selectedBooking.id}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedBooking.status === 'Confirmed'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {selectedBooking.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <p><strong>Provider:</strong> {selectedBooking.providerName}</p>
                  <p><strong>Scheduled Time:</strong> {selectedBooking.date} at {selectedBooking.time}</p>
                  <p><strong>Price:</strong> {selectedBooking.amount}</p>
                  <p><strong>Verifiable Claim Invariant:</strong> Accepted work converts to verifiable photo and diagnostic claims.</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedBooking(null);
                      navigate('/claims');
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    View Claims &amp; Recovery &rarr;
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedBooking(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
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
