import React from 'react';

/**
 * Reusable Tabs component with pill or underline style.
 */
export default function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = 'pill',
  className = '',
}) {
  if (variant === 'underline') {
    return (
      <div className={`border-b border-slate-200 ${className}`}>
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'border-blue-600 text-blue-600 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                {tab.icon && <tab.icon className="w-4 h-4" />}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`ml-1.5 py-0.5 px-2 rounded-full text-xs font-semibold ${
                      isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

  return (
    <div className={`inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`py-1.5 px-3.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
              isActive
                ? 'bg-white text-slate-900 font-semibold shadow-soft'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`py-0.2 px-1.5 rounded-full text-[10px] font-semibold ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
