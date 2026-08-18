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
        return <Trophy className="w-4.5 h-4.5 text-orange-400" />;
      case 'Play':
        return <Play className="w-4.5 h-4.5 text-emerald-400" />;
      default:
        return <Sparkles className="w-4.5 h-4.5 text-amber-400" />;
    }
  };

  const breadcrumbs = [
    { label: 'Settings', to: '/settings' },
    { label: 'Add Match List' }
  ];

  return (
    <UserLayout>
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left font-sans">
        <SettingsHeader
          title="Add Match List"
          description="Customize the matches and competitions list visible in your sports navigation stream."
          breadcrumbs={breadcrumbs}
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-[#131B2E] border border-[#1E293B] p-4 rounded-[12px] shadow-sm font-mono">
          <div className="relative flex-1">
            <input
              placeholder="Search matches or competitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 bg-[#090E17] border border-[#233252] rounded-[8px] text-xs font-bold text-slate-100 placeholder-slate-500 outline-none focus:border-orange-500 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <select
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
            className="h-9 px-3 bg-[#090E17] border border-[#233252] rounded-[8px] text-xs font-bold text-slate-100 outline-none cursor-pointer focus:border-orange-500 transition-colors"
          >
            <option value="ALL">All Sports</option>
            {sportsOptions.map((sport) => (
              <option key={sport} value={sport} className="bg-[#131B2E]">
                {sport}
              </option>
            ))}
          </select>
        </div>

        {/* Match List Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-[#131B2E] rounded-[12px] border border-[#1E293B]" />
            ))}
          </div>
        ) : filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
            {filteredMatches.map((match) => {
              const isAdded = match.status === 'ADDED';
              return (
                <div
                  key={match.id}
                  className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-5 flex flex-col justify-between shadow-md select-none"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#090E17] border border-[#233252] rounded-[8px] mt-0.5">
                        {getSportIcon(match.sportIcon)}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          {match.competition}
                        </span>
                        <h4 className="text-xs font-extrabold text-slate-100 uppercase tracking-wide mt-1">
                          {match.matchName}
                        </h4>
                        <span className="text-[10px] text-orange-400 font-bold mt-1.5 uppercase font-mono">
                          {match.date} • {match.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#1E293B] pt-3 mt-4">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      Status: {isAdded ? 'Active' : 'Hidden'}
                    </span>
                    <button
                      onClick={() => toggleMatchAdded(match.id)}
                      className={`
                        flex items-center gap-1.5 px-3.5 h-8 rounded-[8px] text-[10px] font-bold uppercase tracking-wider outline-none transition-all cursor-pointer shadow-sm
                        ${
                          isAdded
                            ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                            : 'bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white shadow-orange-950/40'
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
