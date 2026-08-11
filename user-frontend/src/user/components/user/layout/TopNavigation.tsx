import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { topNavItems } from '../../../data/userTopNavigation';

export const TopNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-[#081421] border-b border-zinc-800/80 h-12 flex items-center select-none shrink-0 z-30">
      <div className="w-full h-full flex items-center px-4 md:px-6 overflow-x-auto scrollbar-none gap-2 sm:gap-4 scroll-smooth">
        {topNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.route;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className={`
                h-full flex items-center gap-2 px-3 border-b-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 outline-none shrink-0 cursor-pointer relative
                ${
                  item.isSpecial
                    ? isActive
                      ? 'border-rose-500 text-rose-500'
                      : 'border-transparent text-rose-450 hover:text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 rounded-t-md h-[90%] self-end'
                    : isActive
                    ? 'border-[#38BDF8] text-[#38BDF8] drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]'
                    : 'border-transparent text-[#CBD5E1] hover:text-[#38BDF8] hover:bg-zinc-900/20'
                }
              `}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{item.label}</span>
              {isActive && !item.isSpecial && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#38BDF8] shadow-[0_0_12px_#38BDF8]" />
              )}
              {isActive && item.isSpecial && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
export default TopNavigation;
