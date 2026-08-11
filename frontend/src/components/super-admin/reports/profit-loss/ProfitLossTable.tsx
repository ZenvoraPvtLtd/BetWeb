import React from 'react';
import type { ProfitLossRecord } from '../../../../mock/super-admin/profitLoss';
import { formatFinancial } from '../../../../utils/formatters';

interface ProfitLossTableProps {
  records: ProfitLossRecord[];
  isLoading: boolean;
  emptyStateText: string;
}

export const ProfitLossTable: React.FC<ProfitLossTableProps> = ({
  records,
  isLoading,
  emptyStateText,
}) => {
  const getAmountColor = (val: number) => {
    if (val < 0) return 'text-red-655 font-medium';
    if (val > 0) return 'text-emerald-600 font-medium';
    return 'text-zinc-600';
  };

  return (
    <div className="w-full bg-white border border-zinc-200 rounded-[8px] shadow-sm select-none relative overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[600px]">
          {/* Table Headers */}
          <thead>
            <tr className="bg-zinc-50/50 border-b border-zinc-200 text-zinc-500 uppercase text-[9px] font-semibold tracking-wider">
              <th className="py-3.5 px-4 w-40">Event Type</th>
              <th className="py-3.5 px-4">Event Name</th>
              <th className="py-3.5 px-4 text-right w-44">Amount</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              /* Skeleton Loader layout */
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse border-b border-zinc-100">
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-20" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-44" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-24 ml-auto" />
                  </td>
                </tr>
              ))
            ) : records.length === 0 ? (
              /* Empty state row with headers visible */
              <tr>
                <td
                  colSpan={3}
                  className="py-14 px-6 text-center text-xs md:text-sm text-zinc-500 font-normal"
                >
                  {emptyStateText}
                </td>
              </tr>
            ) : (
              /* Active Profit/Loss rows */
              records.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-zinc-50/40 transition-colors border-b border-zinc-100 text-xs"
                >
                  {/* Event Type */}
                  <td className="py-3.5 px-4 text-zinc-550 font-bold">{record.eventType}</td>

                  {/* Event Name */}
                  <td className="py-3.5 px-4 text-zinc-800 font-semibold">{record.eventName}</td>

                  {/* Amount (financial formatting) */}
                  <td
                    className={`py-3.5 px-4 text-right tabular-nums font-semibold font-mono ${getAmountColor(
                      record.amount
                    )}`}
                  >
                    {record.amount > 0
                      ? `+${formatFinancial(record.amount)}`
                      : formatFinancial(record.amount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
