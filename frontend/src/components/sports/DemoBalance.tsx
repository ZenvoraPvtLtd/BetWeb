import React from 'react';
import { Coins } from 'lucide-react';

interface DemoBalanceProps {
  balance: number;
}

export const DemoBalance: React.FC<DemoBalanceProps> = ({ balance }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#18233C] border border-[#2B3C60] rounded-[8px] text-amber-400 select-none shadow-sm">
      <Coins className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
      <span className="text-xs font-bold font-mono tracking-wide">
        {balance.toLocaleString()} Demo Points
      </span>
    </div>
  );
};
