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
      <label htmlFor={inputId} className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        className={`
          w-full h-[40px] px-3 bg-zinc-900 border border-zinc-800 rounded-[6px] text-sm text-white
          placeholder:text-zinc-650 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50
          transition-all duration-200
          ${className}
        `}
        {...props}
      />
    </div>
  );
};
