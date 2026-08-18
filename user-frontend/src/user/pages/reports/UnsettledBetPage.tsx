import React, { useState } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { DataTable } from '../../components/reports/DataTable';
import { Trash2 } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

interface UnsettledBet {
  id: string;
  uplevel: string;
  user: string;
  event: string;
  nation: string;
  eventType: string;
  type: string;
  rate: number;
  amount: number;
  pl: number;
  date: string;
}

export const UnsettledBetPage: React.FC = () => {
  const { addToast, showConfirm } = useSettings();
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [bets, setBets] = useState<UnsettledBet[]>([
    {
      id: 'ub1',
      uplevel: 'Supermaster',
      user: 'User',
      event: 'India v Australia',
      nation: 'India',
      eventType: 'Cricket',
      type: 'BACK',
      rate: 1.85,
      amount: 10000,
      pl: 8500,
      date: '2026-08-11 20:00'
    },
    {
      id: 'ub2',
      uplevel: 'Supermaster',
      user: 'User',
      event: 'South Africa v India',
      nation: 'South Africa',
      eventType: 'Cricket',
      type: 'LAY',
      rate: 2.10,
      amount: 5000,
      pl: 5500,
      date: '2026-08-11 20:15'
    }
  ]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(bets.map((b) => b.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDeleteIndividual = (id: string) => {
    showConfirm(
      'Cancel Unsettled Bet?',
      'This will cancel and remove your unmatched/unsettled bet from the exchange.',
      'Cancel Bet',
      () => {
        setBets((prev) => prev.filter((b) => b.id !== id));
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        addToast('Unsettled bet cancelled successfully', 'success');
      }
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;

    showConfirm(
      `Cancel ${selectedIds.length} Unsettled Bets?`,
      'This action will cancel and remove all selected bets.',
      'Cancel Bets',
      () => {
        setBets((prev) => prev.filter((b) => !selectedIds.includes(b.id)));
        setSelectedIds([]);
        addToast('Selected unsettled bets cancelled', 'success');
      }
    );
  };

  const columns = [
    {
      header: (
        <input
          type="checkbox"
          checked={bets.length > 0 && selectedIds.length === bets.length}
          onChange={(e) => handleSelectAll(e.target.checked)}
          className="rounded border-[#233252] bg-[#090E17] text-orange-500 focus:ring-0 outline-none cursor-pointer"
        />
      ),
      key: 'checkbox',
      renderCell: (row: UnsettledBet) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.id)}
          onChange={() => toggleSelect(row.id)}
          className="rounded border-[#233252] bg-[#090E17] text-orange-500 focus:ring-0 outline-none cursor-pointer"
        />
      )
    },
    { header: 'Uplevel', key: 'uplevel' },
    { header: 'User Name', key: 'user' },
    { header: 'Event Name', key: 'event' },
    { header: 'Nation', key: 'nation' },
    { header: 'Event Type', key: 'eventType' },
    {
      header: 'Type',
      key: 'type',
      renderCell: (row: UnsettledBet) => {
        const isBack = row.type === 'BACK';
        return (
          <span className={`text-[9px] px-2 py-0.5 rounded font-extrabold uppercase border font-mono ${
            isBack
              ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
              : 'bg-pink-500/20 border-pink-500/30 text-pink-400'
          }`}>
            {row.type}
          </span>
        );
      }
    },
    { header: 'Rate', key: 'rate' },
    {
      header: 'Amount',
      key: 'amount',
      renderCell: (row: UnsettledBet) => <span>₹{row.amount.toLocaleString()}</span>
    },
    {
      header: 'Potential P/L',
      key: 'pl',
      renderCell: (row: UnsettledBet) => <span className="text-emerald-400 font-extrabold">+₹{row.pl.toLocaleString()}</span>
    },
    { header: 'Place Date', key: 'date' },
    {
      header: 'Action',
      key: 'action',
      renderCell: (row: UnsettledBet) => (
        <button
          onClick={() => handleDeleteIndividual(row.id)}
          className="p-1.5 hover:bg-[#18233C] rounded-[6px] text-slate-400 hover:text-rose-400 transition-colors cursor-pointer outline-none"
          aria-label="Delete unsettled bet"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )
    }
  ];

  const filteredData = bets.filter(
    (b) =>
      b.event.toLowerCase().includes(query.toLowerCase()) ||
      b.eventType.toLowerCase().includes(query.toLowerCase())
  );

  const breadcrumbs = [
    { label: 'Reports', to: '/reports' },
    { label: 'Unsettled Bets' }
  ];

  return (
    <UserLayout>
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left font-sans">
        <SettingsHeader
          title="Unsettled Bet"
          description="View and cancel unmatched or currently active unsettled betting exposures."
          breadcrumbs={breadcrumbs}
        />

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-4 shadow-sm">
          <input
            placeholder="Search by event or sport..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-64 h-9 px-3 bg-[#090E17] border border-[#233252] rounded-[8px] text-xs font-bold text-slate-100 placeholder-slate-500 outline-none focus:border-orange-500 font-mono transition-colors"
          />

          {selectedIds.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-1.5 px-4 h-9 rounded-[8px] bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 text-[10px] font-bold uppercase tracking-wider transition-colors outline-none cursor-pointer font-mono shadow-sm"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Cancel Selected ({selectedIds.length})</span>
            </button>
          )}
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
        />
      </div>
    </UserLayout>
  );
};
export default UnsettledBetPage;
