import React from 'react';
import type { Market } from '../../../types/matches';

interface MarketCardProps {
  market: Market;
}

export const MarketCard: React.FC<MarketCardProps> = ({ market }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-2 select-none">
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
          {market.name}
        </h4>
        <div className="flex gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#94A3B8]">
          <span className="w-14 text-center">Back</span>
          <span className="w-14 text-center">Lay</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {market.selections.map((sel) => (
          <div
            key={sel.name}
            className="flex items-center justify-between h-[46px] px-3 bg-zinc-900/10 border border-zinc-900/50 rounded-[8px]"
          >
            <span className="text-xs font-extrabold text-white truncate">{sel.name}</span>
            <div className="flex gap-1.5 shrink-0 select-none">
              {/* Back Price */}
              <button
                disabled={sel.backPrice === '---'}
                className="w-14 h-9 bg-[#0EA5E9]/10 hover:bg-[#0EA5E9]/20 text-[#0EA5E9] border border-[#0EA5E9]/25 rounded-[6px] font-extrabold text-xs transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed outline-none"
              >
                {sel.backPrice}
              </button>
              {/* Lay Price */}
              <button
                disabled={sel.layPrice === '---'}
                className="w-14 h-9 bg-[#F43F5E]/10 hover:bg-[#F43F5E]/20 text-[#F43F5E] border border-[#F43F5E]/25 rounded-[6px] font-extrabold text-xs transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed outline-none"
              >
                {sel.layPrice}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MarketCard;
