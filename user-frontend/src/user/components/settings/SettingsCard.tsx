import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SettingsCardProps {
  title: string;
  description: string;
  to: string;
  icon: LucideIcon;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  to,
  icon: Icon,
}) => {
  return (
    <a
      href={to}
      className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-5 flex flex-col justify-between hover:bg-[#18233C] hover:border-orange-500/40 transition-all hover:scale-[1.01] shadow-md group select-none text-left font-sans"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-[8px] bg-[#090E17] border border-[#233252] flex items-center justify-center text-slate-400 group-hover:text-orange-400 transition-colors">
          <Icon className="w-4.5 h-4.5 text-orange-400" />
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-orange-400 transition-colors font-mono">
          <span>Configure</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
      <div className="flex flex-col">
        <h4 className="text-xs font-extrabold text-slate-100 uppercase tracking-wider font-mono">{title}</h4>
        <p className="text-[10px] text-slate-400 mt-1 font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </a>
  );
};
export default SettingsCard;
