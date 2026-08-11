import React from 'react';
import { CalendarX, AlertTriangle, Ghost } from 'lucide-react';

export const MatchNotFound: React.FC = () => {
  return (
    <div className="w-full py-16 bg-[#111F30] border border-slate-700/15 rounded-[12px] flex flex-col items-center justify-center p-6 text-center select-none shadow-xs">
      <CalendarX className="w-12 h-12 text-[#F43F5E] mb-3 animate-pulse" />
      <h4 className="text-sm font-bold uppercase tracking-wider text-white">Match Not Found</h4>
      <p className="text-xs text-[#94A3B8] font-medium mt-2 max-w-[280px]">
        The match you are looking for might have finished or is temporarily unavailable.
      </p>
      <a
        href="/home"
        className="mt-5 px-5 py-2 bg-[#0EA5E9] hover:bg-[#0284c7] text-white text-xs font-bold rounded-[8px] uppercase tracking-wider transition-colors outline-none cursor-pointer"
      >
        Back to Exchange
      </a>
    </div>
  );
};

export const GameNotFound: React.FC = () => {
  return (
    <div className="w-full py-16 bg-[#111F30] border border-slate-700/15 rounded-[12px] flex flex-col items-center justify-center p-6 text-center select-none shadow-xs">
      <Ghost className="w-12 h-12 text-amber-500 mb-3 animate-pulse" />
      <h4 className="text-sm font-bold uppercase tracking-wider text-white">Game Not Found</h4>
      <p className="text-xs text-[#94A3B8] font-medium mt-2 max-w-[280px]">
        The casino table or Teenpatti variation could not be located.
      </p>
      <a
        href="/casino"
        className="mt-5 px-5 py-2 bg-[#0EA5E9] hover:bg-[#0284c7] text-white text-xs font-bold rounded-[8px] uppercase tracking-wider transition-colors outline-none cursor-pointer"
      >
        Back to Casino List
      </a>
    </div>
  );
};

export const SportNotFound: React.FC = () => {
  return (
    <div className="w-full py-16 bg-[#111F30] border border-slate-700/15 rounded-[12px] flex flex-col items-center justify-center p-6 text-center select-none shadow-xs">
      <AlertTriangle className="w-12 h-12 text-zinc-400 mb-3 animate-pulse" />
      <h4 className="text-sm font-bold uppercase tracking-wider text-white">Sport Category Not Found</h4>
      <p className="text-xs text-[#94A3B8] font-medium mt-2 max-w-[280px]">
        This sports category is empty or does not exist.
      </p>
      <a
        href="/home"
        className="mt-5 px-5 py-2 bg-[#0EA5E9] hover:bg-[#0284c7] text-white text-xs font-bold rounded-[8px] uppercase tracking-wider transition-colors outline-none cursor-pointer"
      >
        Back to Dashboard
      </a>
    </div>
  );
};
