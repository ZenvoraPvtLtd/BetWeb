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
    if (type === 'credit' && val > 0) return 'text-emerald-400 font-semibold';
    if (type === 'debit' && val > 0) return 'text-red-400 font-semibold';
    if (type === 'balance') {
      if (val < 0) return 'text-red-400 font-semibold';
      if (val > 0) return 'text-emerald-400 font-semibold';
    }
    return 'text-slate-400';
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
    <div className="w-full bg-[#131B2E] border border-[#1E293B] rounded-[10px] shadow-xl select-none relative overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[900px]">
          {/* Table Headers */}
          <thead>
            <tr className="bg-[#0E1524] border-b border-[#1E293B] text-slate-400 uppercase text-[9px] font-bold tracking-wider">
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
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse border-b border-[#1E293B]">
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-8 mx-auto" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-32" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-20 ml-auto" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-20 ml-auto" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-24 ml-auto" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-28" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-44" /></td>
                </tr>
              ))
            ) : isInitialState || statements.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-14 px-6 text-center text-xs md:text-sm text-slate-400 font-normal"
                >
                  {emptyStateText}
                </td>
              </tr>
            ) : (
              statements.map((item, idx) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#18233C]/60 transition-colors border-b border-[#1E293B] text-xs"
                >
                  {/* Serial Number */}
                  <td className="py-3 px-4 text-center font-mono text-slate-400">{idx + 1}</td>

                  {/* Transaction Date */}
                  <td className="py-3 px-4 text-slate-300 font-mono text-[11px] whitespace-nowrap">
                    {formatDate(item.date)}
                  </td>

                  {/* Credit Amount */}
                  <td
                    className={`py-3 px-4 text-right tabular-nums font-mono ${getFinanceColor(
                      item.credit,
                      'credit'
                    )}`}
                  >
                    {item.credit > 0 ? `+${formatFinancial(item.credit)}` : '-'}
                  </td>

                  {/* Debit Amount */}
                  <td
                    className={`py-3 px-4 text-right tabular-nums font-mono ${getFinanceColor(
                      item.debit,
                      'debit'
                    )}`}
                  >
                    {item.debit > 0 ? `-${formatFinancial(item.debit)}` : '-'}
                  </td>

                  {/* Balance */}
                  <td
                    className={`py-3 px-4 text-right tabular-nums font-mono font-semibold ${getFinanceColor(
                      item.balance,
                      'balance'
                    )}`}
                  >
                    {formatFinancial(item.balance)}
                  </td>

                  {/* From Channel / Entity */}
                  <td className="py-3 px-4 text-slate-300 font-semibold">{item.from}</td>

                  {/* Remark Description */}
                  <td className="py-3 px-4 text-slate-400 leading-snug">{item.remark}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
