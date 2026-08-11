import React from 'react';
import { useNavigate } from 'react-router-dom';
import { tickerMatches } from '../../../data/matchTicker';

export const MatchTicker: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#0D1B2A] border-b border-zinc-800/40 h-11 flex items-center select-none shrink-0 overflow-hidden z-20">
      <div className="w-full h-full flex items-center px-4 md:px-6 overflow-x-auto scrollbar-none gap-3 py-1.5 scroll-smooth">
        {tickerMatches.map((match) => (
          <button
            key={match.id}
            onClick={() => navigate(`/match/${match.id}`)}
            className="flex items-center gap-2.5 h-8 px-3 rounded-[8px] bg-[#07111F] border border-zinc-805/80 hover:border-zinc-700/60 hover:bg-[#0B1726]/40 transition-all text-left shrink-0 cursor-pointer outline-none max-w-[200px] sm:max-w-[240px] truncate"
          >
            {match.isLive ? (
              <div className="flex items-center gap-1 shrink-0">
                <span className="inline-flex rounded-full h-1.5 w-1.5 bg-rose-500 shrink-0 animate-live-pulse"></span>
                <span className="text-[7px] text-rose-450 font-bold uppercase tracking-wider">Live</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-wider">Upc</span>
              </div>
            )}

            <span className="text-[10px] font-bold text-zinc-300 hover:text-white truncate">
              {match.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default MatchTicker;
