import React, { useState } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { Breadcrumbs } from '../../components/user/layout/Breadcrumbs';
import { GameCard } from '../../components/user/games/GameCard';
import { teenpattiGames } from '../../data/teenpattiGames';
import { lucky7Games } from '../../data/lucky7Games';
import { Sparkles, LayoutGrid, Award, Sliders, ChevronDown } from 'lucide-react';

type ProviderFilter = 'ALL' | 'JILI' | 'JDB' | 'Evolution Asia' | 'Live 88' | 'Ezugi Live' | 'Jili All' | 'Spribe All';

interface CasinoLobbyPageProps {
  type: 'teenpatti' | 'poker' | 'lucky7';
}

export const CasinoLobbyPage: React.FC<CasinoLobbyPageProps> = ({ type }) => {
  const [activeProvider, setActiveProvider] = useState<ProviderFilter>('ALL');
  const [visibleCount, setVisibleCount] = useState(20);

  const getSidebarProviders = () => {
    if (type === 'lucky7') {
      return [
        { id: 'ALL', label: 'All Providers', icon: LayoutGrid },
        { id: 'Evolution Asia', label: 'Evolution Asia', icon: Award },
        { id: 'Live 88', label: 'Live 88', icon: Award },
        { id: 'Ezugi Live', label: 'Ezugi Live', icon: Sliders },
        { id: 'Jili All', label: 'Jili All', icon: Sliders },
        { id: 'Spribe All', label: 'Spribe All', icon: Sliders }
      ] as const;
    }
    return [
      { id: 'ALL', label: 'Jili All', icon: LayoutGrid },
      { id: 'JILI', label: 'JILI Provider', icon: Award },
      { id: 'JDB', label: 'JDB Provider', icon: Sliders }
    ] as const;
  };

  const getGamesList = () => {
    if (type === 'lucky7') return lucky7Games;
    return teenpattiGames;
  };

  const currentGamesList = getGamesList();

  const filteredGames = activeProvider === 'ALL'
    ? currentGamesList
    : currentGamesList.filter(game => game.provider === activeProvider);

  const displayedGames = filteredGames.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 20, filteredGames.length));
  };

  const handleProviderChange = (providerId: ProviderFilter) => {
    setActiveProvider(providerId);
    setVisibleCount(20);
  };

  let title = 'Teenpatti & Slots Lounge';
  let desc = 'Browse our large collection of Jili and JDB slots, cards, and multipliers.';
  let lobbyLabel = 'Teenpatti Lobby';

  if (type === 'poker') {
    title = 'Poker & Cards Lounge';
    desc = 'Browse our large collection of Jili and JDB poker, slots, and casino cards.';
    lobbyLabel = 'Poker Lobby';
  } else if (type === 'lucky7') {
    title = 'Lucky 7 Live Casino';
    desc = 'Live streaming dealer lobbies from Evolution, Live 88, Ezugi, Jili, and Spribe.';
    lobbyLabel = 'Lucky 7 Lobby';
  }

  const breadcrumbItems = [
    { label: 'Casino', to: '/casino' },
    { label: lobbyLabel }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-center gap-2 pb-4 border-b border-zinc-900">
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

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-56 bg-[#0B1320] border border-slate-700/10 rounded-[12px] p-2.5 flex flex-row lg:flex-col gap-1 overflow-x-auto scrollbar-none shrink-0">
            {getSidebarProviders().map((prov) => {
              const Icon = prov.icon;
              const isActive = activeProvider === prov.id;
              return (
                <button
                  key={prov.id}
                  onClick={() => handleProviderChange(prov.id)}
                  className={`
                    flex items-center gap-2.5 px-3.5 py-2.5 rounded-[8px] text-[11px] font-bold uppercase tracking-wider transition-all outline-none shrink-0 cursor-pointer text-left w-full
                    ${
                      isActive
                        ? 'bg-[#0EA5E9] text-white shadow-md shadow-[#0EA5E9]/15'
                        : 'text-zinc-455 hover:text-white hover:bg-zinc-900/40'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{prov.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex-1 w-full flex flex-col gap-6">
            {filteredGames.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-2 border border-slate-700/10 rounded-[12px] bg-[#0B1320]">
                <span className="text-xs font-bold text-zinc-550 uppercase tracking-widest">No Games Available</span>
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

                <div className="flex flex-col items-center gap-3.5 mt-4 p-4 border border-white/5 rounded-[12px] bg-[#0B1320]/40 max-w-sm mx-auto">
                  <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${(displayedGames.length / filteredGames.length) * 100}%` }}
                      className="h-full bg-[#0EA5E9] transition-all duration-300"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-wider">
                    Showing {displayedGames.length} of {filteredGames.length} Games
                  </span>

                  {visibleCount < filteredGames.length && (
                    <button
                      onClick={handleLoadMore}
                      className="px-6 py-2 rounded-[8px] bg-zinc-900 hover:bg-zinc-850 border border-slate-700/20 hover:border-slate-700/50 text-[#38BDF8] text-[10px] font-bold uppercase tracking-widest transition-all outline-none cursor-pointer flex items-center gap-1.5"
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
export default CasinoLobbyPage;
