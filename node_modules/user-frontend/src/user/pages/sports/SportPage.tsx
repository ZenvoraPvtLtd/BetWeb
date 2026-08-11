import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { Breadcrumbs } from '../../components/user/layout/Breadcrumbs';
import { LiveMatches } from '../../components/user/matches/LiveMatches';
import { UpcomingMatches } from '../../components/user/matches/UpcomingMatches';
import { BetSlip } from '../../components/user/betslip/BetSlip';
import { SportNotFound } from '../../components/user/feedback/ErrorStates';
import { userMatches } from '../../data/matches';
import { userSports } from '../../data/sports';

export const SportPage: React.FC = () => {
  const { sportSlug } = useParams<{ sportSlug: string }>();
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'upcoming'>('all');

  const sportInfo = userSports.find(
    (s) => s.id === sportSlug || s.name.toLowerCase().replace(' ', '-') === sportSlug
  );

  if (!sportInfo) {
    return (
      <UserLayout>
        <div className="p-6">
          <SportNotFound />
        </div>
      </UserLayout>
    );
  }

  // Filter matches matching this sport name
  const filteredMatches = userMatches.filter(
    (m) => m.sport.toLowerCase().replace(' ', '') === sportInfo.name.toLowerCase().replace(' ', '')
  );

  const liveMatches = filteredMatches.filter((m) => m.isLive);
  const upcomingMatches = filteredMatches.filter((m) => !m.isLive);

  const displayMatches = () => {
    switch (activeTab) {
      case 'live':
        return <LiveMatches matches={liveMatches} />;
      case 'upcoming':
        return <UpcomingMatches matches={upcomingMatches} />;
      default:
        return (
          <div className="flex flex-col gap-6">
            <LiveMatches matches={liveMatches} />
            <UpcomingMatches matches={upcomingMatches} />
          </div>
        );
    }
  };

  const breadcrumbItems = [
    { label: 'Sports', to: '/home' },
    { label: sportInfo.name }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Dynamic header title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none pb-4 border-b border-zinc-900">
          <div>
            <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
              {sportInfo.name} Exchange
            </h2>
            <p className="text-xs text-zinc-400 mt-1 font-semibold">
              Live odds and back/lay trading points on major events.
            </p>
          </div>

          {/* Quick Filter tabs */}
          <div className="flex bg-[#111F30] border border-slate-700/10 rounded-[8px] p-1 self-start sm:self-auto">
            {(['all', 'live', 'upcoming'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-4 py-1.5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider outline-none cursor-pointer transition-all
                  ${
                    activeTab === tab
                      ? 'bg-[#0EA5E9] text-white shadow'
                      : 'text-[#94A3B8] hover:text-white'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* View Grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6">{displayMatches()}</div>
          <BetSlip />
        </div>
      </div>
    </UserLayout>
  );
};
export default SportPage;
