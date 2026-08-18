import React, { useState } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { DataTable } from '../../components/reports/DataTable';
import { ReportFilters } from '../../components/reports/ReportFilters';
import type { DateOption } from '../../components/reports/DateRangeFilter';

export const BetHistoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [dateOption, setDateOption] = useState<DateOption>('30days');

  const mockBets = [
    {
      id: 'b1',
      date: '2026-08-11 16:45',
      user: 'User',
      game: 'Cricket',
      event: 'India v Australia',
      market: 'Match Odds',
      selection: 'India',
      odds: 1.82,
      stake: 5000,
      pl: 4100,
      status: 'WON'
    },
    {
      id: 'b2',
      date: '2026-08-10 18:20',
      user: 'User',
      game: 'Tennis',
      event: 'Zhukayev v Braswell',
      market: 'Match Odds',
      selection: 'Braswell',
      odds: 2.10,
      stake: 2000,
      pl: -2000,
      status: 'LOST'
    }
  ];

  const columns = [
    { header: 'Date', key: 'date' },
    { header: 'User', key: 'user' },
    { header: 'Sport/Game', key: 'game' },
    { header: 'Event', key: 'event' },
    { header: 'Market', key: 'market' },
    { header: 'Selection', key: 'selection' },
    { header: 'Odds', key: 'odds' },
    {
      header: 'Stake',
      key: 'stake',
      renderCell: (row: any) => <span>₹{row.stake.toLocaleString()}</span>
    },
    {
      header: 'Profit/Loss',
      key: 'pl',
      renderCell: (row: any) => {
        const isProfit = row.pl >= 0;
        return (
          <span className={`font-extrabold ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
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
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
          }`}>
            {row.status}
          </span>
        );
      }
    }
  ];

  const filteredData = mockBets.filter(
    (item) =>
      item.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.selection.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const breadcrumbs = [
    { label: 'Reports', to: '/reports' },
    { label: 'Bet History' }
  ];

  const handleReset = () => {
    setSearchQuery('');
    setFromDate('');
    setToDate('');
    setDateOption('30days');
  };

  return (
    <UserLayout>
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left font-sans">
        <SettingsHeader
          title="Bet History"
          description="Track and inspect your entire sports exchange settled betting history logs."
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
export default BetHistoryPage;
