import React from 'react';
import { Menu } from 'lucide-react';
import { Logo } from '../common/Logo';
import { ClientSelector } from './ClientSelector';
import { SuperAdminProfileMenu } from './SuperAdminProfileMenu';

interface SuperAdminHeaderProps {
  onMenuToggle?: () => void;
}

export const SuperAdminHeader: React.FC<SuperAdminHeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="w-full bg-[#0E1524] border-b border-[#1E293B] text-slate-100 z-30 select-none shadow-sm">
      <div className="w-full px-4 md:px-6 h-[56px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={onMenuToggle}
            className="md:hidden p-1.5 text-slate-400 hover:text-white hover:bg-[#18233C] rounded-lg transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile Brand Logo */}
          <div className="flex md:hidden items-center shrink-0">
            <Logo width={100} theme="light" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Client Filter Selector */}
          <ClientSelector />

          {/* Profile Settings dropdown */}
          <SuperAdminProfileMenu />
        </div>
      </div>
    </header>
  );
};
