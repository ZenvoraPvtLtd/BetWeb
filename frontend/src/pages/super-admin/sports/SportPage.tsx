import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { sportsConfig } from '../../../config/sports';
import { SuperAdminLayout } from '../../../components/super-admin/SuperAdminLayout';
import { SportBreadcrumb } from '../../../components/super-admin/sports/SportBreadcrumb';

export const SportPage: React.FC = () => {
  const { sportSlug } = useParams<{ sportSlug: string }>();

  // Find the sport definition matching the slug param
  const sport = sportsConfig.find((s) => s.slug === sportSlug);

  if (!sport) {
    return <Navigate to="/admin/market-analysis" replace />;
  }

  const Icon = sport.icon;

  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left select-none animate-fadeIn">
        {/* Dynamic Breadcrumb Route */}
        <SportBreadcrumb sportName={sport.name} />

        {/* Reusable Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500/15 flex items-center justify-center border border-orange-500/30">
            <Icon className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 leading-none">
              {sport.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1.5">
              Live odds, card books, and limit configurations for {sport.name}.
            </p>
          </div>
        </div>

        {/* Workspace Card */}
        <div className="flex flex-col items-center justify-center min-h-[350px] text-center p-6 md:p-8 bg-[#131B2E] border border-[#233252] rounded-[12px] shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/30 mb-5">
            <Icon className="w-6 h-6 text-orange-400" />
          </div>

          <h2 className="text-base font-bold text-slate-100 mb-1.5">
            {sport.name} Markets Panel
          </h2>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-sm">
            Market and event management for {sport.name} will appear here. Full configuration options are pending visual layout specifications.
          </p>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
