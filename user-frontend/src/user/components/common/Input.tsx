import React, { type InputHTMLAttributes, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="w-full flex flex-col items-start gap-1.5">
      <label htmlFor={inputId} className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        className={`
          w-full h-[40px] px-3.5 bg-[#090E17] border border-[#233252] rounded-[8px] text-sm text-slate-100
          placeholder:text-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50
          transition-all duration-200
          ${className}
        `}
        {...props}
      />
    </div>
  );
};
