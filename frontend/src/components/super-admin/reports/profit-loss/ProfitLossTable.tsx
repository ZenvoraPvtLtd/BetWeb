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
    if (val < 0) return 'text-red-400 font-semibold';
    if (val > 0) return 'text-emerald-400 font-semibold';
    return 'text-slate-400';
  };

  return (
    <div className="w-full bg-[#131B2E] border border-[#1E293B] rounded-[10px] shadow-xl select-none relative overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[600px]">
          {/* Table Headers */}
          <thead>
            <tr className="bg-[#0E1524] border-b border-[#1E293B] text-slate-400 uppercase text-[9px] font-bold tracking-wider">
              <th className="py-3.5 px-4 w-40">Event Type</th>
              <th className="py-3.5 px-4">Event Name</th>
              <th className="py-3.5 px-4 text-right w-44">Amount</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse border-b border-[#1E293B]">
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-20" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-44" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-24 ml-auto" /></td>
                </tr>
              ))
            ) : records.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="py-14 px-6 text-center text-xs md:text-sm text-slate-400 font-normal"
                >
                  {emptyStateText}
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-[#18233C]/60 transition-colors border-b border-[#1E293B] text-xs"
                >
                  {/* Event Type */}
                  <td className="py-3.5 px-4 text-orange-400 font-bold">{record.eventType}</td>

                  {/* Event Name */}
                  <td className="py-3.5 px-4 text-slate-200 font-semibold">{record.eventName}</td>

                  {/* Amount */}
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
