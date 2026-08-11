import React from 'react';
import { Lock, ArrowLeft } from 'lucide-react';

export const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07111F] text-white flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-16 h-16 rounded-full bg-[#111F30] border border-slate-700/10 flex items-center justify-center text-rose-500 mb-6 shadow-xl">
        <Lock className="w-8 h-8" />
      </div>

      <h1 className="text-4xl font-extrabold uppercase tracking-widest text-rose-500">403</h1>
      <h2 className="text-sm font-extrabold uppercase tracking-wider text-white mt-3">Access Restricted</h2>
      <p className="text-xs text-zinc-450 mt-2 max-w-[320px] font-semibold leading-relaxed">
        You do not have the required role permissions to view the requested workspace route directory.
      </p>

      <a
        href="/home"
        className="flex items-center gap-1.5 px-5 h-10 rounded-[8px] bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs uppercase tracking-wider transition-colors outline-none cursor-pointer mt-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </a>
    </div>
  );
};
export default UnauthorizedPage;
