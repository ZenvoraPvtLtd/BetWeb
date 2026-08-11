import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ChevronRight, Settings } from 'lucide-react';
import { SuperAdminLayout } from '../../../components/super-admin/SuperAdminLayout';
import { settingsMenuConfig } from '../../../config/superAdmin/settingsMenu';

export const SettingsPage: React.FC = () => {
  const { settingsSlug } = useParams<{ settingsSlug: string }>();

  // Resolve matching settings item from config
  const item = settingsMenuConfig.find((s) => s.slug === settingsSlug);

  if (!item) {
    // Redirect unknown paths back to market dashboard
    return <Navigate to="/admin/market-analysis" replace />;
  }

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
          <span className="text-zinc-955">{item.label}</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-955 leading-none">
            {item.label}
          </h1>
          <p className="text-xs text-zinc-555 mt-1.5">
            Configure system parameters and operational settings for {item.label}.
          </p>
        </div>

        {/* Premium Placeholder Panel */}
        <div className="bg-white border border-zinc-200 rounded-[8px] p-8 shadow-sm flex flex-col items-center justify-center min-h-[320px] text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-50/60 flex items-center justify-center text-zinc-400 mb-4 border border-zinc-150">
            <Settings className="w-5 h-5 text-indigo-500 animate-pulse" />
          </div>
          <h2 className="text-sm font-semibold text-zinc-800">{item.label} Panel</h2>
          <p className="text-xs text-zinc-500 max-w-sm mt-1.5 leading-relaxed font-sans">
            {item.label} configuration will be implemented here. This environment is currently
            configured as a development workspace.
          </p>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
