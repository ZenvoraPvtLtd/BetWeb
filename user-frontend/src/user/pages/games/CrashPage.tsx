import React, { useState } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { Breadcrumbs } from '../../components/user/layout/Breadcrumbs';
import { crashGames } from '../../data/crashGames';
import type { CrashGame } from '../../data/crashGames';
import { Sparkles, Zap, HelpCircle, Play } from 'lucide-react';

// 1. CrashGameCard Subcomponent
interface CrashGameCardProps {
  game: CrashGame;
}

export const CrashGameCard: React.FC<CrashGameCardProps> = ({ game }) => {
  const [imageError, setImageError] = useState(false);

  const showFallback = !game.image || imageError;

  return (
    <a
      href={`/game/${game.slug}`}
      className="group relative flex flex-col bg-[#101C2C] border border-white/5 rounded-[12px] overflow-hidden hover:-translate-y-1 hover:border-[#38BDF8]/30 transition-all duration-200 shadow-md hover:shadow-[#38BDF8]/5"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-950/40 relative">
        {showFallback ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex flex-col items-center justify-center p-3">
            <HelpCircle className="w-6 h-6 text-zinc-550 mb-1" />
            <span className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider">
              {game.provider}
            </span>
          </div>
        ) : (
          <img
            src={game.image}
            alt={game.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/15 to-transparent" />
      </div>

      <div className="p-3 bg-[#0B1320] border-t border-white/5 flex items-center justify-between">
        <div className="min-w-0">
          <span className="text-[11px] font-bold text-zinc-300 group-hover:text-white transition-colors truncate block uppercase tracking-wider">
            {game.name}
          </span>
          <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest block mt-0.5">
            {game.provider}
          </span>
        </div>
        <Play className="w-3.5 h-3.5 fill-current text-zinc-500 group-hover:text-[#38BDF8] shrink-0 transition-colors" />
      </div>
    </a>
  );
};

// 2. CrashSidebar Subcomponent
interface CrashSidebarProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export const CrashSidebar: React.FC<CrashSidebarProps> = ({ activeCategory, setActiveCategory }) => {
  const sidebarItems = ['Spribe All', 'Spribe Slots', 'Spribe Mini', 'Crash Originals'];

  return (
    <div className="w-full lg:w-56 bg-[#0B1320] border border-slate-700/10 rounded-[12px] p-2.5 flex flex-row lg:flex-col gap-1.5 overflow-x-auto scrollbar-none shrink-0">
      {sidebarItems.map((item) => {
        const isActive = activeCategory === item;
        return (
          <button
            key={item}
            onClick={() => setActiveCategory(item)}
            className={`
              flex items-center gap-2.5 px-3.5 py-2.5 rounded-[8px] text-[11px] font-bold uppercase tracking-wider transition-all outline-none shrink-0 cursor-pointer text-left w-full
              ${
                isActive
                  ? 'bg-[#1E293B] border border-slate-700/20 text-white shadow-md'
                  : 'text-zinc-450 hover:text-white hover:bg-zinc-900/40'
              }
            `}
          >
            <Zap className={`w-3.5 h-3.5 ${isActive ? 'text-[#38BDF8]' : 'text-zinc-500'}`} />
            <span>{item}</span>
          </button>
        );
      })}
    </div>
  );
};

// 3. CrashGameGrid Subcomponent
interface CrashGameGridProps {
  games: CrashGame[];
}

export const CrashGameGrid: React.FC<CrashGameGridProps> = ({ games }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {games.map((game) => (
        <CrashGameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

// 4. Main CrashPage Component
export const CrashPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Spribe All');

  const breadcrumbItems = [
    { label: 'Casino', to: '/casino' },
    { label: 'Crash Games' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-900">
          <Sparkles className="w-5 h-5 text-[#38BDF8]" />
          <div>
            <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
              Crash Games Arena
            </h2>
            <p className="text-xs text-zinc-450 mt-0.5 font-semibold">
              Predict multipliers and cash out in real-time on our Spribe selection list.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <CrashSidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          
          <div className="flex-1 w-full">
            <CrashGameGrid games={crashGames} />
          </div>
        </div>
      </div>
    </UserLayout>
  );
};
export default CrashPage;
