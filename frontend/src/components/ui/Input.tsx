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
        <label
          htmlFor={inputId}
          className={
            hideLabel
              ? 'sr-only'
              : 'block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider'
          }
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full h-[40px] px-3.5
            bg-[#0A0E17] text-slate-100 text-sm
            placeholder:text-slate-500
            border border-[#233252] rounded-[8px]
            shadow-inner
            transition-all duration-200
            hover:border-[#334670] hover:bg-[#0D1322]
            focus:outline-none focus:border-orange-500 focus:bg-[#0E1526] focus:ring-2 focus:ring-orange-500/20
            disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
