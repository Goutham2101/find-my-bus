import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white border border-slate-200 rounded-xl shadow-sm ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
        {icon || <AlertCircle className="w-8 h-8" />}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      {description && (
        <p className="text-base text-slate-600 max-w-md mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
