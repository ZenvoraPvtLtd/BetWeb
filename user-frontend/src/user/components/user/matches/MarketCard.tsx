import React from 'react';
import type { Market } from '../../../types/matches';

interface MarketCardProps {
  market: Market;
}

export const MarketCard: React.FC<MarketCardProps> = ({ market }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b border-[#1E293B] pb-2 select-none">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
          {market.name}
        </h4>
        <div className="flex gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">
          <span className="w-14 text-center">Back</span>
          <span className="w-14 text-center">Lay</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {market.selections.map((sel) => (
          <div
            key={sel.name}
            className="flex items-center justify-between h-[46px] px-3 bg-[#090E17] border border-[#1E293B] rounded-[8px]"
          >
            <span className="text-xs font-extrabold text-slate-100 truncate">{sel.name}</span>
            <div className="flex gap-1.5 shrink-0 select-none font-mono">
              {/* Back Price */}
              <button
                disabled={sel.backPrice === '---'}
                className="w-14 h-9 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-[6px] font-extrabold text-xs transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed outline-none"
              >
                {sel.backPrice}
              </button>
              {/* Lay Price */}
              <button
                disabled={sel.layPrice === '---'}
                className="w-14 h-9 bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 rounded-[6px] font-extrabold text-xs transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed outline-none"
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
