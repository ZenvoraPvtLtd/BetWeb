import React from 'react';

export const OpenTeenpattiBettingArea: React.FC = () => {
  return (
    <div className="w-full min-h-[160px] bg-[#131B2E] border border-[#233252] border-dashed rounded-[10px] flex items-center justify-center p-6 text-center select-none mt-5">
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 font-mono">
          Betting Area
        </span>
        <span className="text-[10px] text-slate-400 mt-1 leading-relaxed max-w-sm">
          Betting options layout will be implemented here. This workspace is currently configured as
          a development placeholder.
        </span>
      </div>
    </div>
  );
};
