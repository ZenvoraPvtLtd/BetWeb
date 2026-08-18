import React from 'react';
import { GameStateIndicator } from './GameStateIndicator';

export const TeenpattiGameStage: React.FC = () => {
  return (
    <div className="w-full h-[360px] md:h-[420px] bg-[#070A12] border-x border-b border-[#1E293B] flex flex-col justify-end p-4 relative overflow-hidden select-none">
      {/* Ambient center radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* State Indicators positioned bottom-right */}
      <div className="flex justify-end shrink-0 relative z-10">
        <GameStateIndicator />
      </div>
    </div>
  );
};
