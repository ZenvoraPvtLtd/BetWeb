import React, { useState } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { DataTable } from '../../components/reports/DataTable';
import { ReportFilters } from '../../components/reports/ReportFilters';
import type { DateOption } from '../../components/reports/DateRangeFilter';

export const WithdrawStatementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [dateOption, setDateOption] = useState<DateOption>('30days');

  const mockWithdrawals = [
    {
      id: 'w1',
      date: '2026-08-11 19:30',
      reference: 'TXN-WTH00456',
      amount: 10000,
      method: 'UPI PayTM',
      status: 'PENDING',
      remark: 'Pending admin approval'
    }
  ];

  const columns = [
    { header: 'Date', key: 'date' },
    { header: 'Reference', key: 'reference' },
    {
      header: 'Amount',
      key: 'amount',
      renderCell: (row: any) => <span className="font-extrabold text-[#F43F5E]">₹{row.amount.toLocaleString()}</span>
    },
    { header: 'Payment Method', key: 'method' },
    {
      header: 'Status',
      key: 'status',
      renderCell: (row: any) => {
        const isPending = row.status === 'PENDING';
        return (
          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase border ${
            isPending
              ? 'bg-amber-500/10 border-amber-500/20 text-[#F59E0B]'
              : 'bg-emerald-500/10 border-emerald-500/20 text-[#22C55E]'
          }`}>
            {row.status}
          </span>
        );
      }
    },
    { header: 'Remark', key: 'remark' }
  ];

  const filteredData = mockWithdrawals.filter(
    (item) =>
      item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.method.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const breadcrumbs = [
    { label: 'Reports', to: '/reports' },
    { label: 'Withdrawal Statement' }
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
          title="Withdraw Statement"
          description="View all of your processed balance withdrawal transactions ledger statement."
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
export default WithdrawStatementPage;
