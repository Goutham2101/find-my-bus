import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'booking' | 'payment' | 'gps' | 'bus';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getColors = () => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'active':
      case 'paid':
      case 'on route':
      case 'eligible':
      case 'boarded':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'scheduled':
      case 'starting soon':
      case 'on duty':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending':
      case 'delayed':
      case 'lockednotstarted':
      case 'lockedfuturedate':
      case 'not boarded':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cancelled':
      case 'failed':
      case 'invalidbooking':
      case 'inactive':
      case 'disabled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'completed':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center font-medium rounded-full border shadow-2xs ${sizeClasses} ${getColors()}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75"></span>
      {status}
    </span>
  );
};
