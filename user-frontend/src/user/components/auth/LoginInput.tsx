import React, { type InputHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';

interface LoginInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  icon: LucideIcon;
}

export const LoginInput: React.FC<LoginInputProps> = ({
  label,
  placeholder,
  icon: Icon,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-2 font-mono">
      <label htmlFor={id} className="text-xs font-bold text-slate-300 select-none text-left">
        {label}
      </label>
      <div className="relative w-full">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-slate-400">
          <Icon className="w-[19px] h-[19px] stroke-[1.8]" />
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`
            w-full h-[52px] pl-12 pr-4 bg-[#090E17] border border-[#233252] rounded-[10px] text-sm text-slate-100 placeholder-slate-500
            transition-all duration-200 outline-none
            focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
};
