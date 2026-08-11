import React from 'react';
import { userGames } from '../../../data/games';
import { GameCard } from './GameCard';
import { Sparkles } from 'lucide-react';

export const FeaturedGames: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 select-none">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
          Featured Casino Games
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {userGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};
export default FeaturedGames;
