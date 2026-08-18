import React, { useState, useEffect } from 'react';
import { ChevronRight, Trash2, CheckCircle2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SuperAdminLayout } from '../../../components/super-admin/SuperAdminLayout';
import { CurrentBetsFilters } from '../../../components/super-admin/reports/current-bets/CurrentBetsFilters';
import { CurrentBetsTable } from '../../../components/super-admin/reports/current-bets/CurrentBetsTable';
import { DeleteBetsDialog } from '../../../components/super-admin/reports/current-bets/DeleteBetsDialog';
import { AccountPagination } from '../../../components/super-admin/accounts/AccountPagination';
import { currentBetsService } from '../../../services/super-admin/currentBetsService';
import type { CurrentBetsFilters as Filters } from '../../../services/super-admin/currentBetsService';
import type { CurrentBet } from '../../../mock/super-admin/currentBets';

const PAGE_SIZE = 5;

export const CurrentBets: React.FC = () => {
  const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);
  const [bets, setBets] = useState<CurrentBet[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Clear toast notifications automatically
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleApplyFilters = async (filters: Filters) => {
    setIsLoading(true);
    setAppliedFilters(filters);
    setSelectedIds([]);

    try {
      const data = await currentBetsService.getCurrentBets(filters);
      setBets(data);
      setCurrentPage(1);
    } catch (err) {
      console.error('Failed to load unsettled bets', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAppliedFilters(null);
    setBets([]);
    setSelectedIds([]);
    setCurrentPage(1);
    currentBetsService.resetDatabase();
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      const count = selectedIds.length;
      await currentBetsService.deleteCurrentBets(selectedIds);
      setToastMessage(`Successfully deleted ${count} selected bet(s).`);

      // Retrieve updated record list
      const data = await currentBetsService.getCurrentBets(appliedFilters || {});
      setBets(data);
      setSelectedIds([]);
      setCurrentPage(1);
    } catch (err) {
      console.error('Failed to delete bets', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate pagination parameters
  const totalPages = Math.max(1, Math.ceil(bets.length / PAGE_SIZE));
  const paginatedBets = bets.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const visibleIds = paginatedBets.map((b) => b.id);

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => {
        const merged = [...prev];
        visibleIds.forEach((id) => {
          if (!merged.includes(id)) merged.push(id);
        });
        return merged;
      });
    } else {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    }
  };

  const isInitialState = appliedFilters === null;

  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left select-none relative animate-fadeIn">
        {/* Success Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 flex items-center gap-2 bg-[#131B2E] border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-4 py-3 rounded-lg shadow-2xl animate-slideRight backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Breadcrumb Path */}
        <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-5">
          <Link to="/admin/market-analysis" className="hover:text-orange-400 transition-colors">
            Super Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-500">Reports</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-orange-400">Current Bets</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 leading-none">
            Unsettled Bet History
          </h1>
          <p className="text-xs text-slate-400 mt-1.5">
            Monitor active matching exposure, odds rates, and delete unmatched or erroneous bet records.
          </p>
        </div>

        {/* Filter Selection Panel */}
        <CurrentBetsFilters onApplyFilters={handleApplyFilters} onReset={handleReset} />

        {/* Selection Count and Bulk Delete Action Toolbar */}
        {!isInitialState && bets.length > 0 && (
          <div className="flex items-center justify-between gap-4 mb-4 bg-[#131B2E] border border-[#1E293B] rounded-[10px] p-3 shadow-md">
            <span className="text-xs text-slate-300 font-semibold">
              <span className="text-orange-400">{selectedIds.length}</span> of {bets.length} record(s) selected
            </span>
            <button
              onClick={() => setIsDeleteOpen(true)}
              disabled={selectedIds.length === 0}
              className={`
                h-[32px] px-3.5 rounded-[8px] border text-xs font-semibold flex items-center gap-1.5 transition-colors focus:outline-none shadow-sm
                ${
                  selectedIds.length === 0
                    ? 'border-[#233252] text-slate-500 bg-[#0E1524] cursor-not-allowed'
                    : 'border-red-500/40 text-red-400 bg-red-950/40 hover:bg-red-900/50 hover:text-red-300 cursor-pointer active:scale-95'
                }
              `}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Selected</span>
            </button>
          </div>
        )}

        {/* Table Workspace */}
        <CurrentBetsTable
          bets={paginatedBets}
          isLoading={isLoading}
          emptyStateText={
            isInitialState
              ? 'No Result Found. Submit filters to view unsettled bet logs.'
              : 'No Result Found.'
          }
          selectedIds={selectedIds}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
        />

        {/* Pagination Bar */}
        {!isInitialState && bets.length > 0 && (
          <AccountPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}

        {/* Delete Confirmation Modal */}
        <DeleteBetsDialog
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
          selectedCount={selectedIds.length}
        />
      </div>
    </SuperAdminLayout>
  );
};
