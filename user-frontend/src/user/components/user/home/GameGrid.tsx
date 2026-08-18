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
      className="group relative bg-[#131B2E] border border-[#1E293B] rounded-[12px] overflow-hidden hover:-translate-y-1 hover:border-orange-500/50 transition-all duration-200 shadow-md hover:shadow-orange-950/20"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-[#090E17] relative">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#131B2E] via-transparent to-transparent" />
      </div>

      <div className="p-3 bg-[#131B2E] border-t border-[#1E293B]">
        <span className="text-[11px] font-bold text-slate-200 group-hover:text-orange-400 transition-colors truncate block">
          {game.name}
        </span>
        <span className="text-[8px] font-bold text-orange-400 uppercase tracking-widest block mt-0.5 font-mono">
          {game.category}
        </span>
      </div>
    </a>
  );
};

export const GameGrid: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 text-left select-none">
      <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-100 font-mono">
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
