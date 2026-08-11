import React from 'react';
import type { AccountStatement } from '../../../../mock/super-admin/accountStatements';
import { formatFinancial } from '../../../../utils/formatters';

interface AccountStatementTableProps {
  statements: AccountStatement[];
  isLoading: boolean;
  isInitialState: boolean;
  emptyStateText: string;
}

export const AccountStatementTable: React.FC<AccountStatementTableProps> = ({
  statements,
  isLoading,
  isInitialState,
  emptyStateText,
}) => {
  const getFinanceColor = (val: number, type: 'credit' | 'debit' | 'balance') => {
    if (type === 'credit' && val > 0) return 'text-emerald-600 font-semibold';
    if (type === 'debit' && val > 0) return 'text-red-650 font-semibold';
    if (type === 'balance') {
      if (val < 0) return 'text-red-650 font-semibold';
      if (val > 0) return 'text-emerald-600 font-semibold';
    }
    return 'text-zinc-600';
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const hh = String(date.getHours()).padStart(2, '0');
      const min = String(date.getMinutes()).padStart(2, '0');
      const ss = String(date.getSeconds()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
    } catch {
      return isoString;
    }
  };

  return (
    <div className="w-full bg-white border border-zinc-200 rounded-[8px] shadow-sm select-none relative overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[900px]">
          {/* Table Headers */}
          <thead>
            <tr className="bg-zinc-50/50 border-b border-zinc-200 text-zinc-500 uppercase text-[9px] font-semibold tracking-wider">
              <th className="py-3.5 px-4 text-center w-16">Sr No.</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4 text-right w-32">Credit</th>
              <th className="py-3.5 px-4 text-right w-32">Debit</th>
              <th className="py-3.5 px-4 text-right w-36">Balance</th>
              <th className="py-3.5 px-4 w-40">From</th>
              <th className="py-3.5 px-4">Remark</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              /* Skeleton Loader layout */
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse border-b border-zinc-100">
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-8 mx-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-32" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-20 ml-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-20 ml-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-24 ml-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-28" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-44" />
                  </td>
                </tr>
              ))
            ) : isInitialState || statements.length === 0 ? (
              /* Empty state row with headers preserved */
              <tr>
                <td
                  colSpan={7}
                  className="py-14 px-6 text-center text-xs md:text-sm text-zinc-500 font-normal"
                >
                  {emptyStateText}
                </td>
              </tr>
            ) : (
              /* Transaction list rendering */
              statements.map((item, idx) => (
                <tr
                  key={item.id}
                  className="hover:bg-zinc-50/40 transition-colors border-b border-zinc-100 text-xs"
                >
                  {/* Sr No. */}
                  <td className="py-3 px-4 text-center tabular-nums text-zinc-500">
                    {idx + 1}
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4 tabular-nums text-zinc-650 font-medium">
                    {formatDate(item.date)}
                  </td>

                  {/* Credit */}
                  <td
                    className={`py-3 px-4 text-right tabular-nums ${getFinanceColor(
                      item.credit,
                      'credit'
                    )}`}
                  >
                    {item.credit > 0 ? formatFinancial(item.credit) : '0.00'}
                  </td>

                  {/* Debit */}
                  <td
                    className={`py-3 px-4 text-right tabular-nums ${getFinanceColor(
                      item.debit,
                      'debit'
                    )}`}
                  >
                    {item.debit > 0 ? formatFinancial(item.debit) : '0.00'}
                  </td>

                  {/* Balance */}
                  <td
                    className={`py-3 px-4 text-right tabular-nums font-semibold ${getFinanceColor(
                      item.balance,
                      'balance'
                    )}`}
                  >
                    {formatFinancial(item.balance)}
                  </td>

                  {/* From */}
                  <td className="py-3 px-4 text-zinc-700 font-medium">{item.from}</td>

                  {/* Remark */}
                  <td className="py-3 px-4 text-zinc-500 max-w-xs truncate" title={item.remark}>
                    {item.remark}
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
