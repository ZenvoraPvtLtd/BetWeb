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
import { mockCurrentBets } from '../../data/reports/currentBets';
import type { CurrentBetEntry } from '../../types/reports';
import type { DateOption } from '../../components/reports/DateRangeFilter';

export const CurrentBetsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('ALL');
  const [dateOption, setDateOption] = useState<DateOption>('7days');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<CurrentBetEntry | null>(null);

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
  }, [dateOption, fromDate, toDate, selectedSport]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSport('ALL');
    setDateOption('7days');
    setFromDate('');
    setToDate('');
  };

  const filteredData = mockCurrentBets.filter((item) => {
    const matchesSearch =
      item.matchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.selectionName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === 'ALL' || item.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  const rowsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const activeBets = mockCurrentBets.length;
  const totalStake = mockCurrentBets.reduce((sum, b) => sum + b.stake, 0);
  const totalExposure = mockCurrentBets.reduce((sum, b) => sum + b.exposure, 0);

  const summaryCards = [
    { label: 'Active Bets', value: activeBets, color: 'text-[#0EA5E9]' },
    { label: 'Total Exposure', value: `₹${totalExposure.toLocaleString()}`, color: 'text-amber-500' },
    { label: 'Total Stake Points', value: `₹${totalStake.toLocaleString()}`, color: 'text-white' }
  ];

  const columns: TableColumn<CurrentBetEntry>[] = [
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
    { header: 'Selection', key: 'selectionName', renderCell: (row) => <span className="font-bold text-zinc-300">{row.selectionName}</span> },
    {
      header: 'Type',
      key: 'type',
      renderCell: (row) => (
        <span
          className={`
            px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider
            ${
              row.type === 'BACK'
                ? 'bg-[#0EA5E9]/10 text-[#0EA5E9] border border-[#0EA5E9]/20'
                : 'bg-[#F43F5E]/10 text-[#F43F5E] border border-[#F43F5E]/20'
            }
          `}
        >
          {row.type}
        </span>
      )
    },
    { header: 'Odds', key: 'odds', renderCell: (row) => <span className="font-extrabold text-white">{row.odds}</span> },
    {
      header: 'Stake',
      key: 'stake',
      renderCell: (row) => <span className="text-[#0EA5E9] font-bold">₹{row.stake.toLocaleString()}</span>
    },
    {
      header: 'Exposure',
      key: 'exposure',
      renderCell: (row) => <span className="text-amber-500 font-bold">₹{row.exposure.toLocaleString()}</span>
    },
    { header: 'Placed At', key: 'placedAt', renderCell: (row) => <span className="text-zinc-450 font-medium text-[11px]">{row.placedAt}</span> },
    { header: 'Status', key: 'status', renderCell: (row) => <StatusBadge status={row.status} /> }
  ];

  const renderMobileCard = (row: CurrentBetEntry) => {
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
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Selection / Type</span>
            <span className="font-bold text-zinc-300">{row.selectionName} ({row.type})</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Odds / Stake</span>
            <span className="font-bold text-white">{row.odds} / <span className="text-[#0EA5E9]">₹{row.stake.toLocaleString()}</span></span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Exposure</span>
            <span className="text-amber-500 font-bold">₹{row.exposure.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  };

  const breadcrumbs = [
    { label: 'Reports', to: '/reports' },
    { label: 'Current Bets' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <ReportsHeader
          title="Current Active Bets"
          description="View currently open and unmatched bets on the exchange table listings."
          breadcrumbs={breadcrumbs}
        />

        {isLoading ? <SummaryCardSkeleton /> : <ReportSummaryCards cards={summaryCards} />}

        <ReportFilters
          searchQuery={searchQuery}
          onChangeSearchQuery={setSearchQuery}
          selectedStatus={selectedSport}
          onChangeStatus={setSelectedSport}
          statusOptions={['Cricket', 'Tennis']}
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
export default CurrentBetsPage;
