import React from 'react';
import { Lock, ArrowLeft } from 'lucide-react';

export const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center p-6 text-center select-none font-mono">
      <div className="w-16 h-16 rounded-full bg-[#131B2E] border border-[#1E293B] flex items-center justify-center text-rose-400 mb-6 shadow-xl">
        <Lock className="w-8 h-8" />
      </div>

      <h1 className="text-4xl font-extrabold uppercase tracking-widest text-rose-400">403</h1>
      <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-100 mt-3 font-sans">Access Restricted</h2>
      <p className="text-xs text-slate-400 mt-2 max-w-[320px] font-medium leading-relaxed font-sans">
        You do not have the required role permissions to view the requested workspace route directory.
      </p>

      <a
        href="/home"
        className="flex items-center gap-1.5 px-5 h-10 rounded-[8px] bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 font-bold text-xs uppercase tracking-wider transition-colors outline-none cursor-pointer mt-8 shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </a>
    </div>
  );
};
export default UnauthorizedPage;
