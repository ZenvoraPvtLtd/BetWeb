import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'amber';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  icon,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}) => {
  let variantStyles = 'bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white shadow-md shadow-orange-950/40 border border-orange-500/30';

  if (variant === 'secondary') {
    variantStyles = 'bg-[#182238] hover:bg-[#202D4A] text-slate-200 border border-[#2B3C60]';
  } else if (variant === 'danger') {
    variantStyles = 'bg-red-600/90 hover:bg-red-600 text-white border border-red-500/40 shadow-sm';
  } else if (variant === 'amber') {
    variantStyles = 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold border border-amber-400/40';
  } else if (variant === 'ghost') {
    variantStyles = 'bg-transparent hover:bg-slate-800/60 text-slate-300 border border-transparent';
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={`
        w-full h-[40px]
        flex items-center justify-center gap-2
        font-medium text-sm
        rounded-[8px]
        transition-all duration-200
        active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:ring-offset-1 focus:ring-offset-[#0B0F19]
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        ${variantStyles}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
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
          />
          <path
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
            className="opacity-75"
          />
        </svg>
      ) : (
        <>
          {icon && <span className="flex items-center justify-center shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};
