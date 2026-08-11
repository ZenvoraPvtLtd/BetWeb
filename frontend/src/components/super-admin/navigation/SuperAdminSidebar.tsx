import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Trophy,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { Logo } from '../../common/Logo';
import { SidebarNavItem } from './SidebarNavItem';
import { SportsMenu } from './SportsMenu';
import { SportsFlyout } from './SportsFlyout';
import { navigationConfig } from '../../../config/navigationConfig';
import { useAuth } from '../../../context/AuthContext';

interface SuperAdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  className?: string;
  onItemClick?: () => void;
}

export const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  className = '',
  onItemClick,
}) => {
  const [isSportsFlyoutOpen, setIsSportsFlyoutOpen] = useState(false);
  const location = useLocation();

  const { hasPermission } = useAuth();

  // Check if any sport is active to highlight the Sports group
  const isSportActive =
    location.pathname.startsWith('/admin/sports/') ||
    location.pathname.startsWith('/sports/');

  return (
    <aside
      className={`
        bg-[#0A0A0C] border-r border-zinc-900 text-white flex flex-col h-full shrink-0
        transition-all duration-200 ease-in-out select-none relative
        ${isCollapsed ? 'w-[var(--sidebar-collapsed-width)]' : 'w-[var(--sidebar-expanded-width)]'}
        ${className}
      `}
    >
      {/* Sidebar Header Logo Panel */}
      <div className="flex items-center justify-between px-4 h-[56px] border-b border-zinc-900 shrink-0">
        <div className="flex items-center shrink-0">
          <Logo isCompact={isCollapsed} theme="light" width={110} />
        </div>

        {!isCollapsed && !onItemClick && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors focus:outline-none cursor-pointer hidden md:block"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {onItemClick && (
          <button
            onClick={onItemClick}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors focus:outline-none cursor-pointer md:hidden"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-1 hover:bg-zinc-850 rounded text-zinc-400 hover:text-white transition-colors focus:outline-none cursor-pointer hidden md:block absolute right-[-14px] top-[15px] bg-[#0A0A0C] border border-zinc-800 rounded-full z-40 w-7 h-7 flex items-center justify-center shadow-md"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Option Items List */}
      <div className="flex-1 overflow-y-auto py-4 px-2.5 flex flex-col gap-1.5 scrollbar-thin">
        {navigationConfig.map((item, index) => {
          if (item.permission && !hasPermission(item.permission)) {
            return null;
          }

          const resolvedDropdownItems = item.dropdownItems
            ? item.dropdownItems.map((subItem) => ({
                label: subItem.label,
                to: subItem.to,
              }))
            : null;

          return (
            <SidebarNavItem
              key={index}
              label={item.label}
              icon={item.icon}
              isCollapsed={isCollapsed}
              to={item.to}
              dropdownItems={resolvedDropdownItems}
              onItemClick={onItemClick}
            />
          );
        })}

        {hasPermission('sports.view') && (
          <>
            {/* Separator Divider line */}
            <div className="h-[1px] bg-zinc-900/60 my-3.5 mx-2 shrink-0" />

            {/* Sports Submenu */}
            {isCollapsed ? (
              /* Collapsed Sports icon rail */
              <div className="w-full relative">
                <button
                  onClick={() => setIsSportsFlyoutOpen(!isSportsFlyoutOpen)}
                  className={`
                    w-full h-11 flex items-center justify-center rounded-[6px] text-xs font-semibold
                    transition-all duration-150 relative group outline-none cursor-pointer
                    ${
                      isSportActive
                        ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                    }
                    focus-visible:ring-1 focus-visible:ring-zinc-700
                  `}
                  aria-label="Sports Menu"
                  aria-haspopup="true"
                  aria-expanded={isSportsFlyoutOpen}
                >
                  <Trophy
                    className={`w-[19px] h-[19px] shrink-0 transition-colors ${
                      isSportActive ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'
                    }`}
                  />
                  {isSportActive && (
                    <span className="absolute right-2.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  )}
                </button>

                {/* Hover Tooltip when Collapsed */}
                {!isSportsFlyoutOpen && (
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-zinc-950 text-white text-[11px] rounded-[4px] border border-zinc-800 shadow-md font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50">
                    Sports Menu
                  </div>
                )}

                {/* Sports Flyout Popover */}
                <SportsFlyout
                  isOpen={isSportsFlyoutOpen}
                  onClose={() => setIsSportsFlyoutOpen(false)}
                  onItemClick={onItemClick}
                />
              </div>
            ) : (
              /* Expanded Sports List */
              <div className="w-full">
                <SportsMenu isCollapsed={false} onItemClick={onItemClick} />
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
};
