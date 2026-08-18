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
import { mockMyBets } from '../../data/reports/myBets';
import type { BetReportEntry } from '../../types/reports';
import type { DateOption } from '../../components/reports/DateRangeFilter';

export const MyBetsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [dateOption, setDateOption] = useState<DateOption>('7days');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<BetReportEntry | null>(null);

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
  }, [dateOption, fromDate, toDate, selectedStatus]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('ALL');
    setDateOption('7days');
    setFromDate('');
    setToDate('');
  };

  const filteredData = mockMyBets.filter((item) => {
    const matchesSearch =
      item.matchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.selectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.marketName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const rowsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalBets = mockMyBets.length;
  const openBets = mockMyBets.filter((b) => b.status === 'OPEN').length;
  const settledBets = mockMyBets.filter((b) => b.status !== 'OPEN' && b.status !== 'CANCELLED').length;

  const summaryCards = [
    { label: 'Total Bets', value: totalBets },
    { label: 'Open Bets', value: openBets, color: 'text-orange-400' },
    { label: 'Settled Bets', value: settledBets, color: 'text-emerald-400' }
  ];

  const columns: TableColumn<BetReportEntry>[] = [
    {
      header: 'Match/Game',
      key: 'matchName',
      renderCell: (row) => (
        <div className="flex flex-col text-left font-mono">
          <span className="text-slate-100 font-extrabold">{row.matchName}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{row.marketName}</span>
        </div>
      )
    },
    { header: 'Selection', key: 'selectionName', renderCell: (row) => <span className="font-bold text-slate-200 font-mono">{row.selectionName}</span> },
    {
      header: 'Type',
      key: 'type',
      renderCell: (row) => (
        <span
          className={`
            px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider font-mono
            ${
              row.type === 'BACK'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
            }
          `}
        >
          {row.type}
        </span>
      )
    },
    { header: 'Odds', key: 'odds', renderCell: (row) => <span className="font-extrabold text-amber-400 font-mono">{row.odds}</span> },
    {
      header: 'Stake',
      key: 'stake',
      renderCell: (row) => <span className="text-orange-400 font-bold font-mono">₹{row.stake.toLocaleString()}</span>
    },
    {
      header: 'P/L',
      key: 'profitLoss',
      renderCell: (row) => {
        if (row.profitLoss === undefined) return <span className="text-slate-500">--</span>;
        const isPositive = row.profitLoss >= 0;
        return (
          <span className={`font-extrabold font-mono ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isPositive ? '+' : ''}₹{row.profitLoss.toLocaleString()}
          </span>
        );
      }
    },
    { header: 'Placed At', key: 'placedAt', renderCell: (row) => <span className="text-slate-400 text-[11px] font-medium font-mono">{row.placedAt}</span> },
    {
      header: 'Status',
      key: 'status',
      renderCell: (row) => <StatusBadge status={row.status} />
    }
  ];

  const renderMobileCard = (row: BetReportEntry) => {
    return (
      <div className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-4 flex flex-col gap-3 text-left text-xs shadow-md font-mono">
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">#{row.id}</span>
            <StatusBadge status={row.status} />
          </div>
          <button
            onClick={() => setSelectedRow(row)}
            className="text-[10px] font-bold text-orange-400 hover:text-orange-300 uppercase tracking-wider outline-none"
          >
            Details
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Fixture</span>
            <div className="text-right">
              <span className="font-extrabold text-slate-100 block">{row.matchName}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">{row.marketName}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Selection</span>
            <span className="font-bold text-slate-200">{row.selectionName} ({row.type})</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Odds / Stake</span>
            <span className="font-bold text-slate-100">{row.odds} / <span className="text-orange-400">₹{row.stake.toLocaleString()}</span></span>
          </div>
          {row.profitLoss !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">P/L</span>
              <span className={`font-extrabold ${row.profitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {row.profitLoss >= 0 ? '+' : ''}₹{row.profitLoss.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const breadcrumbs = [
    { label: 'Reports', to: '/reports' },
    { label: 'My Bets' }
  ];

  return (
    <UserLayout>
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left font-sans">
        <ReportsHeader
          title="My Betting Activity"
          description="Log of settled and active bets with filters for status, date range, and text search."
          breadcrumbs={breadcrumbs}
        />

        {isLoading ? <SummaryCardSkeleton /> : <ReportSummaryCards cards={summaryCards} />}

        <ReportFilters
          searchQuery={searchQuery}
          onChangeSearchQuery={setSearchQuery}
          selectedStatus={selectedStatus}
          onChangeStatus={setSelectedStatus}
          statusOptions={['OPEN', 'WON', 'LOST', 'CANCELLED']}
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
export default MyBetsPage;
