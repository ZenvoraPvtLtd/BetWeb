import React from 'react';
import { useNavigate } from 'react-router-dom';
import { tickerMatches } from '../../../data/matchTicker';

export const MatchTicker: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#090D16] border-b border-[#1E293B] h-11 flex items-center select-none shrink-0 overflow-hidden z-20">
      <div className="w-full h-full flex items-center px-4 md:px-6 overflow-x-auto scrollbar-none gap-2.5 py-1.5 scroll-smooth">
        {tickerMatches.map((match) => (
          <button
            key={match.id}
            onClick={() => navigate(`/match/${match.id}`)}
            className="flex items-center gap-2.5 h-8 px-3 rounded-[8px] bg-[#131B2E] border border-[#1E293B] hover:border-orange-500/50 hover:bg-[#18233C] transition-all text-left shrink-0 cursor-pointer outline-none max-w-[210px] sm:max-w-[250px] truncate"
          >
            {match.isLive ? (
              <div className="flex items-center gap-1 shrink-0 font-mono">
                <span className="inline-flex rounded-full h-1.5 w-1.5 bg-red-500 shrink-0 animate-live-pulse" />
                <span className="text-[8px] text-red-400 font-bold uppercase tracking-wider">Live</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 shrink-0 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Upc</span>
              </div>
            )}

            <span className="text-[10.5px] font-semibold text-slate-200 hover:text-orange-400 truncate">
              {match.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default MatchTicker;
