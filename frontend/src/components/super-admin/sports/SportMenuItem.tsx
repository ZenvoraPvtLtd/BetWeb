import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { SportDefinition } from '../../../config/sports';

interface SportMenuItemProps {
  sport: SportDefinition;
  isCollapsed: boolean;
  onItemClick?: () => void;
}

export const SportMenuItem: React.FC<SportMenuItemProps> = ({
  sport,
  isCollapsed,
  onItemClick,
}) => {
  const location = useLocation();
  const isActive = location.pathname === `/sports/${sport.slug}`;
  const Icon = sport.icon;

  return (
    <div className="w-full flex flex-col select-none">
      <NavLink
        to={`/sports/${sport.slug}`}
        onClick={onItemClick}
        className={`
          flex items-center gap-2 px-3 py-2.5 rounded-[8px] text-xs font-medium
          transition-all duration-150 relative group outline-none cursor-pointer
          ${
            isActive
              ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-[#131B2E] border border-transparent'
          }
          focus-visible:ring-1 focus-visible:ring-orange-500
        `}
      >
        <span className="shrink-0 flex items-center justify-center w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors">
          {sport.hasChildren ? (
            <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
          )}
        </span>

        <Icon
          className={`w-4 h-4 shrink-0 transition-colors ${
            isActive ? 'text-orange-400' : 'text-slate-400 group-hover:text-orange-300'
          }`}
        />

        {!isCollapsed && (
          <span className="truncate flex-1 text-left">{sport.name}</span>
        )}

        {isActive && !isCollapsed && (
          <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500" />
        )}

        {isCollapsed && (
          <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-[#131B2E] text-white text-[11px] rounded-[6px] border border-[#233252] shadow-xl font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50">
            {sport.name}
          </div>
        )}
      </NavLink>
    </div>
  );
};
