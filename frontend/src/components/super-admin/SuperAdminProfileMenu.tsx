import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
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
        className="flex items-center gap-1 h-[34px] px-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 text-zinc-300 hover:text-white rounded-[6px] text-xs font-semibold tracking-wide transition-all focus:outline-none focus:ring-1 focus:ring-zinc-700 select-none cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Profile menu for ${displayUsername} (${role || user?.role || 'Super Admin'})`}
      >
        <span>{displayUsername}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 mt-1.5 w-44 bg-blue-900 border border-blue-800 rounded-[6px] shadow-lg py-1.5 z-50 text-xs text-white focus:outline-none font-sans"
          role="menu"
        >
          <li role="none">
            <button
              role="menuitem"
              onClick={handleNavigateChangePassword}
              className="w-full text-left px-4 py-2 hover:bg-blue-800 text-white font-medium transition-colors cursor-pointer outline-none focus-visible:bg-blue-800"
            >
              Change Password
            </button>
          </li>
          <li role="none">
            <button
              role="menuitem"
              onClick={handleLogoutClick}
              className="w-full text-left px-4 py-2 hover:bg-blue-800 text-white font-medium transition-colors cursor-pointer outline-none focus-visible:bg-blue-800"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
