import React from 'react';

export const MatchSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-4 flex flex-col gap-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-12 h-4 bg-[#18233C] rounded-full" />
          <div className="w-16 h-3 bg-[#18233C] rounded-full" />
        </div>
        <div className="w-20 h-4 bg-[#18233C] rounded-full" />
      </div>
      <div className="w-[45%] h-5 bg-[#18233C] rounded-md" />
      <div className="w-[30%] h-3 bg-[#18233C] rounded-full mt-0.5" />
    </div>
  );
};

export const GameSkeleton: React.FC = () => {
  return (
    <div className="w-full aspect-[3/4] bg-[#131B2E] border border-[#1E293B] rounded-[16px] p-4 flex flex-col justify-between animate-pulse">
      <div className="w-16 h-4 bg-[#18233C] rounded-full" />
      <div className="flex flex-col gap-2 mt-auto">
        <div className="w-[70%] h-4 bg-[#18233C] rounded-full" />
        <div className="w-[50%] h-3 bg-[#18233C] rounded-full" />
      </div>
    </div>
  );
};

export const MarketSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-5 flex flex-col gap-4 animate-pulse">
      <div className="w-28 h-4 bg-[#18233C] rounded-full" />
      <div className="w-20 h-3 bg-[#18233C] rounded-full" />
      <div className="grid grid-cols-3 gap-3 mt-1">
        {[1, 2, 3].map((idx) => (
          <div key={idx} className="flex gap-1.5">
            <div className="flex-1 h-9 bg-[#18233C] rounded-md" />
            <div className="flex-1 h-9 bg-[#18233C] rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};
