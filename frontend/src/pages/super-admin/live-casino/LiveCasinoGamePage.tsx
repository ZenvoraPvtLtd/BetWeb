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
    // Redirect unknown game path parameters back to dashboard
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
          <span className="text-zinc-400">Live Casino</span>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-950">{game.label}</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-955 leading-none">
            {game.label}
          </h1>
          <p className="text-xs text-zinc-550 mt-1.5">
            Operational dashboard and betting ledger for Live Casino rooms.
          </p>
        </div>

        {/* Premium Placeholder Card */}
        <div className="bg-white border border-zinc-200 rounded-[8px] p-8 shadow-sm flex flex-col items-center justify-center min-h-[320px] text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-50/60 flex items-center justify-center text-zinc-400 mb-4 border border-zinc-150">
            <Gamepad2 className="w-5 h-5 text-indigo-500 animate-pulse" />
          </div>
          <h2 className="text-sm font-semibold text-zinc-800">{game.label} Game Deck</h2>
          <p className="text-xs text-zinc-500 max-w-sm mt-1.5 leading-relaxed font-sans">
            Live Casino game content will be implemented here. This room is currently configured as a
            development workspace.
          </p>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
