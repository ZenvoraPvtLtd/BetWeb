import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'amber' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  isLoading = false,
  variant = 'primary',
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white shadow-md shadow-orange-950/40 border-none',
    secondary: 'bg-[#18233C] hover:bg-[#223050] text-slate-200 hover:text-white border border-[#2B3C60]',
    amber: 'bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#D97706] text-slate-950 font-bold shadow-md shadow-amber-950/30',
    danger: 'bg-red-600/90 hover:bg-red-600 text-white border border-red-500/40 shadow-md shadow-red-950/40',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`
        h-[42px] w-full px-4 rounded-[8px] text-xs font-bold uppercase tracking-wider
        ${variantStyles[variant]} transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2 cursor-pointer active:scale-98
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};
