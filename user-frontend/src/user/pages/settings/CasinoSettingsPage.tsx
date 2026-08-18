import React, { useState, useEffect } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { useSettings } from '../../context/SettingsContext';
import { Search } from 'lucide-react';
import { EmptyReportState } from '../../components/reports/EmptyReportState';

export const CasinoSettingsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);

  const { casinoSettings, toggleCasinoGame } = useSettings();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('ALL');
  };

  const categories = Array.from(new Set(casinoSettings.map((g) => g.category)));

  const filteredGames = casinoSettings.filter((game) => {
    const matchesSearch = game.gameName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || game.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const breadcrumbs = [
    { label: 'Settings', to: '/settings' },
    { label: 'Casino List' }
  ];

  return (
    <UserLayout>
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left font-sans">
        <SettingsHeader
          title="Casino Category Settings"
          description="Enable or disable specific casino, poker, or teenpatti variations from your lobby directory."
          breadcrumbs={breadcrumbs}
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-[#131B2E] border border-[#1E293B] p-4 rounded-[12px] shadow-sm font-mono">
          <div className="relative flex-1">
            <input
              placeholder="Search casino game variations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 bg-[#090E17] border border-[#233252] rounded-[8px] text-xs font-bold text-slate-100 placeholder-slate-500 outline-none focus:border-orange-500 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 px-3 bg-[#090E17] border border-[#233252] rounded-[8px] text-xs font-bold text-slate-100 outline-none cursor-pointer focus:border-orange-500 transition-colors"
          >
            <option value="ALL">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#131B2E]">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Games Grid layout */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-44 bg-[#131B2E] rounded-[12px] border border-[#1E293B]" />
            ))}
          </div>
        ) : filteredGames.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 font-mono">
            {filteredGames.map((game) => {
              const isEnabled = game.status === 'ENABLED';
              return (
                <div
                  key={game.id}
                  className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] overflow-hidden flex flex-col justify-between shadow-md group"
                >
                  {/* Aspect image placeholder with category badge */}
                  <div className="relative aspect-video bg-[#090E17] border-b border-[#1E293B] overflow-hidden flex items-center justify-center">
                    <img
                      src={game.image}
                      alt={game.gameName}
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-[#090E17]/80 border border-[#233252] text-[8px] font-bold text-orange-400 uppercase tracking-widest">
                      {game.category}
                    </span>
                  </div>

                  {/* Body description */}
                  <div className="p-3 text-left flex flex-col flex-1 justify-between gap-3">
                    <div className="flex flex-col">
                      <h4 className={`text-xs font-extrabold uppercase tracking-wide truncate ${isEnabled ? 'text-slate-100' : 'text-slate-500 line-through'}`}>
                        {game.gameName}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isEnabled ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                          {isEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleCasinoGame(game.id)}
                      className={`
                        w-full h-8 rounded-[6px] text-[10px] font-bold uppercase tracking-wider outline-none transition-colors cursor-pointer
                        ${
                          isEnabled
                            ? 'bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white'
                            : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white'
                        }
                      `}
                    >
                      {isEnabled ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyReportState
            title="No games found"
            message="No casino games found match your query. Try selecting another category."
            onResetFilters={handleResetFilters}
          />
        )}
      </div>
    </UserLayout>
  );
};
export default CasinoSettingsPage;
