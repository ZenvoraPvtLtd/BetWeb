import React from 'react';
import { DemoBalance } from './DemoBalance';
import { Sparkles } from 'lucide-react';

interface SportsHeaderProps {
  title: string;
  balance: number;
}

export const SportsHeader: React.FC<SportsHeaderProps> = ({ title, balance }) => {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-4 mb-6 select-none text-left">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-950 leading-none">
            {title}
          </h1>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-indigo-50 border border-indigo-100 text-indigo-650">
            <Sparkles className="w-2.5 h-2.5" />
            Live / Demo
          </span>
        </div>
        <p className="text-xs text-zinc-500 mt-1">
          Interact with simulated {title} match configurations using virtual points.
        </p>
      </div>

      <div className="shrink-0 flex items-center">
        <DemoBalance balance={balance} />
      </div>
    </div>
  );
};
