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
    <div className="w-screen h-screen flex flex-col bg-zinc-950 text-white select-none font-sans overflow-y-auto">
      {/* Top Simple Header */}
      <header className="w-full h-14 bg-zinc-900/60 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0">
        <Logo theme="light" width={110} />
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-[6px] text-xs font-semibold tracking-wide transition-all focus:outline-none cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </header>

      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 animate-pulse">
          <Sparkles className="w-6 h-6" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-2 leading-none uppercase">
          Welcome back, USER
        </h1>
        <p className="text-sm text-zinc-400 font-medium mb-6">
          Logged in as <strong className="text-indigo-400 font-bold">{user?.username}</strong>
        </p>

        {/* Info card */}
        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-5 text-left mb-6">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                User Client Portal
              </h4>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Welcome to the Play Money Sports Exchange client workspace. Play-money gaming features and custom layouts are pending dashboard deployment settings.
              </p>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-zinc-500 max-w-xs leading-relaxed">
          You are authenticated with granular security tokens. To switch environments or manage permissions, please sign out and log in with admin/master credentials.
        </p>
      </main>
    </div>
  );
};
