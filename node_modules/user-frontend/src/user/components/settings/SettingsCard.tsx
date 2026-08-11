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
      className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-5 flex flex-col justify-between hover:bg-[#16283D] transition-all hover:scale-[1.01] shadow-xs group select-none text-left"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-[8px] bg-zinc-900/30 border border-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
          <Icon className="w-4.5 h-4.5 text-[#0EA5E9]" />
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-[#0EA5E9] transition-colors">
          <span>Configure</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
      <div className="flex flex-col">
        <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">{title}</h4>
        <p className="text-[10px] text-zinc-450 mt-1 font-semibold leading-relaxed">
          {description}
        </p>
      </div>
    </a>
  );
};
export default SettingsCard;
