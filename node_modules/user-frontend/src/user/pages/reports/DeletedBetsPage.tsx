import React, { useState, useEffect } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { ReportsHeader } from '../../components/reports/ReportsHeader';
import { ReportSummaryCards } from '../../components/reports/ReportSummaryCards';
import { ReportFilters } from '../../components/reports/ReportFilters';
import { DataTable } from '../../components/reports/DataTable';
import type { TableColumn } from '../../components/reports/DataTable';
import { StatusBadge } from '../../components/reports/StatusBadge';
import { Pagination } from '../../components/reports/Pagination';
import { ReportDetailDrawer } from '../../components/reports/ReportDetailDrawer';
import { EmptyReportState } from '../../components/reports/EmptyReportState';
import { ReportErrorState } from '../../components/reports/ReportErrorState';
import { ReportTableSkeleton } from '../../components/reports/ReportTableSkeleton';
import { SummaryCardSkeleton } from '../../components/reports/SummaryCardSkeleton';
import { mockDeletedBets } from '../../data/reports/deletedBets';
import type { DeletedBetEntry } from '../../types/reports';
import type { DateOption } from '../../components/reports/DateRangeFilter';

export const DeletedBetsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateOption, setDateOption] = useState<DateOption>('7days');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<DeletedBetEntry | null>(null);

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
  }, [dateOption, fromDate, toDate]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setDateOption('7days');
    setFromDate('');
    setToDate('');
  };

  const filteredData = mockDeletedBets.filter((item) => {
    const matchesSearch =
      item.matchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.selectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const rowsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const summaryCards = [
    { label: 'Total Cancelled Bets', value: mockDeletedBets.length, color: 'text-zinc-400' }
  ];

  const columns: TableColumn<DeletedBetEntry>[] = [
    {
      header: 'Match / Game',
      key: 'matchName',
      renderCell: (row) => (
        <div className="flex flex-col text-left">
          <span className="text-white font-extrabold">{row.matchName}</span>
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">{row.marketName}</span>
        </div>
      )
    },
    { header: 'Selection', key: 'selectionName', renderCell: (row) => <span className="font-bold text-zinc-350">{row.selectionName}</span> },
    { header: 'Odds', key: 'odds', renderCell: (row) => <span className="font-bold text-zinc-400">{row.odds}</span> },
    {
      header: 'Stake',
      key: 'stake',
      renderCell: (row) => <span className="text-[#0EA5E9] font-bold">₹{row.stake.toLocaleString()}</span>
    },
    { header: 'Deleted By', key: 'deletedBy', renderCell: (row) => <span className="text-rose-400 font-bold text-[10px] uppercase tracking-wider">{row.deletedBy}</span> },
    { header: 'Deleted Reason', key: 'reason', renderCell: (row) => <span className="text-zinc-500 font-semibold text-left block text-[11px] max-w-[150px] truncate">{row.reason}</span> },
    { header: 'Deleted At', key: 'deletedAt', renderCell: (row) => <span className="text-zinc-500 font-medium text-[11px]">{row.deletedAt}</span> },
    { header: 'Status', key: 'status', renderCell: (row) => <StatusBadge status={row.status} /> }
  ];

  const renderMobileCard = (row: DeletedBetEntry) => {
    return (
      <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-4 flex flex-col gap-3 text-left text-xs">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest">#{row.id}</span>
            <StatusBadge status={row.status} />
          </div>
          <button
            onClick={() => setSelectedRow(row)}
            className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-wider outline-none"
          >
            Details
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Match</span>
            <span className="font-extrabold text-white text-right">{row.matchName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Selection</span>
            <span className="font-bold text-zinc-300">{row.selectionName} ({row.odds})</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Cancel Audit</span>
            <span className="font-bold text-rose-400 uppercase text-[9px]">{row.deletedBy} on {row.deletedAt}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Reason</span>
            <span className="text-zinc-500 font-semibold leading-relaxed text-[11px]">{row.reason}</span>
          </div>
        </div>
      </div>
    );
  };

  const breadcrumbs = [
    { label: 'Reports', to: '/reports' },
    { label: 'Deleted Bets' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <ReportsHeader
          title="Cancelled Bets History"
          description="Log of cancelled and deleted mock trades with system audits and abandonment reasons."
          breadcrumbs={breadcrumbs}
        />

        {isLoading ? <SummaryCardSkeleton /> : <ReportSummaryCards cards={summaryCards} />}

        <ReportFilters
          searchQuery={searchQuery}
          onChangeSearchQuery={setSearchQuery}
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
export default DeletedBetsPage;
