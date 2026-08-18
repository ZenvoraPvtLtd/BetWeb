import React from 'react';
import { MyBetTable } from './MyBetTable';
import type { MyBet } from '../../../../services/live-casino/teenpatti20x20Service';

interface MyBetPanelProps {
  bets: MyBet[];
}

export const MyBetPanel: React.FC<MyBetPanelProps> = ({ bets }) => {
  return (
    <div className="bg-[#131B2E] border border-[#1E293B] rounded-[10px] p-4 shadow-xl select-none text-left flex flex-col gap-3">
      {/* Panel Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-mono">
          My Bets
        </h3>
        
        {/* View All accessible action */}
        <button
          onClick={() => alert('View All bets details history panel is pending confirmation.')}
          className="text-[10px] font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors focus:outline-none cursor-pointer"
          aria-label="View all bets"
        >
          View All
        </button>
      </div>

      {/* Bets Table list */}
      <MyBetTable bets={bets} />
    </div>
  );
};
