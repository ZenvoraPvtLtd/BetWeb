import React, { useState, useEffect } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { SettingsToggle } from '../../components/settings/SettingsToggle';
import { useSettings } from '../../context/SettingsContext';
import { Search, ShieldAlert, Shield } from 'lucide-react';
import { EmptyReportState } from '../../components/reports/EmptyReportState';

export const BlockMarketsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sportFilter, setSportFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const { blockedMarkets, toggleMarketBlock } = useSettings();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSportFilter('ALL');
  };

  const sportsOptions = Array.from(new Set(blockedMarkets.map((m) => m.sport)));

  const filteredMarkets = blockedMarkets.filter((m) => {
    const matchesSearch =
      m.marketName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.competition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = sportFilter === 'ALL' || m.sport === sportFilter;
    return matchesSearch && matchesSport;
  });

  const breadcrumbs = [
    { label: 'Settings', to: '/settings' },
    { label: 'Block Markets' }
  ];

  return (
    <UserLayout>
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left font-sans">
        <SettingsHeader
          title="Block Markets"
          description="Manage which betting odds and bookmaker markets to hide from your exchange panels."
          breadcrumbs={breadcrumbs}
        />

        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-[#131B2E] border border-[#1E293B] p-4 rounded-[12px] shadow-sm font-mono">
          <div className="relative flex-1">
            <input
              placeholder="Search markets or leagues..."
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

        {/* Markets ledger list */}
        {isLoading ? (
          <div className="flex flex-col gap-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-[#131B2E] rounded-[12px] border border-[#1E293B]" />
            ))}
          </div>
        ) : filteredMarkets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
            {filteredMarkets.map((market) => {
              const isBlocked = market.status === 'BLOCKED';
              return (
                <div
                  key={market.id}
                  className={`
                    p-5 rounded-[12px] border flex items-center justify-between transition-colors shadow-md
                    ${
                      isBlocked
                        ? 'bg-[#131B2E]/50 border-rose-500/30'
                        : 'bg-[#131B2E] border-[#1E293B]'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {isBlocked ? (
                        <ShieldAlert className="w-5 h-5 text-rose-400" />
                      ) : (
                        <Shield className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                    <div className="flex flex-col text-left">
                      <h4 className={`text-xs font-extrabold uppercase tracking-wide ${isBlocked ? 'text-slate-500 line-through' : 'text-slate-100'}`}>
                        {market.marketName}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider font-mono">
                        {market.sport} • {market.competition}
                      </span>
                    </div>
                  </div>

                  <SettingsToggle
                    enabled={!isBlocked}
                    onToggle={() => toggleMarketBlock(market.id)}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyReportState
            title="No markets found"
            message="No markets match your query. Try resetting filters."
            onResetFilters={handleResetFilters}
          />
        )}
      </div>
    </UserLayout>
  );
};
export default BlockMarketsPage;
