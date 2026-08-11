import React from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { Breadcrumbs } from '../../components/user/layout/Breadcrumbs';
import { GameCard } from '../../components/user/games/GameCard';
import { casinoGames } from '../../data/casinoGames';
import { Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const GenericCasinoPage: React.FC = () => {
  const location = useLocation();

  let title = 'Casino Collection';
  let desc = 'Browse and play our selection of mock card and table casino games.';

  if (location.pathname.includes('/live')) {
    title = 'Live Casino Lobby';
    desc = 'Real-time dealer rooms and live casino streaming tables.';
  } else if (location.pathname.includes('/mini')) {
    title = 'Mini Casino Games';
    desc = 'Fast-paced, quick settlement micro-gaming events.';
  } else if (location.pathname.includes('/slots')) {
    title = 'Online Video Slots';
    desc = 'Spin virtual slots and win virtual jackpots.';
  } else if (location.pathname.includes('/crash')) {
    title = 'Multiplier Crash Games';
    desc = 'Test your nerves on multiplier multipliers and escape in time.';
  } else if (location.pathname.includes('/slot')) {
    title = 'Slot Game Suite';
    desc = 'Explore high volatility video slots catalog.';
  } else if (location.pathname.includes('/fantasy')) {
    title = 'Fantasy Game Arena';
    desc = 'Build virtual drafts and track fantasy live leaderboards.';
  } else if (location.pathname.includes('/horse-racing')) {
    title = 'Horse Racing Live';
    desc = 'Live virtual horse racing odds and bets placement.';
  } else if (location.pathname.includes('/greyhound-racing')) {
    title = 'Greyhound Racing Live';
    desc = 'Live greyhound racing dog race track odds.';
  }

  const breadcrumbItems = [{ label: title }];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-center gap-2 pb-4 border-b border-zinc-900 text-left">
          <Sparkles className="w-5 h-5 text-[#38BDF8]" />
          <div>
            <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
              {title}
            </h2>
            <p className="text-xs text-zinc-450 mt-0.5 font-semibold">
              {desc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {casinoGames.map((game) => {
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
export default GenericCasinoPage;
