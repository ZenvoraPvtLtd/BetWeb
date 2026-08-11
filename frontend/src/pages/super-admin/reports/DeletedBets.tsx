import React, { useState, useEffect } from 'react';
import { ChevronRight, Trash2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SuperAdminLayout } from '../../../components/super-admin/SuperAdminLayout';
import { CurrentBetsFilters } from '../../../components/super-admin/reports/current-bets/CurrentBetsFilters';
import { DeletedBetsTable } from '../../../components/super-admin/reports/deleted-bets/DeletedBetsTable';
import { DeleteDeletedBetsDialog } from '../../../components/super-admin/reports/deleted-bets/DeleteDeletedBetsDialog';
import { AccountPagination } from '../../../components/super-admin/accounts/AccountPagination';
import { deletedBetsService } from '../../../services/super-admin/deletedBetsService';
import type { DeletedBetsFilters as Filters } from '../../../services/super-admin/deletedBetsService';
import type { DeletedBet } from '../../../mock/super-admin/deletedBets';

const PAGE_SIZE = 5;

export const DeletedBets: React.FC = () => {
  const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);
  const [bets, setBets] = useState<DeletedBet[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);

  // Auto clear notifications
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
      const data = await deletedBetsService.getDeletedBets(filters);
      setBets(data);
      setCurrentPage(1);
    } catch (err) {
      console.error('Failed to load deleted bets', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAppliedFilters(null);
    setBets([]);
    setSelectedIds([]);
    setCurrentPage(1);
    deletedBetsService.resetDatabase();
  };

  const handleDeleteClick = () => {
    if (selectedIds.length === 0) {
      setToastMessage({ text: 'Select at least one bet.', type: 'error' });
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleConfirmAction = () => {
    setToastMessage({
      text: `Action simulated successfully for ${selectedIds.length} bet(s).`,
      type: 'success',
    });
    setSelectedIds([]);
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
        {/* Alerts toast */}
        {toastMessage && (
          <div
            className={`
            fixed top-20 right-6 z-50 flex items-center gap-2 border text-xs font-semibold px-4 py-3 rounded-lg shadow-xl animate-slideRight
            ${
              toastMessage.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-zinc-900 border-zinc-800 text-white'
            }
          `}
          >
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 hover:opacity-80 cursor-pointer focus:outline-none"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Breadcrumb Path */}
        <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-5">
          <Link to="/admin/market-analysis" className="hover:text-zinc-950 transition-colors">
            Super Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-400">Reports</span>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-955">Deleted Bets</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-955 leading-none">
            Deleted Bet History
          </h1>
          <p className="text-xs text-zinc-550 mt-1.5">
            View details of cancelled, voided, or deleted bets from previous trading sessions.
          </p>
        </div>

        {/* Shared filters layout console */}
        <CurrentBetsFilters onApplyFilters={handleApplyFilters} onReset={handleReset} />

        {/* Action Toolbar */}
        {!isInitialState && bets.length > 0 && (
          <div className="flex items-center justify-between gap-4 mb-4 bg-zinc-50 border border-zinc-200/80 rounded-lg p-3">
            <span className="text-xs text-zinc-500 font-semibold">
              {selectedIds.length} of {bets.length} record(s) selected
            </span>
            <button
              onClick={handleDeleteClick}
              className={`
                h-[32px] px-3.5 rounded-[6px] border text-xs font-semibold flex items-center gap-1.5 transition-colors focus:outline-none cursor-pointer
                ${
                  selectedIds.length === 0
                    ? 'border-zinc-200 text-zinc-400 bg-zinc-50'
                    : 'border-zinc-300 text-zinc-800 bg-white hover:bg-zinc-50 active:brightness-95'
                }
              `}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        )}

        {/* Table Workspace */}
        <DeletedBetsTable
          bets={paginatedBets}
          isLoading={isLoading}
          emptyStateText={
            isInitialState
              ? 'No Result Found. Submit filters to view deleted bet logs.'
              : 'No Result Found.'
          }
          selectedIds={selectedIds}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
        />

        {/* Reusable pagination controls */}
        {!isInitialState && bets.length > 0 && (
          <AccountPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}

        {/* Confirmation dialog placeholder */}
        <DeleteDeletedBetsDialog
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirmAction}
          selectedCount={selectedIds.length}
        />
      </div>
    </SuperAdminLayout>
  );
};
