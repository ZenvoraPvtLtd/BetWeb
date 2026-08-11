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
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-bold text-zinc-700 select-none">
        {label}
      </label>
      <div className="relative w-full">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-zinc-400">
          <Icon className="w-[19px] h-[19px] stroke-[1.8]" />
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`
            w-full h-[52px] pl-12 pr-4 bg-white border border-[#CBD5E1] rounded-[10px] text-sm text-[#0F172A] placeholder-[#64748B]
            transition-all duration-200 outline-none
            focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/15
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
};
