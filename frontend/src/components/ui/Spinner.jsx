import React from 'react';

/**
 * Reusable Spinner loading component.
 */
export default function Spinner({ size = 'md', className = '', color = 'blue' }) {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  };

  const colorMap = {
    blue: 'border-blue-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    slate: 'border-slate-500 border-t-transparent',
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full ${sizeMap[size] || sizeMap.md} ${colorMap[color] || colorMap.blue} ${className}`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
