import React from 'react';

/**
 * Reusable StatusChip Component.
 * Colors extracted from TrustLoop design system:
 * - Green: Confirmed / Verified / Passed
 * - Amber: Pending / Medium
 * - Red: Open Dispute / High priority
 * - Gray: Low / Draft / Closed
 * - Blue: In Progress / Active
 */
export default function StatusChip({
  status,
  label,
  size = 'md',
  showDot = true,
  className = '',
}) {
  // Normalize status key
  const normalized = (status || label || '').toLowerCase().replace(/[\s_-]+/g, '');

  let variant = 'gray';

  if (['confirmed', 'verified', 'passed', 'completed', 'active', 'up', 'success'].includes(normalized)) {
    variant = 'green';
  } else if (['pending', 'medium', 'review', 'warning', 'inreview'].includes(normalized)) {
    variant = 'amber';
  } else if (['opendispute', 'dispute', 'high', 'failed', 'down', 'rejected', 'error'].includes(normalized)) {
    variant = 'red';
  } else if (['inprogress', 'ongoing', 'assigned', 'info'].includes(normalized)) {
    variant = 'blue';
  }

  const styles = {
    green: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      dot: 'bg-emerald-500',
    },
    amber: {
      bg: 'bg-amber-50 border-amber-200 text-amber-700',
      dot: 'bg-amber-500',
    },
    red: {
      bg: 'bg-rose-50 border-rose-200 text-rose-700',
      dot: 'bg-rose-500',
    },
    blue: {
      bg: 'bg-blue-50 border-blue-200 text-blue-700',
      dot: 'bg-blue-500',
    },
    gray: {
      bg: 'bg-slate-100 border-slate-200 text-slate-600',
      dot: 'bg-slate-400',
    },
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 rounded-lg gap-1.5 font-semibold',
  };

  const current = styles[variant] || styles.gray;
  const displayLabel = label || status;

  return (
    <span
      className={`inline-flex items-center border ${current.bg} ${sizeStyles[size]} ${className}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />}
      <span className="capitalize">{displayLabel}</span>
    </span>
  );
}
