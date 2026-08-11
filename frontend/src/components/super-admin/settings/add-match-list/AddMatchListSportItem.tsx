import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { AddMatchListSport } from '../../../../config/superAdmin/addMatchList';

interface AddMatchListSportItemProps {
  sport: AddMatchListSport;
}

export const AddMatchListSportItem: React.FC<AddMatchListSportItemProps> = ({ sport }) => {
  const location = useLocation();

  // Active state validation
  const isActive = location.pathname === sport.path;

  return (
    <Link
      to={sport.path}
      className={`
        w-full py-4 px-5 border-b border-zinc-150 flex items-center justify-between text-left select-none outline-none transition-colors
        ${
          isActive
            ? 'bg-zinc-50 font-semibold text-indigo-600'
            : 'bg-white hover:bg-zinc-50/50 text-zinc-800'
        }
        focus-visible:bg-zinc-50
      `}
      aria-label={`Open match configuration list for ${sport.name}`}
    >
      <span className="text-xs md:text-sm font-semibold tracking-wide truncate">{sport.name}</span>
      <ChevronRight
        className={`w-4 h-4 transition-transform duration-150 ${
          isActive ? 'text-indigo-500 translate-x-0.5' : 'text-zinc-400'
        }`}
      />
    </Link>
  );
};
