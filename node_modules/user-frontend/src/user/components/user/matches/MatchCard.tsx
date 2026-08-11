import React, { useState } from 'react';
import type { Match } from '../../../types/matches';
import { MarketCard } from './MarketCard';
import { ChevronDown, Calendar, Swords, Zap } from 'lucide-react';

interface MatchCardProps {
  match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] overflow-hidden select-none hover:border-slate-700/30 transition-all shadow-xs">
      {/* 1. Header Details row */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none bg-zinc-900/10 hover:bg-zinc-900/30 transition-colors"
      >
        <div className="flex flex-col text-left">
          {/* Badges strip */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {match.isLive ? (
              <div className="flex items-center gap-1 bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-live-pulse" />
                <span>LIVE</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                <Calendar className="w-2.5 h-2.5 shrink-0" />
                <span>Upcoming</span>
              </div>
            )}
            <span className="text-[10px] text-[#0EA5E9] font-bold uppercase tracking-wider">
              {match.sport}
            </span>
            {match.competition && (
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                • {match.competition}
              </span>
            )}
          </div>

          <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
            <Swords className="w-4 h-4 text-[#0EA5E9] shrink-0" />
            <span>{match.teams}</span>
          </h3>

          <span className="text-[11px] text-[#94A3B8] font-medium mt-1">
            {match.isLive ? match.scoreDisplay : `${match.date} at ${match.time}`}
          </span>
        </div>

        {/* Collapsible status controls */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          {match.marketsCount && (
            <span className="text-[9px] font-extrabold tracking-wider uppercase bg-zinc-900 border border-zinc-800/80 text-zinc-400 px-2.5 py-1 rounded-full">
              +{match.marketsCount} Markets
            </span>
          )}
          <div className="w-7 h-7 rounded-full bg-zinc-900/30 border border-zinc-850 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>

      {/* 2. Expanded Market odds panels */}
      {isExpanded && (
        <div className="border-t border-zinc-900/80 p-4 bg-[#0D1B2A]/30 flex flex-col gap-4 animate-slideDown">
          {match.markets.map((m, idx) => (
            <MarketCard key={m.name || idx} market={m} />
          ))}
          <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-2 border-t border-zinc-900/40 select-none">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <span>Exchange Mock Betting is Active</span>
            </span>
            <span className="font-semibold text-zinc-500">Min: ₹100 | Max: ₹50,000</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default MatchCard;
