import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { PageContainer } from '../../components/common/PageContainer';
import { Sparkles, Trophy } from 'lucide-react';

export const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center py-20 text-center max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center mb-6 animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 mb-2 leading-none uppercase font-mono">
          Welcome back, USER
        </h1>
        <p className="text-sm text-slate-400 font-medium mb-8">
          Logged in as <strong className="text-orange-400 font-bold">{user?.username}</strong>
        </p>

        <div className="w-full bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-6 text-left mb-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#18233C] border border-[#2B3C60] rounded-lg text-orange-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100 font-mono">
                Dashboard Portal Setup Complete
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                The User Frontend setup has been initialized. Further sections and views are live with the complete Charcoal Slate & Sunset Orange dark theme.
              </p>
            </div>
          </div>
        </div>

        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-mono">
          Independent workspace isolated from admin panel
        </span>
      </div>
    </PageContainer>
  );
};
