import React, { useState } from 'react';
import type { Game } from '../../../types/games';
import { Play } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [imageError, setImageError] = useState(false);

  const showFallback = !game.image || imageError;

  return (
    <div className="relative aspect-[3/4] rounded-[16px] overflow-hidden border border-[#1E293B] shadow-md group select-none bg-[#131B2E] hover:shadow-orange-950/30 hover:border-orange-500/50 transition-all duration-200">
      {/* Background Gradient */}
      <div
        style={{
          background: `linear-gradient(135deg, ${game.gradientFrom || '#0E1524'} 0%, ${game.gradientTo || '#18233C'} 100%)`,
        }}
        className="absolute inset-0"
      />

      {showFallback ? (
        <img
          src="/R.jpg"
          alt={game.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <img
          src={game.image}
          alt={game.title}
          loading="lazy"
          onError={() => {
            setImageError(true);
          }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-[#0B0F19]/40 to-transparent z-10" />

      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 items-start font-mono">
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-orange-400 bg-orange-500/15 border border-orange-500/30 px-2.5 py-1 rounded-full backdrop-blur-xs">
          {game.category}
        </span>
        {game.badge && (
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full backdrop-blur-xs">
            {game.badge}
          </span>
        )}
        {game.provider && (
          <span className="text-[8px] font-bold text-slate-300 bg-[#090E17]/80 border border-[#233252] px-2 py-0.5 rounded-md">
            {game.provider}
          </span>
        )}
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col text-left">
        <h4 className="text-sm font-extrabold text-slate-100 tracking-tight uppercase leading-snug line-clamp-2">
          {game.title}
        </h4>
        <div className="mt-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-[10px] text-slate-300 font-semibold tracking-wider font-mono">Play Demo Mode</span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white flex items-center justify-center shadow-md shadow-orange-950/50">
            <Play className="w-3.5 h-3.5 fill-white stroke-[2.5]" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameCard;
