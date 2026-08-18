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
    <div className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] overflow-hidden select-none hover:border-orange-500/30 transition-all shadow-md">
      {/* 1. Header Details row */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none bg-[#0E1524]/60 hover:bg-[#18233C]/60 transition-colors"
      >
        <div className="flex flex-col text-left">
          {/* Badges strip */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap font-mono">
            {match.isLive ? (
              <div className="flex items-center gap-1 bg-red-500/15 border border-red-500/30 text-red-400 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-live-pulse" />
                <span>LIVE</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-[#18233C] border border-[#2B3C60] text-slate-400 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                <Calendar className="w-2.5 h-2.5 shrink-0" />
                <span>Upcoming</span>
              </div>
            )}
            <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
              {match.sport}
            </span>
            {match.competition && (
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                • {match.competition}
              </span>
            )}
          </div>

          <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-1.5">
            <Swords className="w-4 h-4 text-orange-400 shrink-0" />
            <span>{match.teams}</span>
          </h3>

          <span className="text-[11px] text-slate-400 font-medium mt-1 font-mono">
            {match.isLive ? match.scoreDisplay : `${match.date} at ${match.time}`}
          </span>
        </div>

        {/* Collapsible status controls */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          {match.marketsCount && (
            <span className="text-[9px] font-extrabold tracking-wider uppercase bg-[#18233C] border border-[#2B3C60] text-orange-400 px-2.5 py-1 rounded-full font-mono">
              +{match.marketsCount} Markets
            </span>
          )}
          <div className="w-7 h-7 rounded-full bg-[#18233C] border border-[#2B3C60] flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>

      {/* 2. Expanded Market odds panels */}
      {isExpanded && (
        <div className="border-t border-[#1E293B] p-4 bg-[#090E17]/40 flex flex-col gap-4 animate-slideDown">
          {match.markets.map((m, idx) => (
            <MarketCard key={m.name || idx} market={m} />
          ))}
          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-[#1E293B] select-none font-mono">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              <span>Exchange Mock Betting is Active</span>
            </span>
            <span className="font-semibold text-slate-400">Min: ₹100 | Max: ₹50,000</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default MatchCard;
