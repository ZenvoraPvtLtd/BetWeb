import React from 'react';
import { sportsConfig } from '../../../config/sports';
import { SportMenuItem } from '../sports/SportMenuItem';

interface SportsMenuProps {
  isCollapsed: boolean;
  onItemClick?: () => void;
}

export const SportsMenu: React.FC<SportsMenuProps> = ({ isCollapsed, onItemClick }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {!isCollapsed && (
        <h3 className="px-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2 select-none text-left">
          Sports Exchange
        </h3>
      )}
      <div className="flex flex-col gap-0.5 overflow-y-auto pr-1 select-none scrollbar-thin">
        {sportsConfig.map((sport) => (
          <SportMenuItem
            key={sport.id}
            sport={sport}
            isCollapsed={isCollapsed}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
};
