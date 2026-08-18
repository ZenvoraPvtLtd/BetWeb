import React, { useState } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { DataTable } from '../../components/reports/DataTable';
import { ReportFilters } from '../../components/reports/ReportFilters';
import type { DateOption } from '../../components/reports/DateRangeFilter';

export const DepositStatementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [dateOption, setDateOption] = useState<DateOption>('30days');

  const mockDeposits = [
    {
      id: 'd1',
      date: '2026-08-11 14:20',
      reference: 'TXN-DEP89210',
      amount: 15000,
      method: 'UPI GPay',
      status: 'APPROVED',
      remark: 'First deposit successful'
    },
    {
      id: 'd2',
      date: '2026-08-10 11:05',
      reference: 'TXN-DEP89002',
      amount: 35000,
      method: 'IMPS Bank Wire',
      status: 'APPROVED',
      remark: 'Direct balance transfer'
    }
  ];

  const columns = [
    { header: 'Date', key: 'date' },
    { header: 'Reference', key: 'reference' },
    {
      header: 'Amount',
      key: 'amount',
      renderCell: (row: any) => <span className="font-extrabold text-emerald-400">₹{row.amount.toLocaleString()}</span>
    },
    { header: 'Payment Method', key: 'method' },
    {
      header: 'Status',
      key: 'status',
      renderCell: (row: any) => (
        <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold uppercase font-mono">
          {row.status}
        </span>
      )
    },
    { header: 'Remark', key: 'remark' }
  ];

  const filteredData = mockDeposits.filter(
    (item) =>
      item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.method.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const breadcrumbs = [
    { label: 'Reports', to: '/reports' },
    { label: 'Deposit Statement' }
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
          title="Deposit Statement"
          description="View all of your processed balance deposit transactions ledger statement."
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
export default DepositStatementPage;
