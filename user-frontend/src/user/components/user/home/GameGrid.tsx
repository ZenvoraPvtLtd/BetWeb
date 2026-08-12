import React, { useState } from 'react';
import { gameCatalog } from '../../../data/gameCatalog';

interface HomeGameCardProps {
  game: any;
}

const HomeGameCard: React.FC<HomeGameCardProps> = ({ game }) => {
  const [imageError, setImageError] = useState(false);
  const showFallback = !game.image || imageError;

  return (
    <a
      href={game.route}
      className="group relative bg-[#101C2C] border border-white/5 rounded-[12px] overflow-hidden hover:-translate-y-1 hover:border-[#38BDF8]/30 transition-all duration-200 shadow-md hover:shadow-[#38BDF8]/5"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-950/40 relative">
        {showFallback ? (
          <img
            src="/R.jpg"
            alt={game.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <img
            src={game.image}
            alt={game.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/20 to-transparent" />
      </div>

      <div className="p-3 bg-[#0B1320] border-t border-white/5">
        <span className="text-[11px] font-bold text-zinc-350 group-hover:text-white transition-colors truncate block">
          {game.name}
        </span>
        <span className="text-[8px] font-bold text-zinc-550 uppercase tracking-widest block mt-0.5">
          {game.category}
        </span>
      </div>
    </a>
  );
};

export const GameGrid: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 text-left select-none">
      <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
        Premium Casino & Teenpatti Lobby
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {gameCatalog.map((game) => (
          <HomeGameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};
export default GameGrid;
