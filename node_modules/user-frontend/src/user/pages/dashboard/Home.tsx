import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { PageContainer } from '../../components/common/PageContainer';
import { Sparkles, Trophy } from 'lucide-react';

export const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center py-20 text-center max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 leading-none uppercase">
          Welcome back, USER
        </h1>
        <p className="text-sm text-zinc-400 font-medium mb-8">
          Logged in as <strong className="text-indigo-400">{user?.username}</strong>
        </p>

        <div className="w-full bg-zinc-950 border border-zinc-850 rounded-[12px] p-6 text-left mb-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-200">
                Dashboard Portal Setup Complete
              </h4>
              <p className="text-xs text-zinc-550 mt-1.5 leading-relaxed">
                The User Frontend setup has been initialized. Further sections and views will be implemented matching visual specs and layouts as soon as screenshots are provided.
              </p>
            </div>
          </div>
        </div>

        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">
          Independent workspace isolated from admin panel
        </span>
      </div>
    </PageContainer>
  );
};
