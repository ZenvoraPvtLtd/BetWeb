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
          flex items-center gap-2 px-3 py-2.5 rounded-[6px] text-xs font-medium
          transition-all duration-150 relative group outline-none cursor-pointer
          ${
            isActive
              ? 'bg-zinc-800 text-white font-semibold shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
          }
          focus-visible:ring-1 focus-visible:ring-zinc-700
        `}
      >
        {/* Left Arrow Icon - Component Architecture ready for nesting */}
        <span className="shrink-0 flex items-center justify-center w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors">
          {sport.hasChildren ? (
            <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-opacity" />
          )}
        </span>

        {/* Sport Icon */}
        <Icon
          className={`w-4 h-4 shrink-0 transition-colors ${
            isActive ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'
          }`}
        />

        {/* Sport Label */}
        {!isCollapsed && (
          <span className="truncate flex-1 text-left">{sport.name}</span>
        )}

        {/* Active side indicator */}
        {isActive && !isCollapsed && (
          <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-indigo-500" />
        )}

        {/* Collapsed Tooltip */}
        {isCollapsed && (
          <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-zinc-950 text-white text-[11px] rounded-[4px] border border-zinc-800 shadow-md font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50">
            {sport.name}
          </div>
        )}
      </NavLink>
    </div>
  );
};
