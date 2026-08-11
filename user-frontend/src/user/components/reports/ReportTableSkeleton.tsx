import React from 'react';

export const ReportTableSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-[#111F30] border border-slate-700/10 rounded-[12px] p-5 flex flex-col gap-4 animate-pulse select-none text-left">
      <div className="flex gap-4 border-b border-zinc-900 pb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex-1 h-3 bg-zinc-800 rounded-full" />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="flex gap-4 py-2 border-b border-zinc-900/40 last:border-0">
            <div className="flex-1 h-4 bg-zinc-800 rounded-md" />
            <div className="flex-1 h-4 bg-zinc-800 rounded-md" />
            <div className="flex-1 h-4 bg-zinc-800 rounded-md" />
            <div className="flex-1 h-4 bg-zinc-800 rounded-md" />
            <div className="flex-1 h-4 bg-zinc-800 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ReportTableSkeleton;
