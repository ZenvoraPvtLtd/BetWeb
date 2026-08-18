import React from 'react';

export const PageLoader: React.FC = () => {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center select-none">
      <div className="w-10 h-10 border-2 border-[#1E293B] border-t-[#FF5722] rounded-full animate-spin" />
      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-4 font-mono">
        Loading Section...
      </span>
    </div>
  );
};

export const OverlayLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-xs z-[3000] flex flex-col items-center justify-center select-none">
      <div className="w-12 h-12 border-3 border-[#1E293B] border-t-[#FF5722] rounded-full animate-spin" />
      <span className="text-[10px] uppercase font-bold text-white tracking-widest mt-4 font-mono">
        Processing Request...
      </span>
    </div>
  );
};

export const ButtonLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2 font-mono">
      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      <span>Loading...</span>
    </div>
  );
};
