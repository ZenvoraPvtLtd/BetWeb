import React from 'react';

export const GameStateIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5 select-none font-bold text-[10px]">
      <div className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#EAB308] text-black shadow-sm">
        N
      </div>
      <div className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#EAB308] text-black shadow-sm">
        A
      </div>
    </div>
  );
};
