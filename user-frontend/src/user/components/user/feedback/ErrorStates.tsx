import React from 'react';
import { CalendarX, AlertTriangle, Ghost } from 'lucide-react';

export const MatchNotFound: React.FC = () => {
  return (
    <div className="w-full py-16 bg-[#131B2E] border border-[#1E293B] rounded-[12px] flex flex-col items-center justify-center p-6 text-center select-none shadow-md">
      <CalendarX className="w-12 h-12 text-red-400 mb-3 animate-pulse" />
      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100 font-mono">Match Not Found</h4>
      <p className="text-xs text-slate-400 font-medium mt-2 max-w-[280px]">
        The match you are looking for might have finished or is temporarily unavailable.
      </p>
      <a
        href="/home"
        className="mt-5 px-5 py-2 bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white text-xs font-bold rounded-[8px] uppercase tracking-wider transition-all outline-none cursor-pointer shadow-md font-mono"
      >
        Back to Exchange
      </a>
    </div>
  );
};

export const GameNotFound: React.FC = () => {
  return (
    <div className="w-full py-16 bg-[#131B2E] border border-[#1E293B] rounded-[12px] flex flex-col items-center justify-center p-6 text-center select-none shadow-md">
      <Ghost className="w-12 h-12 text-amber-400 mb-3 animate-pulse" />
      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100 font-mono">Game Not Found</h4>
      <p className="text-xs text-slate-400 font-medium mt-2 max-w-[280px]">
        The casino table or Teenpatti variation could not be located.
      </p>
      <a
        href="/casino"
        className="mt-5 px-5 py-2 bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white text-xs font-bold rounded-[8px] uppercase tracking-wider transition-all outline-none cursor-pointer shadow-md font-mono"
      >
        Back to Casino List
      </a>
    </div>
  );
};

export const SportNotFound: React.FC = () => {
  return (
    <div className="w-full py-16 bg-[#131B2E] border border-[#1E293B] rounded-[12px] flex flex-col items-center justify-center p-6 text-center select-none shadow-md">
      <AlertTriangle className="w-12 h-12 text-orange-400 mb-3 animate-pulse" />
      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100 font-mono">Sport Category Not Found</h4>
      <p className="text-xs text-slate-400 font-medium mt-2 max-w-[280px]">
        This sports category is empty or does not exist.
      </p>
      <a
        href="/home"
        className="mt-5 px-5 py-2 bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white text-xs font-bold rounded-[8px] uppercase tracking-wider transition-all outline-none cursor-pointer shadow-md font-mono"
      >
        Back to Dashboard
      </a>
    </div>
  );
};
