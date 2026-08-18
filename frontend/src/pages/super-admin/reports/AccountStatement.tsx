import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SuperAdminLayout } from '../../../components/super-admin/SuperAdminLayout';
import { AccountStatementFilters } from '../../../components/super-admin/reports/account-statement/AccountStatementFilters';
import { AccountStatementTable } from '../../../components/super-admin/reports/account-statement/AccountStatementTable';
import { AccountPagination } from '../../../components/super-admin/accounts/AccountPagination';
import { accountStatementService } from '../../../services/super-admin/accountStatementService';
import type { AccountStatementFilters as Filters } from '../../../services/super-admin/accountStatementService';
import type { AccountStatement as Model } from '../../../mock/super-admin/accountStatements';

const PAGE_SIZE = 5;

export const AccountStatement: React.FC = () => {
  const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);
  const [statements, setStatements] = useState<Model[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyFilters = async (filters: Filters) => {
    setIsLoading(true);
    setAppliedFilters(filters);

    try {
      const data = await accountStatementService.getAccountStatements(filters);
      setStatements(data);
      setCurrentPage(1);
    } catch (err) {
      console.error('Failed to retrieve account statements', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setAppliedFilters(null);
    setStatements([]);
    setCurrentPage(1);
  };

  // Calculate pagination parameters
  const totalPages = Math.max(1, Math.ceil(statements.length / PAGE_SIZE));
  const paginatedStatements = statements.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const isInitialState = appliedFilters === null;

  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left select-none animate-fadeIn">
        {/* Breadcrumb path */}
        <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-5">
          <Link to="/admin/market-analysis" className="hover:text-orange-400 transition-colors">
            Super Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-500">Reports</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-orange-400">Account's Statement</span>
        </nav>

        {/* Page Titles */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 leading-none">
            Account Statements
          </h1>
          <p className="text-xs text-slate-400 mt-1.5">
            View transaction credit, debit logs, and rolling account statements.
          </p>
        </div>

        {/* Filter Selection Panel */}
        <AccountStatementFilters onApplyFilters={handleApplyFilters} onClear={handleClear} />

        {/* Table Workspace */}
        <AccountStatementTable
          statements={paginatedStatements}
          isLoading={isLoading}
          isInitialState={isInitialState}
          emptyStateText={
            isInitialState
              ? 'No statement records found. Try adjusting the user or date filters.'
              : 'No statement records found matching your selected filters.'
          }
        />

        {/* Reusable Pagination Controls */}
        {!isInitialState && statements.length > 0 && (
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
