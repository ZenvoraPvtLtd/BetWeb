import React, { useState, useEffect } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { useSettings } from '../../context/SettingsContext';
import { Search, Trophy, Play, Sparkles, Check } from 'lucide-react';
import { EmptyReportState } from '../../components/reports/EmptyReportState';

export const AddMatchListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sportFilter, setSportFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);

  const { availableMatches, toggleMatchAdded } = useSettings();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSportFilter('ALL');
  };

  const sportsOptions = Array.from(new Set(availableMatches.map((m) => m.sport)));

  const filteredMatches = availableMatches.filter((m) => {
    const matchesSearch =
      m.matchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.competition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = sportFilter === 'ALL' || m.sport === sportFilter;
    return matchesSearch && matchesSport;
  });

  const getSportIcon = (icon: string) => {
    switch (icon) {
      case 'Trophy':
        return <Trophy className="w-4.5 h-4.5 text-[#0EA5E9]" />;
      case 'Play':
        return <Play className="w-4.5 h-4.5 text-emerald-400" />;
      default:
        return <Sparkles className="w-4.5 h-4.5 text-amber-500" />;
    }
  };

  const breadcrumbs = [
    { label: 'Settings', to: '/settings' },
    { label: 'Add Match List' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <SettingsHeader
          title="Add Match List"
          description="Customize the matches and competitions list visible in your sports navigation stream."
          breadcrumbs={breadcrumbs}
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-zinc-950/20 border border-zinc-900 p-4 rounded-[12px]">
          <div className="relative flex-1">
            <input
              placeholder="Search matches or competitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 bg-[#111F30] border border-zinc-850 rounded-[8px] text-xs font-bold text-white placeholder-zinc-500 outline-none focus:border-[#0EA5E9]"
            />
            <Search className="w-4 h-4 text-zinc-505 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <select
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
            className="h-9 px-3 bg-[#111F30] border border-zinc-850 rounded-[8px] text-xs font-bold text-white outline-none cursor-pointer focus:border-[#0EA5E9]"
          >
            <option value="ALL">All Sports</option>
            {sportsOptions.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>

        {/* Match List Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-[#111F30] rounded-[12px] border border-slate-700/10" />
            ))}
          </div>
        ) : filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMatches.map((match) => {
              const isAdded = match.status === 'ADDED';
              return (
                <div
                  key={match.id}
                  className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-5 flex flex-col justify-between shadow-xs select-none"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-zinc-900/30 border border-zinc-800 rounded-[8px] mt-0.5">
                        {getSportIcon(match.sportIcon)}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                          {match.competition}
                        </span>
                        <h4 className="text-xs font-extrabold text-white uppercase tracking-wide mt-1">
                          {match.matchName}
                        </h4>
                        <span className="text-[10px] text-[#94A3B8] font-bold mt-1.5 uppercase">
                          {match.date} • {match.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-900/80 pt-3 mt-4">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      Status: {isAdded ? 'Active' : 'Hidden'}
                    </span>
                    <button
                      onClick={() => toggleMatchAdded(match.id)}
                      className={`
                        flex items-center gap-1.5 px-3.5 h-8 rounded-[8px] text-[10px] font-bold uppercase tracking-wider outline-none transition-all cursor-pointer
                        ${
                          isAdded
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-[#22C55E]'
                            : 'bg-[#0EA5E9] hover:bg-[#0284c7] text-white'
                        }
                      `}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <span>Add Match</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyReportState
            title="No matches found"
            message="No matches fit your parameters. Try resetting your search query."
            onResetFilters={handleResetFilters}
          />
        )}
      </div>
    </UserLayout>
  );
};
export default AddMatchListPage;
