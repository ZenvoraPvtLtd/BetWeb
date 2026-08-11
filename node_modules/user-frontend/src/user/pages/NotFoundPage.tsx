import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07111F] text-white flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-16 h-16 rounded-full bg-[#111F30] border border-slate-700/10 flex items-center justify-center text-[#0EA5E9] mb-6 shadow-xl">
        <ShieldAlert className="w-8 h-8 animate-bounce" />
      </div>

      <h1 className="text-4xl font-extrabold uppercase tracking-widest text-[#0EA5E9]">404</h1>
      <h2 className="text-sm font-extrabold uppercase tracking-wider text-white mt-3">Page Not Found</h2>
      <p className="text-xs text-zinc-450 mt-2 max-w-[320px] font-semibold leading-relaxed">
        The page you are looking for does not exist or has been relocated to another route.
      </p>

      <a
        href="/home"
        className="flex items-center gap-1.5 px-5 h-10 rounded-[8px] bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-bold text-xs uppercase tracking-wider transition-colors outline-none cursor-pointer mt-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </a>
    </div>
  );
};
export default NotFoundPage;
