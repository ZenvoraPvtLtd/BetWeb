import React from 'react';

export const SettingsSkeleton: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-5 animate-pulse select-none text-left">
      <div className="h-6 bg-zinc-800 rounded-md w-40" />
      <div className="h-4 bg-zinc-800/70 rounded-md w-72 mt-1" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#111F30] border border-slate-700/10 rounded-[12px] p-5 h-36 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-[8px] bg-zinc-800" />
              <div className="w-14 h-3 bg-zinc-800 rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-24 h-4 bg-zinc-800 rounded-md" />
              <div className="w-44 h-3 bg-zinc-800 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SettingsSkeleton;
