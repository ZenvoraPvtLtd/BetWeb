import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useSettings } from '../../../context/SettingsContext';
import {
  BookOpen,
  Coins,
  ShieldAlert,
  User,
  ChevronDown,
  Menu,
  Home,
  FileText,
  PlusCircle,
  MinusCircle,
  TrendingUp,
  History,
  Clock,
  Dices,
  Sliders,
  ShieldCheck,
  Key,
  LogOut,
  Bell
} from 'lucide-react';
import { accountConfig } from '../dashboard/AccountSummary';
import { GlobalSearch } from './GlobalSearch';
import { NotificationDropdown } from './NotificationDropdown';

interface UserHeaderProps {
  onToggleSidebar: () => void;
}

export const UserHeader: React.FC<UserHeaderProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const {
    unreadMessagesCount,
    balanceVisible,
    setBalanceVisible,
    exposureVisible,
    setExposureVisible
  } = useSettings();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsNotificationOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const menuItems = [
    { label: 'Home', to: '/home', icon: Home },
    { label: 'Account Statement', to: '/reports/account-statement', icon: FileText },
    { label: 'Deposit Statement', to: '/reports/deposit-statement', icon: PlusCircle },
    { label: 'Withdraw Statement', to: '/reports/withdraw-statement', icon: MinusCircle },
    { label: 'Profit Loss Report', to: '/reports/profit-loss', icon: TrendingUp },
    { label: 'Bet History', to: '/reports/bet-history', icon: History },
    { label: 'Unsettled Bet', to: '/reports/unsettled-bet', icon: Clock },
    { label: 'Casino Report History', to: '/reports/casino-report-history', icon: Dices },
    { label: 'Set Button Values', to: '/account/button-values', icon: Sliders },
    { label: 'Security Auth Verification', to: '/account/security-auth', icon: ShieldCheck },
    { label: 'Change Password', to: '/account/change-password', icon: Key },
    { label: 'Rules', to: '/rules', icon: BookOpen }
  ];

  return (
    <header className="sticky top-0 h-16 w-full bg-[#0E1524] border-b border-[#1E293B] flex items-center justify-between px-4 md:px-6 select-none shrink-0 z-40 shadow-md">
      {/* Left: Mobile menu toggle + Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xs md:max-w-md">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-[#18233C] rounded-lg text-slate-400 hover:text-white transition-colors md:hidden outline-none cursor-pointer"
          aria-label="Toggle Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <GlobalSearch />
      </div>

      {/* Right: Rules, Balance, Exposure, Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3 text-white">
        {/* Rules button */}
        <a
          href="/rules"
          className="flex items-center gap-1.5 px-3 h-9 rounded-[8px] bg-[#18233C] border border-[#2B3C60] hover:bg-[#223050] transition-colors text-xs font-semibold text-slate-300 hover:text-white cursor-pointer outline-none"
        >
          <BookOpen className="w-3.5 h-3.5 text-orange-400" />
          <span className="hidden sm:inline">Rules</span>
        </a>

        {/* Balance badge */}
        <a
          href="/reports/account-statement"
          className="flex items-center gap-2 px-3 h-9 rounded-[8px] bg-[#18233C] border border-[#2B3C60] text-xs font-bold text-emerald-400 hover:bg-[#223050] transition-colors font-mono"
        >
          <Coins className="w-3.5 h-3.5 text-amber-400" />
          <span>{balanceVisible ? `₹${accountConfig.balance.toLocaleString('en-IN')}` : '₹••••••'}</span>
        </a>

        {/* Exposure badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 h-9 rounded-[8px] bg-[#18233C] border border-[#2B3C60] text-xs font-bold text-orange-400 font-mono">
          <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
          <span>{exposureVisible ? `Exp: ₹${accountConfig.exposure}` : 'Exp: ₹••••'}</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="w-9 h-9 rounded-[8px] bg-[#18233C] border border-[#2B3C60] hover:bg-[#223050] text-slate-300 hover:text-white flex items-center justify-center relative cursor-pointer outline-none"
            aria-label="Toggle Notifications Menu"
          >
            <Bell className="w-4 h-4" />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF5722] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shrink-0 animate-pulse">
                {unreadMessagesCount}
              </span>
            )}
          </button>
          <NotificationDropdown
            isOpen={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
          />
        </div>

        {/* User profile dropdown container */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 h-9 px-2.5 rounded-[8px] hover:bg-[#18233C] text-slate-200 hover:text-white transition-colors cursor-pointer outline-none"
          >
            <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold uppercase hidden md:inline">{user?.username || 'User'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Desktop Dropdown Panel */}
          {isDropdownOpen && (
            <div className="hidden md:block absolute right-0 mt-2 w-64 bg-[#131B2E] border border-[#233252] rounded-[12px] shadow-2xl py-2.5 z-50 animate-fadeIn text-left select-none max-h-[500px] overflow-y-auto scrollbar-thin">
              {/* Header stats */}
              <div className="px-4 py-2 border-b border-[#1E293B] mb-1 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Account: {user?.username}</span>
                <div className="flex justify-between items-center text-[11px] font-bold mt-1 font-mono">
                  <span className="text-slate-400">Balance:</span>
                  <span className="text-emerald-400">{balanceVisible ? `₹${accountConfig.balance.toLocaleString('en-IN')}` : '₹••••'}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold font-mono">
                  <span className="text-slate-400">Exposure:</span>
                  <span className="text-orange-400">{exposureVisible ? `₹${accountConfig.exposure}` : '₹••••'}</span>
                </div>
              </div>

              {/* Navigation Items list */}
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.to}
                    onClick={() => setIsDropdownOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-[#18233C] hover:text-orange-400 transition-colors flex items-center gap-2.5 outline-none"
                  >
                    <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{item.label}</span>
                  </a>
                );
              })}

              <div className="h-[1px] bg-[#1E293B] my-1" />

              {/* Balance Visibility Toggle */}
              <button
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-300 hover:bg-[#18233C] hover:text-white transition-colors flex items-center justify-between outline-none cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Coins className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Show Balance</span>
                </div>
                <div className="w-4 h-4 rounded border border-[#233252] flex items-center justify-center bg-[#090E17] shrink-0">
                  {balanceVisible && <div className="w-2.5 h-2.5 bg-orange-500 rounded-[2px]" />}
                </div>
              </button>

              {/* Exposure Visibility Toggle */}
              <button
                onClick={() => setExposureVisible(!exposureVisible)}
                className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-300 hover:bg-[#18233C] hover:text-white transition-colors flex items-center justify-between outline-none cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Show Exposure</span>
                </div>
                <div className="w-4 h-4 rounded border border-[#233252] flex items-center justify-center bg-[#090E17] shrink-0">
                  {exposureVisible && <div className="w-2.5 h-2.5 bg-orange-500 rounded-[2px]" />}
                </div>
              </button>

              <div className="h-[1px] bg-[#1E293B] my-1" />

              {/* Signout Button */}
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  logout();
                }}
                className="w-full px-4 py-2 text-left text-xs font-bold text-red-400 hover:bg-[#18233C] hover:text-red-300 transition-colors flex items-center gap-2.5 outline-none cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0 text-red-400" />
                <span>SIGNOUT</span>
              </button>
            </div>
          )}

          {/* Mobile Bottom Drawer Panel */}
          {isDropdownOpen && (
            <div className="md:hidden fixed inset-0 z-[1000] flex items-end select-none">
              {/* Backdrop close lock */}
              <div
                onClick={() => setIsDropdownOpen(false)}
                className="absolute inset-0 bg-black/70 backdrop-blur-xs animate-fadeIn"
              />
              {/* Drawer Sheet */}
              <div className="relative w-full bg-[#131B2E] border-t border-[#233252] rounded-t-[20px] p-5 max-h-[85vh] overflow-y-auto scrollbar-none z-50 text-left animate-slideUp">
                <div className="flex justify-between items-center pb-3 border-b border-[#1E293B] mb-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-slate-100 font-mono">Account: {user?.username}</span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-1 font-mono">
                      {balanceVisible ? `Balance: ₹${accountConfig.balance.toLocaleString('en-IN')}` : 'Balance: Hidden'}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="text-xs font-bold text-orange-400 hover:text-white uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.to}
                        onClick={() => setIsDropdownOpen(false)}
                        className="py-2.5 px-3 text-xs font-bold text-slate-300 hover:bg-[#18233C] active:bg-[#18233C] rounded-lg flex items-center gap-3 outline-none"
                      >
                        <Icon className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                        <span>{item.label}</span>
                      </a>
                    );
                  })}

                  <div className="h-[1px] bg-[#1E293B] my-2" />

                  {/* Mobile Balance Switch */}
                  <button
                    onClick={() => setBalanceVisible(!balanceVisible)}
                    className="w-full py-2.5 px-3 text-left text-xs font-bold text-slate-300 hover:bg-[#18233C] rounded-lg flex items-center justify-between outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <Coins className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                      <span>Show Balance</span>
                    </div>
                    <div className="w-4.5 h-4.5 rounded border border-[#233252] flex items-center justify-center bg-[#090E17] shrink-0">
                      {balanceVisible && <div className="w-2.5 h-2.5 bg-orange-500 rounded-[2px]" />}
                    </div>
                  </button>

                  {/* Mobile Exposure Switch */}
                  <button
                    onClick={() => setExposureVisible(!exposureVisible)}
                    className="w-full py-2.5 px-3 text-left text-xs font-bold text-slate-300 hover:bg-[#18233C] rounded-lg flex items-center justify-between outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                      <span>Show Exposure</span>
                    </div>
                    <div className="w-4.5 h-4.5 rounded border border-[#233252] flex items-center justify-center bg-[#090E17] shrink-0">
                      {exposureVisible && <div className="w-2.5 h-2.5 bg-orange-500 rounded-[2px]" />}
                    </div>
                  </button>

                  <div className="h-[1px] bg-[#1E293B] my-2" />

                  {/* Mobile Signout */}
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                    className="w-full py-2.5 px-3 text-left text-xs font-extrabold text-red-400 hover:bg-[#18233C] rounded-lg flex items-center gap-3 outline-none"
                  >
                    <LogOut className="w-4.5 h-4.5 text-red-500 shrink-0" />
                    <span>SIGNOUT</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default UserHeader;
