import React, { useState } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { DataTable } from '../../components/reports/DataTable';
import { ReportFilters } from '../../components/reports/ReportFilters';
import type { DateOption } from '../../components/reports/DateRangeFilter';

export const CasinoReportHistoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [dateOption, setDateOption] = useState<DateOption>('30days');

  const mockCasinoReports = [
    {
      id: 'cr1',
      date: '2026-08-11 20:30',
      game: '20-20 Teenpatti',
      roundId: 'RND-TP89021-9A',
      stake: 1000,
      odds: 1.95,
      amount: 1950,
      pl: 950,
      status: 'WON'
    },
    {
      id: 'cr2',
      date: '2026-08-11 20:35',
      game: 'Lucky 7 - A',
      roundId: 'RND-L7-00912-1Z',
      stake: 2000,
      odds: 2.00,
      amount: 0,
      pl: -2000,
      status: 'LOST'
    }
  ];

  const columns = [
    { header: 'Date', key: 'date' },
    { header: 'Game', key: 'game' },
    { header: 'Round ID', key: 'roundId' },
    {
      header: 'Stake',
      key: 'stake',
      renderCell: (row: any) => <span>₹{row.stake.toLocaleString()}</span>
    },
    { header: 'Odds', key: 'odds' },
    {
      header: 'Payout Amount',
      key: 'amount',
      renderCell: (row: any) => <span>₹{row.amount.toLocaleString()}</span>
    },
    {
      header: 'Net P/L',
      key: 'pl',
      renderCell: (row: any) => {
        const isProfit = row.pl >= 0;
        return (
          <span className={`font-extrabold ${isProfit ? 'text-[#22C55E]' : 'text-rose-500'}`}>
            {isProfit ? `+₹${row.pl.toLocaleString()}` : `-₹${Math.abs(row.pl).toLocaleString()}`}
          </span>
        );
      }
    },
    {
      header: 'Status',
      key: 'status',
      renderCell: (row: any) => {
        const isWon = row.status === 'WON';
        return (
          <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase border ${
            isWon
              ? 'bg-emerald-500/10 border-emerald-500/20 text-[#22C55E]'
              : 'bg-rose-500/10 border-rose-500/20 text-[#F43F5E]'
          }`}>
            {row.status}
          </span>
        );
      }
    }
  ];

  const filteredData = mockCasinoReports.filter(
    (item) =>
      item.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.roundId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const breadcrumbs = [
    { label: 'Reports', to: '/reports' },
    { label: 'Casino Report History' }
  ];

  const handleReset = () => {
    setSearchQuery('');
    setFromDate('');
    setToDate('');
    setDateOption('30days');
  };

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <SettingsHeader
          title="Casino Report History"
          description="Examine detailed dealer rounds, stake payouts, and casino profit logs."
          breadcrumbs={breadcrumbs}
        />

        <ReportFilters
          searchQuery={searchQuery}
          onChangeSearchQuery={setSearchQuery}
          selectedDateOption={dateOption}
          onChangeDateOption={setDateOption}
          fromDate={fromDate}
          toDate={toDate}
          onChangeFromDate={setFromDate}
          onChangeToDate={setToDate}
          onReset={handleReset}
        />

        <DataTable
          columns={columns}
          data={filteredData}
        />
      </div>
    </UserLayout>
  );
};
export default CasinoReportHistoryPage;
