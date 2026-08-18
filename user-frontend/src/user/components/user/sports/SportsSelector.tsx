import React from 'react';
import { userSports } from '../../../data/sports';

interface SportsSelectorProps {
  selectedSportId: string;
  onSelectSportId: (sportId: string) => void;
}

export const SportsSelector: React.FC<SportsSelectorProps> = ({
  selectedSportId,
  onSelectSportId,
}) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-none flex gap-2 select-none border-b border-[#1E293B] pb-3.5 shrink-0">
      {userSports.map((sport) => {
        const Icon = sport.icon;
        const isActive = selectedSportId === sport.id;

        return (
          <button
            key={sport.id}
            onClick={() => onSelectSportId(sport.id)}
            className={`
              h-[38px] px-4 shrink-0 rounded-[8px] flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider transition-all outline-none cursor-pointer font-mono
              ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white shadow-md shadow-orange-950/40'
                  : 'bg-[#131B2E] border border-[#1E293B] text-slate-300 hover:text-white hover:bg-[#18233C]'
              }
            `}
          >
            <Icon className={`w-[15px] h-[15px] shrink-0 ${isActive ? 'text-white' : 'text-orange-400'}`} />
            <span>{sport.name}</span>
            {sport.liveCount && sport.liveCount > 0 ? (
              <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-1 border ${isActive ? 'bg-white/20 border-white/30 text-white' : 'bg-red-500/15 border-red-500/30 text-red-400'}`}>
                <span className="w-1 h-1 rounded-full bg-current animate-live-pulse" />
                <span>{sport.liveCount} Live</span>
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
};
export default SportsSelector;
