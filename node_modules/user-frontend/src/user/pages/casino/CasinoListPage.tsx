import React from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { Breadcrumbs } from '../../components/user/layout/Breadcrumbs';
import { GameCard } from '../../components/user/games/GameCard';
import { casinoGames } from '../../data/casinoGames';
import { Sparkles } from 'lucide-react';

export const CasinoListPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Casino' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Title */}
        <div className="flex items-center gap-2 pb-4 border-b border-zinc-900 text-left">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <div>
            <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
              Premium Live Casino
            </h2>
            <p className="text-xs text-zinc-450 mt-0.5 font-semibold">
              Browse and play our entire selection of mock card and table casino games.
            </p>
          </div>
        </div>

        {/* Responsive Grid list */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {casinoGames.map((game) => {
            // Slugify the title
            const slug = game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return (
              <a href={`/game/${slug}`} key={game.id} className="block hover:-translate-y-1 transition-transform duration-200">
                <GameCard game={game} />
              </a>
            );
          })}
        </div>
      </div>
    </UserLayout>
  );
};
export default CasinoListPage;
