import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ChevronRight, Gamepad2 } from 'lucide-react';
import { SuperAdminLayout } from '../../../components/super-admin/SuperAdminLayout';
import { liveCasinoGames } from '../../../config/liveCasinoGames';

export const LiveCasinoGamePage: React.FC = () => {
  const { gameSlug } = useParams<{ gameSlug: string }>();

  // Resolve matching game metadata from dynamic slug config
  const game = liveCasinoGames.find((g) => g.slug === gameSlug);

  if (!game) {
    return <Navigate to="/admin/market-analysis" replace />;
  }

  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left select-none animate-fadeIn">
        {/* Breadcrumb Path */}
        <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-5">
          <Link to="/admin/market-analysis" className="hover:text-orange-400 transition-colors">
            Super Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-500">Live Casino</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-orange-400">{game.label}</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 leading-none">
            {game.label}
          </h1>
          <p className="text-xs text-slate-400 mt-1.5">
            Operational dashboard and betting ledger for Live Casino rooms.
          </p>
        </div>

        {/* Placeholder Card */}
        <div className="bg-[#131B2E] border border-[#233252] rounded-[12px] p-8 shadow-2xl flex flex-col items-center justify-center min-h-[320px] text-center">
          <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4 border border-orange-500/30">
            <Gamepad2 className="w-6 h-6 text-orange-400 animate-pulse" />
          </div>
          <h2 className="text-sm font-bold text-slate-100">{game.label} Game Deck</h2>
          <p className="text-xs text-slate-400 max-w-sm mt-1.5 leading-relaxed font-sans">
            Live Casino game content will be implemented here. This room is currently configured as a
            development workspace.
          </p>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
