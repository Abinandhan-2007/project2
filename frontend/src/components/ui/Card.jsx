import React from 'react';

/**
 * Reusable Card Component.
 * White background, rounded-xl, soft shadow matching visual design system.
 */
export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'default',
  border = true,
  onClick,
  ...props
}) {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  const hoverStyle = hover
    ? 'transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer'
    : '';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl ${border ? 'border border-slate-200/80' : ''} shadow-card ${paddingStyles[padding]} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
