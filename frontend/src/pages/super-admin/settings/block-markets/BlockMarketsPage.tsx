import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SuperAdminLayout } from '../../../../components/super-admin/SuperAdminLayout';
import { SportList } from '../../../../components/super-admin/settings/block-markets/SportList';

export const BlockMarketsPage: React.FC = () => {
  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left select-none animate-fadeIn">
        {/* Breadcrumb Path */}
        <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-5">
          <Link to="/admin/market-analysis" className="hover:text-zinc-955 transition-colors">
            Super Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-400">Settings</span>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-955">Block Markets</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-955 leading-none font-sans">
            Sports
          </h1>
          <p className="text-xs text-zinc-550 mt-1.5 leading-relaxed">
            Configure system market blockages, locks, and limits.
          </p>
        </div>

        {/* Sport Link List */}
        <SportList />
      </div>
    </SuperAdminLayout>
  );
};
