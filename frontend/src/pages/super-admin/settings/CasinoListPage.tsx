import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SuperAdminLayout } from '../../../components/super-admin/SuperAdminLayout';
import { CasinoListTable } from '../../../components/super-admin/settings/casino-list/CasinoListTable';
import { casinoListService } from '../../../services/settings/casinoListService';
import type { CasinoListItem } from '../../../config/superAdmin/casinoList';

export const CasinoListPage: React.FC = () => {
  const [casinos, setCasinos] = useState<CasinoListItem[]>([]);

  useEffect(() => {
    const loadCasinos = async () => {
      try {
        const data = await casinoListService.getCasinos();
        setCasinos(data);
      } catch (err) {
        console.error('Failed to load system casino list', err);
      }
    };
    loadCasinos();
  }, []);

  const handleToggleEnabled = async (id: string, enabled: boolean) => {
    // Immediately update local UI state
    setCasinos((prev) => prev.map((c) => (c.id === id ? { ...c, enabled } : c)));

    try {
      // Persist to service layer
      await casinoListService.updateCasinoEnabled(id, enabled);
    } catch (err) {
      console.error('Failed to update casino active state', err);
      // Revert if service call fails
      setCasinos((prev) => prev.map((c) => (c.id === id ? { ...c, enabled: !enabled } : c)));
    }
  };

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
          <span className="text-zinc-955">Casino List</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-955 leading-none">
            Casino List
          </h1>
          <p className="text-xs text-zinc-555 mt-1.5 leading-relaxed">
            Manage operational active status of live casino tables and slot rooms.
          </p>
        </div>

        {/* Table Viewport */}
        <CasinoListTable casinos={casinos} onToggleEnabled={handleToggleEnabled} />
      </div>
    </SuperAdminLayout>
  );
};
