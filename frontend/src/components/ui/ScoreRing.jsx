import React from 'react';

/**
 * Circular progress ring for Case Sufficiency Score.
 * Changes stroke color dynamically based on threshold.
 */
export default function ScoreRing({
  score = 0,
  max = 100,
  threshold = 75,
  size = 110,
  strokeWidth = 10,
  label = 'Sufficiency',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max((score / max) * 100, 0), 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const isBelowThreshold = score < threshold;
  const strokeColor = isBelowThreshold ? '#ef4444' : '#10b981'; // Red if below threshold, Green if passed

  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-extrabold text-slate-800 leading-none">
            {score}%
          </span>
          <span className="text-[10px] font-semibold text-slate-400 uppercase mt-0.5">
            {label}
          </span>
        </div>
      </div>

      {isBelowThreshold && (
        <span className="mt-2 text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
          Below {threshold}% Threshold
        </span>
      )}
    </div>
  );
}
