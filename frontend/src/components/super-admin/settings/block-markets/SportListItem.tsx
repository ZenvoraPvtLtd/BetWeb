import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { SportMarketItem } from '../../../../config/superAdmin/blockMarkets';

interface SportListItemProps {
  sport: SportMarketItem;
}

export const SportListItem: React.FC<SportListItemProps> = ({ sport }) => {
  const location = useLocation();
  const isActive = location.pathname === sport.path;

  return (
    <Link
      to={sport.path}
      className={`
        w-full py-4 px-5 border-b border-[#1E293B] last:border-b-0 flex items-center justify-between text-left select-none outline-none transition-colors
        ${
          isActive
            ? 'bg-[#18233C] font-semibold text-orange-400'
            : 'bg-[#131B2E] hover:bg-[#18233C]/60 text-slate-200 hover:text-white'
        }
        focus-visible:bg-[#18233C]
      `}
      aria-label={`Open market configuration for ${sport.name}`}
    >
      <span className="text-xs md:text-sm font-semibold tracking-wide truncate">{sport.name}</span>
      <ChevronRight
        className={`w-4 h-4 transition-transform duration-150 ${
          isActive ? 'text-orange-400 translate-x-0.5' : 'text-slate-500'
        }`}
      />
    </Link>
  );
};
