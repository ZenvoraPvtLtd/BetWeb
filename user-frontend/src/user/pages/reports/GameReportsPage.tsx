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
import { mockGameReports } from '../../data/reports/gameReports';
import type { GameReportEntry } from '../../types/reports';
import type { DateOption } from '../../components/reports/DateRangeFilter';

export const GameReportsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [dateOption, setDateOption] = useState<DateOption>('7days');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<GameReportEntry | null>(null);

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
  }, [dateOption, fromDate, toDate, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setDateOption('7days');
    setFromDate('');
    setToDate('');
  };

  const filteredData = mockGameReports.filter((item) => {
    const matchesSearch = item.gameName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || item.sportCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const rowsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalGames = mockGameReports.length;
  const totalBets = mockGameReports.reduce((sum, g) => sum + g.betsCount, 0);
  const totalStake = mockGameReports.reduce((sum, g) => sum + g.stake, 0);
  const totalPL = mockGameReports.reduce((sum, g) => sum + g.profitLoss, 0);

  const summaryCards = [
    { label: 'Total Games Played', value: totalGames },
    { label: 'Total Placed Bets', value: totalBets },
    { label: 'Total Staked Points', value: `₹${totalStake.toLocaleString()}` },
    {
      label: 'Total Net P/L',
      value: `${totalPL >= 0 ? '+' : ''}₹${totalPL.toLocaleString()}`,
      color: totalPL >= 0 ? 'text-[#22C55E]' : 'text-[#F43F5E]'
    }
  ];

  const columns: TableColumn<GameReportEntry>[] = [
    {
      header: 'Game Name',
      key: 'gameName',
      renderCell: (row) => (
        <div className="flex flex-col text-left">
          <span className="text-white font-extrabold">{row.gameName}</span>
          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">{row.sportCategory}</span>
        </div>
      )
    },
    { header: 'Round / Session', key: 'roundId', renderCell: (row) => <span className="font-semibold text-zinc-400">{row.roundId}</span> },
    { header: 'Placed Bets', key: 'betsCount', renderCell: (row) => <span className="font-bold text-white">{row.betsCount}</span> },
    {
      header: 'Stake',
      key: 'stake',
      renderCell: (row) => <span className="text-[#0EA5E9] font-bold">₹{row.stake.toLocaleString()}</span>
    },
    { header: 'Outcome Result', key: 'result', renderCell: (row) => <span className="text-zinc-300 font-bold text-left block text-[11px] max-w-[150px] truncate">{row.result}</span> },
    {
      header: 'P/L',
      key: 'profitLoss',
      renderCell: (row) => {
        const isPositive = row.profitLoss >= 0;
        return (
          <span className={`font-extrabold ${isPositive ? 'text-[#22C55E]' : 'text-[#F43F5E]'}`}>
            {isPositive ? '+' : ''}₹{row.profitLoss.toLocaleString()}
          </span>
        );
      }
    },
    { header: 'Time Date', key: 'date', renderCell: (row) => <span className="text-zinc-500 text-[11px] font-medium">{row.date}</span> },
    { header: 'Status', key: 'status', renderCell: (row) => <StatusBadge status={row.status} /> }
  ];

  const renderMobileCard = (row: GameReportEntry) => {
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
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Game</span>
            <span className="font-extrabold text-white">{row.gameName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Round ID</span>
            <span className="font-semibold text-zinc-400">{row.roundId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Bets / Stake</span>
            <span className="font-bold text-white">{row.betsCount} / <span className="text-[#0EA5E9]">₹{row.stake.toLocaleString()}</span></span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">P/L</span>
            <span className={`font-extrabold ${row.profitLoss >= 0 ? 'text-[#22C55E]' : 'text-[#F43F5E]'}`}>
              {row.profitLoss >= 0 ? '+' : ''}₹{row.profitLoss.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const breadcrumbs = [
    { label: 'Reports', to: '/reports' },
    { label: 'Game Reports' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <ReportsHeader
          title="Live Casino Game Sessions"
          description="Reports of casino rounds and table history with detailed outcome results."
          breadcrumbs={breadcrumbs}
        />

        {isLoading ? <SummaryCardSkeleton /> : <ReportSummaryCards cards={summaryCards} />}

        <ReportFilters
          searchQuery={searchQuery}
          onChangeSearchQuery={setSearchQuery}
          selectedStatus={selectedCategory}
          onChangeStatus={setSelectedCategory}
          statusOptions={['TEENPATTI', 'CASINO', 'BACCARAT', 'LOTTERY']}
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
export default GameReportsPage;
