import React from 'react';

export const OpenTeenpattiBettingArea: React.FC = () => {
  return (
    <div className="w-full min-h-[160px] bg-zinc-900/10 border border-zinc-200 border-dashed rounded-[8px] flex items-center justify-center p-6 text-center select-none mt-5">
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">
          Betting Area
        </span>
        <span className="text-[9px] text-zinc-400/80 mt-1 leading-relaxed">
          Betting options layout will be implemented here. This workspace is currently configured as
          a development placeholder.
        </span>
      </div>
    </div>
  );
};
