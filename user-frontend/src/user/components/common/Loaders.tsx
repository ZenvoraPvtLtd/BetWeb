import React from 'react';

export const PageLoader: React.FC = () => {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center select-none">
      <div className="w-10 h-10 border-2 border-slate-700/20 border-t-[#0EA5E9] rounded-full animate-spin" />
      <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mt-4">
        Loading Section...
      </span>
    </div>
  );
};

export const OverlayLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#07111F]/60 backdrop-blur-2xs z-[3000] flex flex-col items-center justify-center select-none">
      <div className="w-12 h-12 border-3 border-slate-700/30 border-t-[#0EA5E9] rounded-full animate-spin" />
      <span className="text-[10px] uppercase font-bold text-white tracking-widest mt-4">
        Processing Request...
      </span>
    </div>
  );
};

export const ButtonLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      <span>Loading...</span>
    </div>
  );
};
