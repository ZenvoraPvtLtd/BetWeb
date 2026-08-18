import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { topNavItems } from '../../../data/userTopNavigation';

export const TopNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-[#0E1524] border-b border-[#1E293B] h-12 flex items-center select-none shrink-0 z-30 shadow-xs">
      <div className="w-full h-full flex items-center px-4 md:px-6 overflow-x-auto scrollbar-none gap-2 sm:gap-3 scroll-smooth">
        {topNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.route;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className={`
                h-full flex items-center gap-2 px-3.5 border-b-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 outline-none shrink-0 cursor-pointer relative
                ${
                  item.isSpecial
                    ? isActive
                      ? 'border-orange-500 text-orange-400 bg-orange-500/10'
                      : 'border-transparent text-orange-400 hover:text-orange-300 bg-orange-500/5 hover:bg-orange-500/10 rounded-t-md h-[90%] self-end'
                    : isActive
                    ? 'border-orange-500 text-orange-400 font-extrabold'
                    : 'border-transparent text-slate-300 hover:text-orange-400 hover:bg-[#18233C]/60'
                }
              `}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 shadow-[0_0_10px_rgba(255,87,34,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
export default TopNavigation;
