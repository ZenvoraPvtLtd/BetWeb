import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, ShieldAlert, Sparkles } from 'lucide-react';
import { Logo } from '../../components/common/Logo';

export const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#0B0F19] text-white select-none font-sans overflow-y-auto">
      {/* Top Header */}
      <header className="w-full h-14 bg-[#0E1524] border-b border-[#1E293B] flex items-center justify-between px-6 shrink-0">
        <Logo theme="light" width={110} />
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#18233C] hover:bg-[#223050] text-slate-300 hover:text-white border border-[#2B3C60] rounded-[6px] text-xs font-semibold tracking-wide transition-all focus:outline-none cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 text-orange-400" />
          <span>Logout</span>
        </button>
      </header>

      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center mb-6 animate-pulse">
          <Sparkles className="w-6 h-6" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-2 leading-none uppercase">
          Welcome back, USER
        </h1>
        <p className="text-sm text-slate-400 font-medium mb-6">
          Logged in as <strong className="text-orange-400 font-bold">{user?.username}</strong>
        </p>

        {/* Info card */}
        <div className="w-full bg-[#131B2E] border border-[#1E293B] rounded-[10px] p-5 text-left mb-6 shadow-xl">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                User Client Portal
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Welcome to the Play Money Sports Exchange client workspace. Play-money gaming features and custom layouts are pending dashboard deployment settings.
              </p>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
          You are authenticated with granular security tokens. To switch environments or manage permissions, please sign out and log in with admin/master credentials.
        </p>
      </main>
    </div>
  );
};
