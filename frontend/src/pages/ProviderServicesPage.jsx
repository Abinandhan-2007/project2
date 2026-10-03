import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  CheckCircle2,
  Trash2,
  X,
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';

export default function ProviderServicesPage() {
  const [services, setServices] = useState([
    { id: 'srv-1', name: 'AC Repair & Cooling Diagnostic', price: '₹599', active: true },
    { id: 'srv-2', name: 'Electrical Fitting & Wiring', price: '₹499', active: true },
    { id: 'srv-3', name: 'Plumbing Service & Pipe Leak Repair', price: '₹399', active: true },
    { id: 'srv-4', name: 'Washing Machine Repair & Motor Fix', price: '₹599', active: true },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');

  const handleToggle = (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const handleAddService = (e) => {
    e.preventDefault();
    if (!newServiceName.trim() || !newServicePrice.trim()) return;

    setServices((prev) => [
      ...prev,
      {
        id: `srv-${Date.now()}`,
        name: newServiceName.trim(),
        price: `₹${newServicePrice.trim()}`,
        active: true,
      },
    ]);

    setNewServiceName('');
    setNewServicePrice('');
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8 space-y-6 max-w-5xl w-full">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                My Services
              </h1>
              <p className="text-xs text-slate-500">
                Configure your service offerings, rates, and verifiable evidence requirements.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Service</span>
            </button>
          </div>

          <div className="space-y-3">
            {services.map((s) => (
              <div
                key={s.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{s.name}</h3>
                    <p className="text-xs text-slate-500">From {s.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => handleToggle(s.id)}
                    className={`text-xs font-bold px-3 py-1 rounded-full border transition ${
                      s.active
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    {s.active ? 'Active' : 'Disabled'}
                  </button>

                  <button
                    type="button"
                    onClick={() => alert(`Edit service: ${s.name}`)}
                    className="p-2 text-slate-400 hover:text-blue-600 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {showAddModal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">Add New Service</h3>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleAddService} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Service Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Inverter AC PCB Diagnostic"
                      value={newServiceName}
                      onChange={(e) => setNewServiceName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Starting Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 699"
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div className="flex space-x-2 pt-2 border-t border-slate-100">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
                    >
                      Save Service
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
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
