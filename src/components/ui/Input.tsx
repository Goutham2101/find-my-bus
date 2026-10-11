import React, { useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
  rightAction?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      icon,
      rightAction,
      className = '',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-slate-800"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 text-slate-500 pointer-events-none shrink-0">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={`w-full min-h-[44px] rounded-lg border bg-white px-3.5 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed ${
              icon ? 'pl-11' : ''
            } ${
              rightAction ? 'pr-11' : ''
            } ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100'
            } ${className}`}
            {...props}
          />
          {rightAction && (
            <div className="absolute right-3.5 flex items-center shrink-0">
              {rightAction}
            </div>
          )}
        </div>
        {error && (
          <p id={errorId} className="text-sm font-medium text-red-600">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="text-sm text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
