import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ChevronDown, type LucideIcon } from 'lucide-react';

interface SidebarNavItemProps {
  label: string;
  icon: LucideIcon;
  isCollapsed: boolean;
  to?: string;
  dropdownItems?: { label: string; to: string }[] | null;
  onItemClick?: () => void;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  label,
  icon: Icon,
  isCollapsed,
  to,
  dropdownItems = null,
  onItemClick,
}) => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(() => {
    return dropdownItems
      ? dropdownItems.some((item) => location.pathname === item.to)
      : false;
  });
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  // Active state validation
  const isDirectActive = to ? location.pathname === to : false;
  const isDropdownActive = dropdownItems
    ? dropdownItems.some((item) => location.pathname === item.to)
    : false;
  const isActive = isDirectActive || isDropdownActive;

  // Sync dropdown open state with route activation
  useEffect(() => {
    if (dropdownItems && dropdownItems.some((item) => location.pathname === item.to)) {
      setIsDropdownOpen(true);
    }
  }, [location.pathname, dropdownItems]);

  // Handle click outside and Escape key dismissals for submenus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
        setIsFlyoutOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsFlyoutOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Sync collapsed state to close open accordions
  useEffect(() => {
    if (isCollapsed) {
      setIsDropdownOpen(false);
    }
  }, [isCollapsed]);

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (dropdownItems) {
      e.preventDefault();
      if (isCollapsed) {
        setIsFlyoutOpen(!isFlyoutOpen);
      } else {
        setIsDropdownOpen(!isDropdownOpen);
      }
    } else if (onItemClick) {
      onItemClick();
    }
  };

  const navItemClass = `
    w-full h-11 flex items-center gap-3 px-4 rounded-[6px] text-xs font-semibold
    transition-all duration-150 relative group outline-none select-none cursor-pointer
    ${
      isActive
        ? 'bg-zinc-800 text-white font-semibold shadow-sm'
        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
    }
    focus-visible:ring-1 focus-visible:ring-zinc-700
  `;

  // 1. Direct Navigation Link
  if (!dropdownItems && to) {
    return (
      <div className="w-full relative group">
        <NavLink
          ref={triggerRef as any}
          to={to}
          onClick={onItemClick}
          className={navItemClass}
        >
          <div className={`flex items-center justify-center w-5 h-5 shrink-0 ${isCollapsed ? 'mx-auto' : ''}`}>
            <Icon
              className={`w-[19px] h-[19px] shrink-0 ${
                isActive ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'
              }`}
            />
          </div>

          {!isCollapsed && <span className="truncate flex-1 text-left">{label}</span>}

          {isActive && !isCollapsed && (
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
          )}
        </NavLink>

        {/* Hover Tooltip when Collapsed */}
        {isCollapsed && (
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-zinc-950 text-white text-[11px] rounded-[4px] border border-zinc-800 shadow-md font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50">
            {label}
          </div>
        )}
      </div>
    );
  }

  // 2. Dropdown trigger (inline accordion on expanded, side flyout on collapsed)
  return (
    <div className="w-full relative" ref={dropdownRef}>
      <button
        ref={triggerRef as any}
        onClick={handleTriggerClick}
        className={`
          ${navItemClass}
          ${isCollapsed ? 'justify-center' : ''}
        `}
        aria-haspopup="true"
        aria-expanded={isCollapsed ? isFlyoutOpen : isDropdownOpen}
      >
        <div className="flex items-center justify-center w-5 h-5 shrink-0">
          <Icon
            className={`w-[19px] h-[19px] shrink-0 ${
              isActive ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'
            }`}
          />
        </div>

        {!isCollapsed && <span className="truncate flex-1 text-left">{label}</span>}

        {!isCollapsed && dropdownItems && (
          <ChevronDown
            className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 shrink-0 ${
              isDropdownOpen ? 'rotate-180 text-white' : ''
            }`}
          />
        )}

        {/* Hover Tooltip when Collapsed */}
        {isCollapsed && !isFlyoutOpen && (
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-zinc-950 text-white text-[11px] rounded-[4px] border border-zinc-800 shadow-md font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50">
            {label}
          </div>
        )}
      </button>

      {/* Accordion List (Expanded Mode) */}
      {!isCollapsed && isDropdownOpen && dropdownItems && (
        <ul className="mt-1 flex flex-col gap-0.5 pl-9 pr-2 select-none max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar-thin">
          {dropdownItems.map((item, idx) => {
            const isSubActive = location.pathname === item.to;
            return (
              <li key={idx}>
                <Link
                  to={item.to}
                  onClick={onItemClick}
                  className={`
                    block w-full text-left py-1.5 px-3 rounded text-[11px] font-semibold transition-colors cursor-pointer
                    ${
                      isSubActive
                        ? 'text-white bg-zinc-900/60 font-semibold'
                        : 'text-zinc-555 hover:text-white hover:bg-zinc-900/30'
                    }
                  `}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {/* Flyout Popover List (Collapsed Mode) */}
      {isCollapsed && isFlyoutOpen && dropdownItems && (
        <div className="absolute left-full ml-3 top-0 w-44 bg-zinc-950 border border-zinc-800 rounded-[6px] shadow-lg py-1.5 z-50 text-xs text-zinc-400 flex flex-col max-h-[calc(100vh-80px)]">
          <div className="px-3.5 py-1.5 border-b border-zinc-900 text-white font-semibold text-[11px] uppercase tracking-wider select-none mb-1 shrink-0">
            {label}
          </div>
          <ul className="flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden scrollbar-thin flex-1 pr-1">
            {dropdownItems.map((item, idx) => {
              const isSubActive = location.pathname === item.to;
              return (
                <li key={idx}>
                  <Link
                    to={item.to}
                    onClick={() => {
                      setIsFlyoutOpen(false);
                      if (onItemClick) onItemClick();
                    }}
                    className={`
                      block w-full text-left px-3.5 py-2 hover:bg-zinc-900/60 hover:text-white transition-colors cursor-pointer
                      ${isSubActive ? 'bg-zinc-900/40 text-indigo-400 font-semibold' : ''}
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
