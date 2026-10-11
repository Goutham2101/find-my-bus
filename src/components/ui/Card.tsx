import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-xl transition-shadow duration-200 bg-white';

  const variants = {
    default: 'border border-slate-200 shadow-sm hover:shadow-md',
    bordered: 'border-2 border-slate-300 shadow-none',
    flat: 'bg-slate-100 border border-slate-200 shadow-none',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
