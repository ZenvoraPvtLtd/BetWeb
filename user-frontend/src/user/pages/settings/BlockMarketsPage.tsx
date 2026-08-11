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
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <SettingsHeader
          title="Block Markets"
          description="Manage which betting odds and bookmaker markets to hide from your exchange panels."
          breadcrumbs={breadcrumbs}
        />

        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-zinc-950/20 border border-zinc-900 p-4 rounded-[12px]">
          <div className="relative flex-1">
            <input
              placeholder="Search markets or leagues..."
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

        {/* Markets ledger list */}
        {isLoading ? (
          <div className="flex flex-col gap-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-[#111F30] rounded-[12px] border border-slate-700/10" />
            ))}
          </div>
        ) : filteredMarkets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMarkets.map((market) => {
              const isBlocked = market.status === 'BLOCKED';
              return (
                <div
                  key={market.id}
                  className={`
                    p-5 rounded-[12px] border flex items-center justify-between transition-colors
                    ${
                      isBlocked
                        ? 'bg-zinc-950/15 border-rose-500/20'
                        : 'bg-[#111F30] border-slate-700/15'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {isBlocked ? (
                        <ShieldAlert className="w-5 h-5 text-[#F43F5E]" />
                      ) : (
                        <Shield className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                    <div className="flex flex-col text-left">
                      <h4 className={`text-xs font-extrabold uppercase tracking-wide ${isBlocked ? 'text-zinc-500 line-through' : 'text-white'}`}>
                        {market.marketName}
                      </h4>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase mt-1 tracking-wider">
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
