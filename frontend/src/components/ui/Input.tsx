import React, { type InputHTMLAttributes, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hideLabel?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, hideLabel = false, className = '', id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full flex flex-col items-start">
        {/* Premium visible typography label for SaaS forms */}
        <label
          htmlFor={inputId}
          className={
            hideLabel
              ? 'sr-only'
              : 'block text-[11px] font-semibold text-zinc-500 mb-1.5 uppercase tracking-wider'
          }
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full h-[40px] px-3.5
            bg-zinc-50/30 text-login-text text-sm
            placeholder:text-login-placeholder
            border border-login-border rounded-[6px]
            shadow-[0_1px_2px_rgba(0,0,0,0.01)]
            transition-all duration-200
            hover:border-zinc-300 hover:bg-zinc-50/70
            focus:outline-none focus:border-login-primary focus:bg-white focus:ring-2 focus:ring-zinc-900/5
            disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
