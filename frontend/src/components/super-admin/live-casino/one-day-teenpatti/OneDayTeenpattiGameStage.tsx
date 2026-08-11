import React from 'react';
import { GameStateIndicator } from '../teenpatti/GameStateIndicator';

export const OneDayTeenpattiGameStage: React.FC = () => {
  return (
    <div className="w-full h-[360px] md:h-[420px] bg-[#09090B] border-x border-b border-zinc-900 flex flex-col justify-end p-4 relative overflow-hidden select-none">
      {/* Background canvas styling */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
        <div className="w-[180px] h-[180px] rounded-full border-4 border-white" />
      </div>

      {/* State Indicators positioned bottom-right */}
      <div className="flex justify-end shrink-0">
        <GameStateIndicator />
      </div>
    </div>
  );
};
