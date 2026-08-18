import React, { useState } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { Breadcrumbs } from '../../components/user/layout/Breadcrumbs';
import { crashGames } from '../../data/crashGames';
import type { CrashGame } from '../../data/crashGames';
import { Sparkles, Zap, HelpCircle, Play } from 'lucide-react';

interface CrashGameCardProps {
  game: CrashGame;
}

export const CrashGameCard: React.FC<CrashGameCardProps> = ({ game }) => {
  const [imageError, setImageError] = useState(false);
  const showFallback = !game.image || imageError;

  return (
    <a
      href={`/game/${game.slug}`}
      className="group relative flex flex-col bg-[#131B2E] border border-[#1E293B] rounded-[12px] overflow-hidden hover:-translate-y-1 hover:border-orange-500/40 transition-all duration-200 shadow-md hover:shadow-orange-950/20"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-[#090E17] relative">
        {showFallback ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#18233C] to-[#0E1524] flex flex-col items-center justify-center p-3 relative">
            <img
              src="/R.jpg"
              alt={game.name}
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
            <HelpCircle className="w-6 h-6 text-slate-500 mb-1 z-10" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider z-10 font-mono">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#131B2E] via-[#131B2E]/15 to-transparent" />
      </div>

      <div className="p-3 bg-[#131B2E] border-t border-[#1E293B] flex items-center justify-between">
        <div className="min-w-0">
          <span className="text-[11px] font-bold text-slate-200 group-hover:text-white transition-colors truncate block uppercase tracking-wider">
            {game.name}
          </span>
          <span className="text-[8px] font-bold text-orange-400 uppercase tracking-widest block mt-0.5 font-mono">
            {game.provider}
          </span>
        </div>
        <Play className="w-3.5 h-3.5 fill-current text-slate-500 group-hover:text-orange-400 shrink-0 transition-colors" />
      </div>
    </a>
  );
};

interface CrashSidebarProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export const CrashSidebar: React.FC<CrashSidebarProps> = ({ activeCategory, setActiveCategory }) => {
  const sidebarItems = ['Spribe All', 'Spribe Slots', 'Spribe Mini', 'Crash Originals'];

  return (
    <div className="w-full lg:w-56 bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-2.5 flex flex-row lg:flex-col gap-1.5 overflow-x-auto scrollbar-none shrink-0 shadow-md">
      {sidebarItems.map((item) => {
        const isActive = activeCategory === item;
        return (
          <button
            key={item}
            onClick={() => setActiveCategory(item)}
            className={`
              flex items-center gap-2.5 px-3.5 py-2.5 rounded-[8px] text-[11px] font-bold uppercase tracking-wider transition-all outline-none shrink-0 cursor-pointer text-left w-full font-mono
              ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white shadow-md shadow-orange-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-[#18233C]'
              }
            `}
          >
            <Zap className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-orange-400'}`} />
            <span>{item}</span>
          </button>
        );
      })}
    </div>
  );
};

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

export const CrashPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Spribe All');

  const breadcrumbItems = [
    { label: 'Casino', to: '/casino' },
    { label: 'Crash Games' }
  ];

  return (
    <UserLayout>
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left font-sans">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-center gap-2.5 pb-4 border-b border-[#1E293B]">
          <Sparkles className="w-5 h-5 text-orange-400" />
          <div>
            <h2 className="text-xl font-extrabold text-slate-100 uppercase tracking-wider font-mono">
              Crash Games Arena
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-semibold">
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
