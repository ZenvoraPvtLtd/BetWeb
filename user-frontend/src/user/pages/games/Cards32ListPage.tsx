import React, { useState } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { Breadcrumbs } from '../../components/user/layout/Breadcrumbs';
import { cards32Games } from '../../data/cards32Games';
import { Sparkles, LayoutGrid, Zap, Sliders, Shield, PlayCircle } from 'lucide-react';

type CategoryType = 'ALL' | 'CRASH' | 'SLOTS' | 'MINES' | 'CARDS' | 'CASINO';

interface CategoryItem {
  id: CategoryType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Cards32GameCardProps {
  game: any;
}

const Cards32GameCard: React.FC<Cards32GameCardProps> = ({ game }) => {
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/10 to-transparent" />
      </div>

      <div className="p-3 bg-[#0B1320] border-t border-white/5 flex items-center justify-between">
        <div className="min-w-0">
          <span className="text-[11px] font-bold text-zinc-300 group-hover:text-white transition-colors truncate block">
            {game.name}
          </span>
          <span className="text-[8px] font-bold text-zinc-550 uppercase tracking-widest block mt-0.5 animate-pulse-none">
            {game.category}
          </span>
        </div>
        <PlayCircle className="w-4 h-4 text-zinc-550 group-hover:text-[#38BDF8] shrink-0 transition-colors" />
      </div>
    </a>
  );
};

export const Cards32ListPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('ALL');

  const categoriesList: CategoryItem[] = [
    { id: 'ALL', label: 'All Games', icon: LayoutGrid },
    { id: 'CRASH', label: 'Crash Games', icon: Zap },
    { id: 'SLOTS', label: 'Slot Games', icon: Sliders },
    { id: 'MINES', label: 'Mines Games', icon: Shield },
    { id: 'CARDS', label: 'Card Games', icon: Sparkles },
    { id: 'CASINO', label: 'Casino Games', icon: Sparkles }
  ];

  const filteredGames = activeCategory === 'ALL'
    ? cards32Games
    : cards32Games.filter(game => game.category === activeCategory);

  const breadcrumbItems = [
    { label: 'Games', to: '/home' },
    { label: '32 Cards Lobby' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900">
          <Sparkles className="w-5 h-5 text-[#38BDF8]" />
          <div>
            <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
              32 Cards Premium Lobby
            </h2>
            <p className="text-xs text-zinc-450 mt-0.5 font-semibold">
              Explore our selection of quick cards, multiplier crashes, and classic gaming tables.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-56 bg-[#0B1320] border border-slate-700/10 rounded-[12px] p-2.5 flex flex-row lg:flex-col gap-1 overflow-x-auto scrollbar-none shrink-0">
            {categoriesList.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    flex items-center gap-2.5 px-3.5 py-2.5 rounded-[8px] text-[11px] font-bold uppercase tracking-wider transition-all outline-none shrink-0 cursor-pointer text-left w-full
                    ${
                      isActive
                        ? 'bg-[#0EA5E9] text-white shadow-md shadow-[#0EA5E9]/15'
                        : 'text-zinc-450 hover:text-white hover:bg-zinc-900/40'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredGames.map((game) => (
                <Cards32GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};
export default Cards32ListPage;
