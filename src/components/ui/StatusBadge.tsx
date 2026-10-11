import React from 'react';

export type StatusType =
  | 'on-time'
  | 'delayed'
  | 'completed'
  | 'cancelled'
  | 'upcoming'
  | 'active'
  | 'inactive'
  | 'info';

export interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  className = '',
}) => {
  const statusConfig: Record<
    StatusType,
    { bg: string; text: string; dot: string; defaultLabel: string }
  > = {
    'on-time': {
      bg: 'bg-emerald-100',
      text: 'text-emerald-800',
      dot: 'bg-emerald-600',
      defaultLabel: 'On Time',
    },
    active: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-800',
      dot: 'bg-emerald-600',
      defaultLabel: 'Active',
    },
    completed: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      dot: 'bg-blue-600',
      defaultLabel: 'Completed',
    },
    upcoming: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      dot: 'bg-blue-500',
      defaultLabel: 'Upcoming',
    },
    delayed: {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      dot: 'bg-amber-600',
      defaultLabel: 'Delayed',
    },
    cancelled: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      dot: 'bg-red-600',
      defaultLabel: 'Cancelled',
    },
    inactive: {
      bg: 'bg-slate-200',
      text: 'text-slate-700',
      dot: 'bg-slate-500',
      defaultLabel: 'Inactive',
    },
    info: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-800',
      dot: 'bg-indigo-600',
      defaultLabel: 'Information',
    },
  };

  const config = statusConfig[status] || statusConfig.info;
  const displayLabel = label || config.defaultLabel;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${config.bg} ${config.text} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot}`} aria-hidden="true" />
      <span>{displayLabel}</span>
    </span>
  );
};
