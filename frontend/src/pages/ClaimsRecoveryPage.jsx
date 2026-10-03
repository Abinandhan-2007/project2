import React, { useState } from 'react';
import {
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  ShieldCheck,
  Scale,
  Sparkles,
  Info,
  Send,
  UploadCloud,
  Check,
  X,
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import ScoreRing from '../components/ui/ScoreRing';
import { MOCK_CASE_DETAIL } from '../mocks/mockData';

export default function ClaimsRecoveryPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [caseData, setCaseData] = useState(MOCK_CASE_DETAIL);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showReasoningModal, setShowReasoningModal] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  // New evidence upload state
  const [newTitle, setNewTitle] = useState('');
  const [newFile, setNewFile] = useState(null);

  const handleAddEvidence = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem = {
      id: `ev-${Date.now()}`,
      title: newTitle.trim(),
      date: 'Today',
      type: 'photo',
      url: '/hero-technician.jpg',
      party: 'Customer',
    };

    setCaseData((prev) => ({
      ...prev,
      evidence: [...prev.evidence, newItem],
      sufficiencyScore: Math.min(100, prev.sufficiencyScore + 18),
      sufficiencyLabel: prev.sufficiencyScore + 18 >= 80 ? 'Threshold satisfied' : 'Below threshold',
    }));

    setNewTitle('');
    setNewFile(null);
    setShowUploadModal(false);
  };

  const handleSendRequest = () => {
    setRequestSent(true);
    setTimeout(() => {
      alert('Evidence request successfully dispatched to provider with a 3-day turnaround window.');
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8 space-y-6 max-w-7xl w-full">
          
          {/* Top Invariant Notification Banner */}
          <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-4 flex items-start space-x-3 text-xs text-blue-900 shadow-2xs">
            <Scale className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">TrustLoop Decision-Support Invariant:</span>{' '}
              Missing evidence is <u>never</u> treated as proof of fault. The recovery engine applies fair-opportunity capacity checks before recommending any next step.
            </div>
          </div>

          {/* 3 Columns matching Bottom Row of Image 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* ============================================================== */}
            {/* COLUMN 1: CLAIM DETAIL (Screens 9)                             */}
            {/* ============================================================== */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-5">
              
              {/* Claim Header & Status Chip */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">
                  Claim #{caseData.claimId}
                </h2>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200/60">
                  {caseData.status}
                </span>
              </div>

              {/* Sub-tabs: Overview, Evidence, Case Log */}
              <div className="flex space-x-2 border-b border-slate-100 text-xs">
                {['Overview', 'Evidence (2)', 'Case Log'].map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 px-2 font-semibold transition border-b-2 cursor-pointer ${
                        isActive
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Claim Details Table */}
              <div className="space-y-2.5 text-xs">
                <span className="font-bold text-slate-900 block text-xs">Claim Details</span>
                <div className="grid grid-cols-3 gap-1 text-slate-500">
                  <span>Service</span>
                  <span className="col-span-2 font-semibold text-slate-800">{caseData.service}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-slate-500">
                  <span>Provider</span>
                  <span className="col-span-2 font-semibold text-slate-800">{caseData.provider}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-slate-500">
                  <span>Claim Amount</span>
                  <span className="col-span-2 font-semibold text-slate-800">{caseData.claimAmount}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-slate-500">
                  <span>Issue</span>
                  <span className="col-span-2 font-semibold text-slate-800">{caseData.issue}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-slate-500">
                  <span>Created On</span>
                  <span className="col-span-2 font-semibold text-slate-800">{caseData.createdOn}</span>
                </div>
              </div>

              {/* Evidence Section (Thumbnails + Add Evidence) */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-900 block text-xs">Evidence</span>
                
                <div className="grid grid-cols-3 gap-2">
                  {caseData.evidence.map((ev) => (
                    <div
                      key={ev.id}
                      className="border border-slate-200 rounded-xl p-1 bg-slate-50 text-center space-y-1 overflow-hidden"
                    >
                      <div className="h-14 bg-slate-200 rounded-lg overflow-hidden">
                        <img
                          src={ev.url}
                          alt={ev.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="block text-[10px] font-bold text-slate-800 truncate">
                        {ev.title}
                      </span>
                      <span className="block text-[9px] text-slate-400">
                        {ev.date}
                      </span>
                    </div>
                  ))}

                  {/* + Add Evidence Button */}
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(true)}
                    className="border-2 border-dashed border-blue-200 hover:border-blue-400 rounded-xl p-2 bg-blue-50/40 hover:bg-blue-50 flex flex-col items-center justify-center text-blue-600 transition cursor-pointer"
                  >
                    <Plus className="w-5 h-5 mb-0.5" />
                    <span className="text-[10px] font-bold">+ Add Evidence</span>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert('Dispute is currently being evaluated by the recovery engine.')}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
                >
                  Raise Dispute
                </button>
              </div>

            </div>

            {/* ============================================================== */}
            {/* COLUMN 2: EVIDENCE-GAP RECOVERY (Screen 10)                    */}
            {/* ============================================================== */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-5">
              
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Evidence-Gap Recovery
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  AI-assisted analysis of missing or conflicting evidence.
                </p>
              </div>

              {/* Case Sufficiency Score Ring */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center space-y-2">
                <span className="text-xs font-bold text-slate-700">Case Sufficiency Score</span>
                
                <div className="py-2">
                  <ScoreRing
                    score={caseData.sufficiencyScore}
                    size={110}
                    strokeWidth={10}
                    showStatus={false}
                  />
                </div>

                <div className="space-y-0.5">
                  <span className={`inline-flex items-center space-x-1 text-xs font-bold ${
                    caseData.sufficiencyScore >= 80 ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    <span>&bull;</span>
                    <span>{caseData.sufficiencyLabel}</span>
                  </span>
                  <p className="text-[10px] text-slate-400 max-w-[200px]">
                    {caseData.sufficiencyNote}
                  </p>
                </div>
              </div>

              {/* Gap Analysis List */}
              <div className="space-y-2">
                <span className="font-bold text-slate-900 block text-xs">Gap Analysis</span>
                
                <div className="space-y-1.5">
                  {caseData.gapAnalysis.map((gap) => (
                    <div
                      key={gap.type}
                      className="p-2.5 bg-white rounded-xl border border-slate-100 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-800">{gap.type}</span>
                        <span className="text-slate-400 font-medium">({gap.count} claims)</span>
                      </div>
                      
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        gap.priority === 'High priority'
                          ? 'bg-rose-50 text-rose-600 border border-rose-200/60'
                          : gap.priority === 'Medium priority'
                          ? 'bg-amber-50 text-amber-600 border border-amber-200/60'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {gap.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Recommended Actions Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowReasoningModal(true)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
                >
                  View Recommended Actions
                </button>
              </div>

            </div>

            {/* ============================================================== */}
            {/* COLUMN 3: RECOMMENDED ACTION (Screen 11)                       */}
            {/* ============================================================== */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-5">
              
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Recommended Action
                </h2>
              </div>

              {/* Action Box */}
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200/80 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      <FileCheck className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {caseData.recommendedAction.title}
                      </h4>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-300/40">
                    {caseData.recommendedAction.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {caseData.recommendedAction.description}
                </p>

                {/* Meta Rows */}
                <div className="pt-2 border-t border-blue-100/80 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Requested Evidence</span>
                    <span className="font-semibold text-slate-800">
                      {caseData.recommendedAction.requestedEvidence}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Which Party</span>
                    <span className="font-semibold text-slate-800">
                      {caseData.recommendedAction.whichParty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Fairness Check</span>
                    <span className="font-bold text-emerald-600 flex items-center space-x-1">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>{caseData.recommendedAction.fairnessCheck}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Gap Score (related claims)</span>
                    <span className="font-bold text-slate-800">
                      {caseData.recommendedAction.gapScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Steps Stepper */}
              <div className="space-y-2">
                <span className="font-bold text-slate-900 block text-xs">Next Steps</span>
                
                <div className="space-y-2 text-xs">
                  {caseData.recommendedAction.nextSteps.map((step) => (
                    <div key={step.step} className="flex items-start space-x-2.5">
                      <span className="w-4.5 h-4.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {step.step}
                      </span>
                      <span className="text-slate-600 leading-tight">
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSendRequest}
                  className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
                >
                  {requestSent ? 'Request Dispatched' : 'Send Request'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowReasoningModal(true)}
                  className="py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition"
                >
                  View Reasoning
                </button>
              </div>

            </div>

          </div>

          {/* ============================================================== */}
          {/* UPLOAD EVIDENCE MODAL                                          */}
          {/* ============================================================== */}
          {showUploadModal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">Upload Evidence</h3>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleAddEvidence} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Evidence Title / Description
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Compressor Capacitor multimeter reading"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Attach Image or Proof
                    </label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center space-y-1">
                      <UploadCloud className="w-6 h-6 text-slate-400 mx-auto" />
                      <p className="text-xs font-medium text-slate-600">Drag and drop or browse file</p>
                      <p className="text-[10px] text-slate-400">JPG, PNG, PDF up to 5MB</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl"
                    >
                      Attach to Claim
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className="px-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW REASONING MODAL (Mathematical & Interview Defensible)     */}
          {/* ============================================================== */}
          {showReasoningModal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-6 max-w-xl w-full border border-slate-200 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Recovery Engine Reasoning &amp; Mathematical Formulation
                    </h3>
                    <p className="text-[11px] text-slate-400">Formal Decision-Support Specification</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowReasoningModal(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-xs text-slate-600 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                  <div className="p-3 bg-slate-50 rounded-xl font-mono text-[11px] text-slate-800 border border-slate-200">
                    Gap(C) = &sum; [ w_i &times; (1 - c_i) + &lambda;_i &times; x_i ] / &sum; w_i
                  </div>
                  <p>
                    <strong>1. Criticality Weight (w_i):</strong> Line-item compressor replacement carries critical trade weight (w=0.85) vs standard diagnostic (w=0.35).
                  </p>
                  <p>
                    <strong>2. Missing Coverage (1 - c_i):</strong> No timestamped photograph of the replaced component was supplied prior to case opening.
                  </p>
                  <p>
                    <strong>3. Conflicting Assertions (&lambda;_i &times; x_i):</strong> The customer asserts cooling failure while the checklist marks drainage as completed.
                  </p>
                  <p>
                    <strong>4. Fair-Opportunity Invariant:</strong> The provider had active physical access to the premises during service hours. Requesting photographic proof is scored high-utility (0.72) and zero-cost before assigning any fault.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowReasoningModal(false)}
                    className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
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
