import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';
import { BookOpen, Coins, User, ChevronDown, LogOut } from 'lucide-react';

export const HomeHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-[56px] w-full bg-[#0E1524] border-b border-[#1E293B] flex items-center justify-between px-4 md:px-6 select-none shrink-0 z-40 shadow-md">
      {/* Brand Logo */}
      <div className="flex items-center gap-4">
        <Logo width={115} theme="light" />
      </div>

      {/* Action Center Actions */}
      <div className="flex items-center gap-3 md:gap-4 text-white">
        {/* Rules button */}
        <a
          href="/rules"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-[#2B3C60] bg-[#18233C] hover:bg-[#223050] transition-colors text-xs font-semibold tracking-wide text-slate-300 hover:text-white cursor-pointer outline-none"
        >
          <BookOpen className="w-3.5 h-3.5 text-orange-400" />
          <span className="hidden sm:inline">Rules</span>
        </a>

        {/* Balance Coins Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#18233C] border border-[#2B3C60] text-xs font-bold text-amber-400 font-mono">
          <Coins className="w-3.5 h-3.5" />
          <span>pts 1,000</span>
        </div>

        {/* User Dropdown Trigger */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white cursor-pointer outline-none"
          >
            <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <User className="w-3.5 h-3.5" />
            </div>
            <span>{user?.username || 'User'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2.5 w-44 bg-[#131B2E] border border-[#233252] rounded-[8px] shadow-xl py-1 z-50 animate-fadeIn">
              <button
                onClick={logout}
                className="w-full px-4 py-2 text-left text-xs font-semibold text-red-400 hover:bg-[#18233C] hover:text-red-300 transition-colors flex items-center gap-2 cursor-pointer outline-none"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
