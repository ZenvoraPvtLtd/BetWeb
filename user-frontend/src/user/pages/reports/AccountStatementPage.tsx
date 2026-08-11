import React, { useState, useEffect } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { ReportsHeader } from '../../components/reports/ReportsHeader';
import { ReportSummaryCards } from '../../components/reports/ReportSummaryCards';
import { ReportFilters } from '../../components/reports/ReportFilters';
import { DataTable } from '../../components/reports/DataTable';
import type { TableColumn } from '../../components/reports/DataTable';
import { Pagination } from '../../components/reports/Pagination';
import { ReportDetailDrawer } from '../../components/reports/ReportDetailDrawer';
import { EmptyReportState } from '../../components/reports/EmptyReportState';
import { ReportErrorState } from '../../components/reports/ReportErrorState';
import { ReportTableSkeleton } from '../../components/reports/ReportTableSkeleton';
import { SummaryCardSkeleton } from '../../components/reports/SummaryCardSkeleton';
import { mockAccountStatements, openingBalance, currentBalance } from '../../data/reports/accountStatements';
import type { AccountStatementEntry } from '../../types/reports';
import type { DateOption } from '../../components/reports/DateRangeFilter';

export const AccountStatementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [dateOption, setDateOption] = useState<DateOption>('7days');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<AccountStatementEntry | null>(null);

  const loadData = () => {
    setIsLoading(true);
    setIsError(false);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    loadData();
  }, [dateOption, fromDate, toDate, selectedType]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('ALL');
    setDateOption('7days');
    setFromDate('');
    setToDate('');
  };

  const filteredData = mockAccountStatements.filter((item) => {
    const matchesSearch = item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'ALL' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const rowsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalCredits = mockAccountStatements
    .filter((tx) => tx.credit !== undefined)
    .reduce((sum, tx) => sum + (tx.credit || 0), 0);

  const totalDebits = mockAccountStatements
    .filter((tx) => tx.debit !== undefined)
    .reduce((sum, tx) => sum + (tx.debit || 0), 0);

  const summaryCards = [
    { label: 'Opening Balance', value: `₹${openingBalance.toLocaleString()}` },
    { label: 'Total Credits', value: `₹${totalCredits.toLocaleString()}`, color: 'text-emerald-400' },
    { label: 'Total Debits', value: `₹${totalDebits.toLocaleString()}`, color: 'text-[#F43F5E]' },
    { label: 'Current Balance', value: `₹${currentBalance.toLocaleString()}`, color: 'text-white' }
  ];

  const columns: TableColumn<AccountStatementEntry>[] = [
    { header: 'Date/Time', key: 'date', renderCell: (row) => <span className="text-zinc-450 font-medium text-[11px]">{row.date}</span> },
    { header: 'Description', key: 'description', renderCell: (row) => <span className="text-white font-extrabold text-left block">{row.description}</span> },
    {
      header: 'Type',
      key: 'type',
      renderCell: (row) => (
        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-400">
          {row.type}
        </span>
      )
    },
    {
      header: 'Credit (+)',
      key: 'credit',
      renderCell: (row) => {
        if (row.credit === undefined) return <span className="text-zinc-650">--</span>;
        return <span className="text-[#22C55E] font-extrabold">+₹{row.credit.toLocaleString()}</span>;
      }
    },
    {
      header: 'Debit (-)',
      key: 'debit',
      renderCell: (row) => {
        if (row.debit === undefined) return <span className="text-zinc-650">--</span>;
        return <span className="text-[#F43F5E] font-extrabold">-₹{row.debit.toLocaleString()}</span>;
      }
    },
    {
      header: 'Running Balance',
      key: 'balance',
      renderCell: (row) => <span className="text-emerald-400 font-bold">₹{row.balance.toLocaleString()}</span>
    }
  ];

  const renderMobileCard = (row: AccountStatementEntry) => {
    return (
      <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-4 flex flex-col gap-3 text-left text-xs">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
          <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest">#{row.id}</span>
          <button
            onClick={() => setSelectedRow(row)}
            className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-wider outline-none"
          >
            Details
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Description</span>
            <span className="font-extrabold text-white text-right max-w-[180px]">{row.description}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Type / Date</span>
            <span className="font-semibold text-zinc-400">{row.type} | {row.date}</span>
          </div>
          {row.credit !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Amount</span>
              <span className="text-[#22C55E] font-extrabold">+₹{row.credit.toLocaleString()}</span>
            </div>
          )}
          {row.debit !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Amount</span>
              <span className="text-[#F43F5E] font-extrabold">-₹{row.debit.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Balance</span>
            <span className="text-emerald-400 font-bold">₹{row.balance.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  };

  const breadcrumbs = [
    { label: 'Reports', to: '/reports' },
    { label: 'Account Statement' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <ReportsHeader
          title="Account Statement"
          description="Statement details ledger containing credit and debit settlement adjustments."
          breadcrumbs={breadcrumbs}
        />

        {isLoading ? <SummaryCardSkeleton /> : <ReportSummaryCards cards={summaryCards} />}

        <ReportFilters
          searchQuery={searchQuery}
          onChangeSearchQuery={setSearchQuery}
          selectedType={selectedType}
          onChangeType={setSelectedType}
          typeOptions={['Bet', 'Win', 'Loss', 'Settlement', 'Adjustment']}
          selectedDateOption={dateOption}
          onChangeDateOption={setDateOption}
          fromDate={fromDate}
          toDate={toDate}
          onChangeFromDate={setFromDate}
          onChangeToDate={setToDate}
          onReset={handleResetFilters}
          onRefresh={loadData}
        />

        {isError ? (
          <ReportErrorState onRetry={loadData} />
        ) : isLoading ? (
          <ReportTableSkeleton />
        ) : paginatedData.length > 0 ? (
          <>
            <DataTable
              columns={columns}
              data={paginatedData}
              onViewDetails={setSelectedRow}
              renderMobileCard={renderMobileCard}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <EmptyReportState onResetFilters={handleResetFilters} />
        )}

        <ReportDetailDrawer
          isOpen={selectedRow !== null}
          onClose={() => setSelectedRow(null)}
          data={selectedRow}
        />
      </div>
    </UserLayout>
  );
};
export default AccountStatementPage;
