import React, { useState, useEffect } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { Breadcrumbs } from '../../components/user/layout/Breadcrumbs';
import { GameCard } from '../../components/user/games/GameCard';
import { casinoGames } from '../../data/casinoGames';
import { Sparkles, LayoutGrid, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

type CasinoCategory =
  | 'All Casino'
  | 'Roulette'
  | 'Teenpatti'
  | 'Poker'
  | 'Baccarat'
  | 'Dragon Tiger'
  | '32 Cards'
  | 'Andar Bahar'
  | 'Lucky 7'
  | '3 Cards Judgement'
  | 'Casino War'
  | 'Worli'
  | 'Sports'
  | 'Bollywood'
  | 'Lottery'
  | 'Queen'
  | 'Race'
  | 'Others';

export const CasinoCategoryPage: React.FC = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<CasinoCategory>('All Casino');
  const [visibleCount, setVisibleCount] = useState(24);

  let pageTitle = 'Our Casino';
  let pageDesc = 'Premium card tables, slot lobbies, and custom baccarats powered by live streams.';

  const path = location.pathname;
  if (path.includes('/vip')) {
    pageTitle = 'Our VIP Casino';
    pageDesc = 'High stakes tables and exclusive VIP lounge lobbies.';
  } else if (path.includes('/premium')) {
    pageTitle = 'Our Premium Casino';
    pageDesc = 'Sleek luxury dealers and top tier slot machine variations.';
  } else if (path.includes('/virtual')) {
    pageTitle = 'Our Virtual';
    pageDesc = 'AI driven table simulations and virtual instant card events.';
  } else if (path.includes('/live')) {
    pageTitle = 'Live Casino';
    pageDesc = 'Real-time card rooms and live croupier streaming tables.';
  } else if (path.includes('/casino/casino')) {
    pageTitle = 'Casino';
    pageDesc = 'Browse and play our entire selection of classic casino content.';
  } else if (path.includes('/mini')) {
    pageTitle = 'Mini';
    pageDesc = 'Fast settlement mini card rounds and instant play micro games.';
  } else if (path.includes('/slots')) {
    pageTitle = 'Slots';
    pageDesc = 'Spin classic reels and modern video slots for virtual jackpots.';
  } else if (path.includes('/crash')) {
    pageTitle = 'Crash';
    pageDesc = 'Predict multiplier scales and cash out before the curve collapses.';
  } else if (path.includes('/sports')) {
    pageTitle = 'Sports';
    pageDesc = 'Interactive virtual match events and betting board tables.';
  } else if (path.includes('/slot-game')) {
    pageTitle = 'Slot Game';
    pageDesc = 'High volatility slot suites and dynamic jackpot wheels.';
  } else if (path.includes('/fantasy')) {
    pageTitle = 'Fantasy Game';
    pageDesc = 'Build virtual sports rosters and follow fantasy leaderboard races.';
  }

  useEffect(() => {
    setActiveCategory('All Casino');
    setVisibleCount(24);
  }, [path]);

  const categoriesList: CasinoCategory[] = [
    'All Casino',
    'Roulette',
    'Teenpatti',
    'Poker',
    'Baccarat',
    'Dragon Tiger',
    '32 Cards',
    'Andar Bahar',
    'Lucky 7',
    '3 Cards Judgement',
    'Casino War',
    'Worli',
    'Sports',
    'Bollywood',
    'Lottery',
    'Queen',
    'Race',
    'Others'
  ];

  const filteredGames = activeCategory === 'All Casino'
    ? casinoGames
    : casinoGames.filter(game => game.category === activeCategory);

  const displayedGames = filteredGames.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 24, filteredGames.length));
  };

  const handleCategoryChange = (cat: CasinoCategory) => {
    setActiveCategory(cat);
    setVisibleCount(24);
  };

  const breadcrumbItems = [
    { label: 'Casino', to: '/casino' },
    { label: pageTitle },
    { label: activeCategory }
  ];

  return (
    <UserLayout>
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left font-sans">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-center gap-2.5 pb-4 border-b border-[#1E293B]">
          <Sparkles className="w-5 h-5 text-orange-400" />
          <div>
            <h2 className="text-xl font-extrabold text-slate-100 uppercase tracking-wider font-mono">
              {pageTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-semibold">
              {pageDesc}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Category Sidebar */}
          <div className="w-full lg:w-56 bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-2.5 flex flex-row lg:flex-col gap-1 overflow-x-auto scrollbar-none shrink-0 shadow-md">
            {categoriesList.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`
                    flex items-center gap-2.5 px-3.5 py-2.5 rounded-[8px] text-[11px] font-bold uppercase tracking-wider transition-all outline-none shrink-0 cursor-pointer text-left w-full font-mono
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white shadow-md shadow-orange-950/40'
                        : 'text-slate-400 hover:text-white hover:bg-[#18233C]'
                    }
                  `}
                >
                  <LayoutGrid className="w-4 h-4 shrink-0" />
                  <span className="truncate">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Right Game Grid */}
          <div className="flex-1 w-full flex flex-col gap-6">
            {filteredGames.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-2 border border-[#1E293B] rounded-[12px] bg-[#131B2E]">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                  No Games Available
                </span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {displayedGames.map((game) => {
                    const slug = game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    return (
                      <a
                        key={game.id}
                        href={`/game/${slug}`}
                        className="block hover:-translate-y-1 transition-transform duration-200"
                      >
                        <GameCard game={game} />
                      </a>
                    );
                  })}
                </div>

                <div className="flex flex-col items-center gap-3.5 mt-4 p-4 border border-[#1E293B] rounded-[12px] bg-[#131B2E]/60 max-w-sm mx-auto shadow-md">
                  <div className="w-full h-1.5 bg-[#090E17] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${(displayedGames.length / filteredGames.length) * 100}%` }}
                      className="h-full bg-gradient-to-r from-[#FF5722] to-[#F97316] transition-all duration-300"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Showing {displayedGames.length} of {filteredGames.length} Games
                  </span>

                  {visibleCount < filteredGames.length && (
                    <button
                      onClick={handleLoadMore}
                      className="px-6 py-2 rounded-[8px] bg-[#18233C] hover:bg-[#223050] border border-[#2B3C60] hover:border-orange-500/40 text-orange-400 text-[10px] font-bold uppercase tracking-widest transition-all outline-none cursor-pointer flex items-center gap-1.5 font-mono shadow-sm"
                    >
                      <span>Load More Games</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};
export default CasinoCategoryPage;
