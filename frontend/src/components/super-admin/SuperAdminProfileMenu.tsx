import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Lock, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SuperAdminProfileMenuProps {
  username?: string;
  role?: string;
  onLogout?: () => void;
}

export const SuperAdminProfileMenu: React.FC<SuperAdminProfileMenuProps> = ({
  username,
  role,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigateChangePassword = () => {
    setIsOpen(false);
    navigate('/admin/change-password');
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      logout();
    }
    navigate('/admin');
  };

  let displayUsername = username || user?.username || 'superadmin';
  if (user) {
    if (user.role === 'SUPER_ADMIN') displayUsername = 'superadmin';
    else if (user.role === 'ADMIN') displayUsername = 'ADMIN';
    else if (user.role === 'SUPERMASTER') displayUsername = 'SUPERMASTER';
    else if (user.role === 'MASTER') displayUsername = 'MASTER';
    else if (user.role === 'AGENT') displayUsername = 'AGENT';
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 h-[36px] px-3 bg-[#131B2E] border border-[#233252] hover:border-orange-500/50 hover:bg-[#18233C] text-slate-200 hover:text-white rounded-[8px] text-xs font-semibold tracking-wide transition-all focus:outline-none focus:ring-1 focus:ring-orange-500/50 select-none cursor-pointer shadow-sm"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Profile menu for ${displayUsername} (${role || user?.role || 'Super Admin'})`}
      >
        <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
        <span>{displayUsername}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-orange-400' : ''}`}
        />
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 mt-2 w-48 bg-[#131B2E] border border-[#233252] rounded-[10px] shadow-xl py-1.5 z-50 text-xs text-slate-200 focus:outline-none font-sans backdrop-blur-md animate-fadeIn"
          role="menu"
        >
          <li role="none">
            <button
              role="menuitem"
              onClick={handleNavigateChangePassword}
              className="w-full text-left px-4 py-2.5 hover:bg-[#1C2844] hover:text-orange-400 font-medium transition-colors cursor-pointer outline-none flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Change Password</span>
            </button>
          </li>
          <li role="none">
            <button
              role="menuitem"
              onClick={handleLogoutClick}
              className="w-full text-left px-4 py-2.5 hover:bg-red-950/40 text-red-400 hover:text-red-300 font-medium transition-colors cursor-pointer outline-none flex items-center gap-2 border-t border-[#1E293B]"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
