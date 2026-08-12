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
    <div className="relative aspect-[3/4] rounded-[16px] overflow-hidden border border-slate-700/10 shadow-md group select-none bg-[#101C2C] hover:shadow-[#0EA5E9]/10 hover:border-[#38BDF8]/20 transition-all duration-200">
      {/* Background Gradient */}
      <div
        style={{
          background: `linear-gradient(135deg, ${game.gradientFrom || '#0F172A'} 0%, ${game.gradientTo || '#1E293B'} 100%)`,
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
            console.log('Failed to load image for: ' + game.title);
            setImageError(true);
          }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10" />

      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 items-start">
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#0EA5E9] bg-[#0EA5E9]/15 border border-[#0EA5E9]/25 px-2.5 py-1 rounded-full backdrop-blur-xs">
          {game.category}
        </span>
        {game.badge && (
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/15 border border-amber-500/25 px-2.5 py-1 rounded-full backdrop-blur-xs">
            {game.badge}
          </span>
        )}
        {game.provider && (
          <span className="text-[8px] font-bold text-zinc-400 bg-zinc-950/40 border border-zinc-800 px-2 py-0.5 rounded-md">
            {game.provider}
          </span>
        )}
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col text-left">
        <h4 className="text-sm font-extrabold text-white tracking-tight uppercase leading-snug line-clamp-2">
          {game.title}
        </h4>
        <div className="mt-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-[10px] text-zinc-400 font-semibold tracking-wider">Play Demo Mode</span>
          <div className="w-8 h-8 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center shadow-md">
            <Play className="w-3.5 h-3.5 fill-white stroke-[2.5]" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameCard;
