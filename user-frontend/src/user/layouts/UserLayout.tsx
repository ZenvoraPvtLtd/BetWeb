import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';
import { LogOut } from 'lucide-react';

interface UserLayoutProps {
  children: React.ReactNode;
}

export const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="w-full min-h-screen bg-[#0B0F19] text-[#F8FAFC] flex flex-col font-sans">
      {/* Top App Header */}
      <header className="h-16 bg-[#0E1524] border-b border-[#1E293B] flex items-center justify-between px-6 shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <Logo theme="light" width={120} />
          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-orange-500/15 border border-orange-500/30 text-orange-400 rounded-full font-mono">
            User Exchange
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-300">
            Welcome, <strong className="text-orange-400 font-bold">{user?.username}</strong>
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#18233C] hover:bg-[#223050] text-slate-300 hover:text-white border border-[#2B3C60] rounded-[6px] text-xs font-semibold tracking-wide transition-all focus:outline-none cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-orange-400" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main workspace container */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};
export default UserLayout;
