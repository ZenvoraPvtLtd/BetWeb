import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SuperAdminLayout } from '../../../components/super-admin/SuperAdminLayout';
import { GameReportFilters } from '../../../components/super-admin/reports/game-reports/GameReportFilters';
import { ProfitLossTable } from '../../../components/super-admin/reports/profit-loss/ProfitLossTable';
import { AccountPagination } from '../../../components/super-admin/accounts/AccountPagination';
import { profitLossService } from '../../../services/super-admin/profitLossService';
import type { ProfitLossFilters as Filters } from '../../../services/super-admin/profitLossService';
import type { ProfitLossRecord } from '../../../mock/super-admin/profitLoss';

const PAGE_SIZE = 5;

export const ProfitLoss: React.FC = () => {
  const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);
  const [records, setRecords] = useState<ProfitLossRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyFilters = async (filters: Filters) => {
    setIsLoading(true);
    setAppliedFilters(filters);

    try {
      const data = await profitLossService.getProfitLoss(filters);
      setRecords(data);
      setCurrentPage(1);
    } catch (err) {
      console.error('Failed to load profit/loss reports', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAppliedFilters(null);
    setRecords([]);
    setCurrentPage(1);
  };

  // Calculate pagination parameters
  const totalPages = Math.max(1, Math.ceil(records.length / PAGE_SIZE));
  const paginatedRecords = records.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const isInitialState = appliedFilters === null;

  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left select-none animate-fadeIn">
        {/* Breadcrumb path */}
        <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-5">
          <Link to="/admin/market-analysis" className="hover:text-zinc-955 transition-colors">
            Super Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-400">Reports</span>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-955">Profit And Loss</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-955 leading-none">
            Profit/Loss
          </h1>
          <p className="text-xs text-zinc-555 mt-1.5">
            View aggregated profit and loss statement ledgers grouped by game events.
          </p>
        </div>

        {/* Reused filter console */}
        <GameReportFilters onApplyFilters={handleApplyFilters} onReset={handleReset} />

        {/* Table Workspace */}
        <ProfitLossTable
          records={paginatedRecords}
          isLoading={isLoading}
          emptyStateText={
            isInitialState
              ? 'No Result Found. Submit filters to view profit/loss statements.'
              : 'No Result Found.'
          }
        />

        {/* Reusable pagination controls */}
        {!isInitialState && records.length > 0 && (
          <AccountPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </SuperAdminLayout>
  );
};
