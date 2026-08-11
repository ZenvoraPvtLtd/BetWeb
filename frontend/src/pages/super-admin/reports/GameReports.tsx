import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SuperAdminLayout } from '../../../components/super-admin/SuperAdminLayout';
import { GameReportFilters } from '../../../components/super-admin/reports/game-reports/GameReportFilters';
import { GameReportsTable } from '../../../components/super-admin/reports/game-reports/GameReportsTable';
import { AccountPagination } from '../../../components/super-admin/accounts/AccountPagination';
import { gameReportsService } from '../../../services/super-admin/gameReportsService';
import type { GameReportFilters as Filters } from '../../../services/super-admin/gameReportsService';
import type { GameReport } from '../../../mock/super-admin/gameReports';

const PAGE_SIZE = 5;

export const GameReports: React.FC = () => {
  const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);
  const [reports, setReports] = useState<GameReport[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyFilters = async (filters: Filters) => {
    setIsLoading(true);
    setAppliedFilters(filters);

    try {
      const data = await gameReportsService.getGameReports(filters);
      setReports(data);
      setCurrentPage(1);
    } catch (err) {
      console.error('Failed to load game reports', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAppliedFilters(null);
    setReports([]);
    setCurrentPage(1);
  };

  // Calculate pagination parameters
  const totalPages = Math.max(1, Math.ceil(reports.length / PAGE_SIZE));
  const paginatedReports = reports.slice(
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
          <span className="text-zinc-955">Game Reports</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-955 leading-none">
            Game Reports
          </h1>
          <p className="text-xs text-zinc-550 mt-1.5">
            Summarized ledger exposure amounts grouped by game titles and betting channels.
          </p>
        </div>

        {/* Filter Selection Panel */}
        <GameReportFilters onApplyFilters={handleApplyFilters} onReset={handleReset} />

        {/* Table Workspace */}
        <GameReportsTable
          reports={paginatedReports}
          isLoading={isLoading}
          emptyStateText={
            isInitialState
              ? 'No Result Found. Submit filters to view game report statements.'
              : 'No Result Found.'
          }
        />

        {/* Reusable pagination controls */}
        {!isInitialState && reports.length > 0 && (
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
