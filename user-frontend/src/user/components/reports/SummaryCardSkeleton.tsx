import React from 'react';

export const SummaryCardSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full animate-pulse select-none text-left">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-4 flex flex-col gap-2.5 shadow-sm">
          <div className="w-16 h-3 bg-[#18233C] rounded-full" />
          <div className="w-24 h-5 bg-[#18233C] rounded-md" />
        </div>
      ))}
    </div>
  );
};
export default SummaryCardSkeleton;
