import React, { useState, useEffect } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { ReportsHeader } from '../../components/reports/ReportsHeader';
import { ReportSummaryCards } from '../../components/reports/ReportSummaryCards';
import { DateRangeFilter } from '../../components/reports/DateRangeFilter';
import type { DateOption } from '../../components/reports/DateRangeFilter';
import { ProfitLossChart } from '../../components/reports/ProfitLossChart';
import { ReportErrorState } from '../../components/reports/ReportErrorState';
import { SummaryCardSkeleton } from '../../components/reports/SummaryCardSkeleton';
import { mockProfitLoss, totalProfit, totalLoss, netPL, totalStake } from '../../data/reports/profitLoss';

export const ProfitLossPage: React.FC = () => {
  const [dateOption, setDateOption] = useState<DateOption>('7days');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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

  const summaryCards = [
    { label: 'Total Profit', value: `+₹${totalProfit.toLocaleString()}`, color: 'text-[#22C55E]' },
    { label: 'Total Loss', value: `-₹${totalLoss.toLocaleString()}`, color: 'text-[#F43F5E]' },
    { label: 'Net Profit/Loss', value: `${netPL >= 0 ? '+' : ''}₹${netPL.toLocaleString()}`, color: netPL >= 0 ? 'text-[#22C55E]' : 'text-[#F43F5E]' },
    { label: 'Total Volume / Stake', value: `₹${totalStake.toLocaleString()}`, color: 'text-white' }
  ];

  const breadcrumbs = [
    { label: 'Reports', to: '/reports' },
    { label: 'Profit & Loss' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <ReportsHeader
          title="Profit & Loss Statement"
          description="Consolidated statement of mock trading gains and losses divided by exchange category."
          breadcrumbs={breadcrumbs}
        />

        <div className="flex bg-zinc-950/20 border border-zinc-900 p-4 rounded-[12px] self-start w-full sm:w-auto">
          <DateRangeFilter
            selectedOption={dateOption}
            onChangeOption={setDateOption}
            fromDate={fromDate}
            toDate={toDate}
            onChangeFromDate={setFromDate}
            onChangeToDate={setToDate}
          />
        </div>

        {isError ? (
          <ReportErrorState onRetry={loadData} />
        ) : isLoading ? (
          <div className="flex flex-col gap-6">
            <SummaryCardSkeleton />
            <div className="h-56 bg-[#111F30] border border-slate-700/10 rounded-[12px] animate-pulse" />
          </div>
        ) : (
          <>
            <ReportSummaryCards cards={summaryCards} />
            <ProfitLossChart entries={mockProfitLoss} />
          </>
        )}
      </div>
    </UserLayout>
  );
};
export default ProfitLossPage;
