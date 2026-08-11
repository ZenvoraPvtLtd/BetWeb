import React from 'react';
import { Coins } from 'lucide-react';

interface DemoBalanceProps {
  balance: number;
}

export const DemoBalance: React.FC<DemoBalanceProps> = ({ balance }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-950/40 border border-indigo-800/40 rounded-[6px] text-indigo-400 select-none">
      <Coins className="w-4 h-4 text-indigo-400 shrink-0" />
      <span className="text-xs font-bold font-mono tracking-wide">
        {balance.toLocaleString()} Demo Points
      </span>
    </div>
  );
};
