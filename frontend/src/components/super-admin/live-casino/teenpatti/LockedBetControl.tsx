import React from 'react';
import { Lock } from 'lucide-react';

interface LockedBetControlProps {
  title: string;
  subtitle?: string;
}

export const LockedBetControl: React.FC<LockedBetControlProps> = ({ title, subtitle }) => {
  return (
    <div className="flex-1 min-h-[70px] bg-[#0E1524] border border-[#233252] rounded-[8px] flex flex-col items-center justify-center relative p-3 text-center cursor-not-allowed select-none group opacity-80 hover:opacity-90 transition-opacity">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 font-mono">
        {title}
      </span>
      {subtitle && (
        <span className="text-[9px] text-amber-400 font-semibold mt-0.5 font-sans">
          {subtitle}
        </span>
      )}

      {/* Central Lock Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px] rounded-[8px] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-[#18233C] border border-[#2B3C60] flex items-center justify-center shadow-md">
          <Lock className="w-3 h-3 text-slate-400" />
        </div>
      </div>
    </div>
  );
};
