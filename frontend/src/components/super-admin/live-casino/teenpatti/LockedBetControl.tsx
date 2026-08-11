import React from 'react';
import { Lock } from 'lucide-react';

interface LockedBetControlProps {
  title: string;
  subtitle?: string;
}

export const LockedBetControl: React.FC<LockedBetControlProps> = ({ title, subtitle }) => {
  return (
    <div className="flex-1 min-h-[70px] bg-zinc-950 border border-zinc-900 rounded-[6px] flex flex-col items-center justify-center relative p-3 text-center cursor-not-allowed select-none group opacity-75 hover:opacity-80 transition-opacity">
      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
        {title}
      </span>
      {subtitle && (
        <span className="text-[9px] text-zinc-650 font-semibold mt-0.5 font-sans">
          {subtitle}
        </span>
      )}

      {/* Central Lock Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px] rounded-[6px] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-md">
          <Lock className="w-3 h-3 text-zinc-400" />
        </div>
      </div>
    </div>
  );
};
