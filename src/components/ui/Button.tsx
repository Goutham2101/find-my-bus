import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none min-h-[44px] cursor-pointer';

  const variants = {
    primary:
      'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-600 active:bg-blue-900 border border-transparent shadow-sm',
    secondary:
      'bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-700 active:bg-slate-950 border border-transparent shadow-sm',
    outline:
      'bg-white text-slate-800 hover:bg-slate-100 focus:ring-blue-600 border border-slate-300 shadow-sm text-slate-900 font-semibold',
    ghost:
      'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:ring-blue-500 border border-transparent',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 active:bg-red-800 border border-transparent shadow-sm',
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5 min-h-[36px]',
    md: 'text-base px-4 py-2.5 min-h-[44px]',
    lg: 'text-lg px-6 py-3.5 min-h-[50px] font-semibold',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-2">
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </span>
      )}
    </button>
  );
};
