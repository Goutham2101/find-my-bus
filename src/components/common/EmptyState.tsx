import React from 'react';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center my-6 max-w-lg mx-auto shadow-xs">
      <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
        {icon || <SearchX className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium text-sm rounded-xl transition-colors shadow-xs"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
