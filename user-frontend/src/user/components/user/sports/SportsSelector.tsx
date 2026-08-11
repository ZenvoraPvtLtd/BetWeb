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
    <div className="w-full overflow-x-auto scrollbar-none flex gap-2 select-none border-b border-zinc-900 pb-3.5 shrink-0">
      {userSports.map((sport) => {
        const Icon = sport.icon;
        const isActive = selectedSportId === sport.id;

        return (
          <button
            key={sport.id}
            onClick={() => onSelectSportId(sport.id)}
            className={`
              h-[38px] px-4 shrink-0 rounded-[8px] flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider transition-all outline-none cursor-pointer
              ${
                isActive
                  ? 'bg-[#0EA5E9] text-white shadow-md shadow-[#0EA5E9]/15'
                  : 'bg-[#111F30] border border-slate-700/15 text-[#94A3B8] hover:text-white hover:bg-[#16283D]'
              }
            `}
          >
            <Icon className="w-[15px] h-[15px] shrink-0" />
            <span>{sport.name}</span>
            {sport.liveCount && sport.liveCount > 0 ? (
              <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-1 border ${isActive ? 'bg-white/10 border-white/20 text-white' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
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
