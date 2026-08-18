import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center p-6 text-center select-none font-mono">
      <div className="w-16 h-16 rounded-full bg-[#131B2E] border border-[#1E293B] flex items-center justify-center text-orange-400 mb-6 shadow-xl">
        <ShieldAlert className="w-8 h-8 animate-bounce" />
      </div>

      <h1 className="text-4xl font-extrabold uppercase tracking-widest text-orange-400">404</h1>
      <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-100 mt-3 font-sans">Page Not Found</h2>
      <p className="text-xs text-slate-400 mt-2 max-w-[320px] font-medium leading-relaxed font-sans">
        The page you are looking for does not exist or has been relocated to another route.
      </p>

      <a
        href="/home"
        className="flex items-center gap-1.5 px-5 h-10 rounded-[8px] bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white font-bold text-xs uppercase tracking-wider transition-all outline-none cursor-pointer mt-8 shadow-md shadow-orange-950/40"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </a>
    </div>
  );
};
export default NotFoundPage;
