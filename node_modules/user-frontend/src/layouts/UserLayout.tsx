import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';

interface UserLayoutProps {
  children: React.ReactNode;
}

export const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white flex flex-col">
      {/* Simple Header */}
      <header className="h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-6">
        <span className="font-bold text-sm tracking-wider text-indigo-400">
          PLAY MONEY EXCHANGE
        </span>
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-400">
            Welcome, <strong>{user?.username}</strong>
          </span>
          <Button onClick={logout} className="h-8 px-3 text-xs bg-zinc-800 hover:bg-zinc-700">
            Logout
          </Button>
        </div>
      </header>

      {/* Main workspace container */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};
