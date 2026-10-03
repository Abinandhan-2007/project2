import React, { useState } from 'react';
import {
  CalendarCheck2,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  UploadCloud,
  X,
  Check,
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';

export default function ProviderRequestsPage() {
  const [activeTab, setActiveTab] = useState('Pending');
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [requests, setRequests] = useState([
    {
      id: 'RBK-1004',
      service: 'AC Repair & Cooling Diagnostic',
      customer: 'Priya Sharma',
      date: 'Apr 26, 2025 - 10:00 AM',
      status: 'Pending',
    },
    {
      id: 'RBK-1002',
      service: 'Washing Machine Drum & Motor Repair',
      customer: 'Abinandhan',
      date: 'Apr 27, 2025 - 02:00 PM',
      status: 'Pending',
    },
    {
      id: 'RBK-1003',
      service: 'Electrical DB Panel Installation',
      customer: 'Arjun Verma',
      date: 'Apr 28, 2025 - 11:00 AM',
      status: 'Pending',
    },
  ]);

  const [quoteAmount, setQuoteAmount] = useState('2000');
  const [quoteHours, setQuoteHours] = useState('2 hours');
  const [quoteNotes, setQuoteNotes] = useState('Parts will be charged extra if replacement required. 30 days service warranty included.');

  const handleAccept = (req) => {
    setSelectedRequest(req);
    setShowQuotationModal(true);
  };

  const handleReject = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSubmitQuotation = (e) => {
    e.preventDefault();
    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequest?.id ? { ...r, status: 'Accepted' } : r
      )
    );
    setShowQuotationModal(false);
    alert(`Quotation submitted successfully for ${selectedRequest?.id}. The customer has been notified!`);
  };

  const filteredRequests = requests.filter((r) => {
    if (activeTab === 'Pending') return r.status === 'Pending';
    if (activeTab === 'Accepted') return r.status === 'Accepted';
    return r.status === 'Completed';
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8 space-y-6 max-w-5xl w-full">
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Booking Requests
            </h1>
            <p className="text-xs text-slate-500">
              Respond to customer service requests and submit verifiable quotations.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 border-b border-slate-200">
            {['Pending (3)', 'Accepted', 'Completed'].map((tab) => {
              const tabKey = tab.split(' ')[0];
              const isActive = activeTab === tabKey;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tabKey)}
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

          {/* Requests List */}
          <div className="space-y-3">
            {filteredRequests.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200/80">
                <p className="text-sm font-semibold text-slate-700">No {activeTab.toLowerCase()} requests right now.</p>
              </div>
            ) : (
              filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-slate-900">{req.service}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                        {req.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Customer: <strong>{req.customer}</strong> &bull; {req.date}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {req.status === 'Pending' ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleAccept(req)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(req.id)}
                          className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-xl border border-rose-200 transition"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl">
                        Quotation Dispatched
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Create Quotation Modal */}
          {showQuotationModal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Create Quotation</h3>
                    <p className="text-xs text-slate-400">Booking {selectedRequest?.id} &bull; {selectedRequest?.service}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowQuotationModal(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSubmitQuotation} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Total Amount (₹)
                      </label>
                      <input
                        type="number"
                        required
                        value={quoteAmount}
                        onChange={(e) => setQuoteAmount(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Estimated Duration
                      </label>
                      <input
                        type="text"
                        required
                        value={quoteHours}
                        onChange={(e) => setQuoteHours(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Scope of Work &amp; Line-Items
                    </label>
                    <textarea
                      rows={3}
                      value={quoteNotes}
                      onChange={(e) => setQuoteNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Add Diagnostic Photos (Optional)
                    </label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-3 text-center text-xs text-slate-500">
                      <UploadCloud className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                      <span>Drag and drop or click to upload</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2 border-t border-slate-100">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
                    >
                      Submit Quotation
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQuotationModal(false)}
                      className="px-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
