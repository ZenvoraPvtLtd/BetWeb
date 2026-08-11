import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import type { Account } from '../../../mock/super-admin/accounts';
import { formatFinancial, formatNumber } from '../../../utils/formatters';
import { Button } from '../../ui/Button';

interface AccountTableProps {
  accounts: Account[];
  isLoading: boolean;
  onUserClick: (username: string) => void;
  emptyStateText: string;
}

export const AccountTable: React.FC<AccountTableProps> = ({
  accounts,
  isLoading,
  onUserClick,
  emptyStateText,
}) => {
  const [activeAction, setActiveAction] = useState<{ action: string; username: string } | null>(null);

  // Calculate dynamic column totals for active items
  const totals = accounts.reduce(
    (acc, cur) => {
      acc.creditReference += cur.creditReference;
      acc.balance += cur.balance;
      acc.clientPL += cur.clientPL;
      acc.exposure += cur.exposure;
      acc.availableBalance += cur.availableBalance;
      acc.exposureLimit += cur.exposureLimit;
      return acc;
    },
    { creditReference: 0, balance: 0, clientPL: 0, exposure: 0, availableBalance: 0, exposureLimit: 0 }
  );

  const getStatusBadge = (status: Account['userStatus']) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100/60">
            Active
          </span>
        );
      case 'Suspended':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-100/60">
            Suspended
          </span>
        );
      case 'Locked':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-700 border border-red-100/60">
            Locked
          </span>
        );
    }
  };

  const getFinanceColor = (val: number) => {
    if (val < 0) return 'text-red-650 font-medium';
    if (val > 0) return 'text-emerald-600 font-medium';
    return 'text-zinc-600';
  };

  const ActionBtn = ({
    label,
    tooltip,
    onClick,
  }: {
    label: string;
    tooltip: string;
    onClick: () => void;
  }) => (
    <div className="relative group/btn inline-block">
      <button
        onClick={onClick}
        className="w-7 h-7 flex items-center justify-center bg-zinc-150 border border-zinc-200 text-zinc-700 font-bold text-[10px] rounded-[4px] hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all select-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-600"
      >
        {label}
      </button>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-zinc-950 text-white text-[9px] rounded border border-zinc-800 shadow-md font-medium opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
        {tooltip}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white border border-zinc-200 rounded-[8px] shadow-sm select-none relative overflow-hidden">
      {/* Scrollable Container Frame */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[1250px]">
          {/* Sticky Table Header */}
          <thead>
            <tr className="bg-zinc-50/50 border-b border-zinc-200 text-zinc-500 uppercase text-[9px] font-semibold tracking-wider">
              <th className="py-3.5 px-4 sticky left-0 bg-zinc-50/50 shadow-[1px_0_0_0_#e4e4e7] z-20">
                User Name
              </th>
              <th className="py-3.5 px-4 text-right">Credit Reference</th>
              <th className="py-3.5 px-4 text-right">Balance</th>
              <th className="py-3.5 px-4 text-right">Client (P/L)</th>
              <th className="py-3.5 px-4 text-right">Exposure</th>
              <th className="py-3.5 px-4 text-right">Available Balance</th>
              <th className="py-3.5 px-4">U St</th>
              <th className="py-3.5 px-4">B St</th>
              <th className="py-3.5 px-4 text-right">Exposure Limit</th>
              <th className="py-3.5 px-4 text-right">Default %</th>
              <th className="py-3.5 px-4">Account Type</th>
              <th className="py-3.5 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              /* Skeleton Loader layout */
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="py-4 px-4 sticky left-0 bg-white">
                    <div className="h-4 bg-zinc-100 rounded w-24" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-16 ml-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-16 ml-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-16 ml-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-16 ml-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-20 ml-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-10" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-10" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-12 ml-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-10 ml-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-16" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-28 mx-auto" />
                  </td>
                </tr>
              ))
            ) : accounts.length === 0 ? (
              /* Empty Search Roster Row */
              <tr>
                <td
                  colSpan={12}
                  className="py-12 px-6 text-center text-xs md:text-sm text-zinc-500 font-normal"
                >
                  {emptyStateText}
                </td>
              </tr>
            ) : (
              <>
                {/* Dynamic Totals Summary Row */}
                <tr className="bg-zinc-100/50 font-bold border-b border-zinc-200 text-zinc-900 text-xs shadow-inner">
                  <td className="py-3.5 px-4 sticky left-0 bg-zinc-100/50 shadow-[1px_0_0_0_#e4e4e7] z-10">
                    Total
                  </td>
                  <td className="py-3.5 px-4 text-right tabular-nums">
                    {formatNumber(totals.creditReference)}
                  </td>
                  <td className={`py-3.5 px-4 text-right tabular-nums ${getFinanceColor(totals.balance)}`}>
                    {formatFinancial(totals.balance)}
                  </td>
                  <td className={`py-3.5 px-4 text-right tabular-nums ${getFinanceColor(totals.clientPL)}`}>
                    {formatFinancial(totals.clientPL)}
                  </td>
                  <td className="py-3.5 px-4 text-right text-red-650 tabular-nums">
                    {totals.exposure > 0 ? `(${formatFinancial(totals.exposure)})` : '0.00'}
                  </td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-zinc-900">
                    {formatFinancial(totals.availableBalance)}
                  </td>
                  <td className="py-3.5 px-4">-</td>
                  <td className="py-3.5 px-4">-</td>
                  <td className="py-3.5 px-4 text-right tabular-nums">
                    {formatNumber(totals.exposureLimit)}
                  </td>
                  <td className="py-3.5 px-4 text-right">-</td>
                  <td className="py-3.5 px-4">-</td>
                  <td className="py-3.5 px-4">-</td>
                </tr>

                {/* Active Data Rows */}
                {accounts.map((acc) => (
                  <tr
                    key={acc.id}
                    className="hover:bg-zinc-50/40 transition-colors border-b border-zinc-100 text-xs"
                  >
                    {/* User Name badge */}
                    <td className="py-2.5 px-4 sticky left-0 bg-white shadow-[1px_0_0_0_#e4e4e7] font-semibold text-zinc-900 z-10">
                      <button
                        onClick={() => onUserClick(acc.username)}
                        className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-900 hover:text-white border border-zinc-200 hover:border-zinc-900 font-semibold cursor-pointer transition-colors text-[10.5px] outline-none"
                      >
                        {acc.username}
                      </button>
                    </td>

                    {/* Credit Reference */}
                    <td className="py-2.5 px-4 text-right tabular-nums text-zinc-550">
                      {formatNumber(acc.creditReference)}
                    </td>

                    {/* Balance */}
                    <td className={`py-2.5 px-4 text-right tabular-nums ${getFinanceColor(acc.balance)}`}>
                      {formatFinancial(acc.balance)}
                    </td>

                    {/* Client P/L */}
                    <td className={`py-2.5 px-4 text-right tabular-nums ${getFinanceColor(acc.clientPL)}`}>
                      {formatFinancial(acc.clientPL)}
                    </td>

                    {/* Exposure */}
                    <td className="py-2.5 px-4 text-right tabular-nums text-zinc-650">
                      {acc.exposure > 0 ? `(${formatFinancial(acc.exposure)})` : '0.00'}
                    </td>

                    {/* Available Balance */}
                    <td className="py-2.5 px-4 text-right tabular-nums font-semibold text-zinc-900">
                      {formatFinancial(acc.availableBalance)}
                    </td>

                    {/* User Status */}
                    <td className="py-2.5 px-4">{getStatusBadge(acc.userStatus)}</td>

                    {/* Bet Status */}
                    <td className="py-2.5 px-4">{getStatusBadge(acc.betStatus)}</td>

                    {/* Exposure Limit */}
                    <td className="py-2.5 px-4 text-right tabular-nums text-zinc-550">
                      {formatNumber(acc.exposureLimit)}
                    </td>

                    {/* Default % */}
                    <td className="py-2.5 px-4 text-right tabular-nums text-zinc-550">
                      {acc.defaultPercentage}%
                    </td>

                    {/* Account Type */}
                    <td className="py-2.5 px-4 text-zinc-600 font-medium">{acc.accountType}</td>

                    {/* Actions Column (D, W, GS, T) */}
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <ActionBtn
                          label="D"
                          tooltip="Deposit Funds"
                          onClick={() =>
                            setActiveAction({ action: 'D (Deposit)', username: acc.username })
                          }
                        />
                        <ActionBtn
                          label="W"
                          tooltip="Withdraw Funds"
                          onClick={() =>
                            setActiveAction({ action: 'W (Withdrawal)', username: acc.username })
                          }
                        />
                        <ActionBtn
                          label="GS"
                          tooltip="Game Settings"
                          onClick={() =>
                            setActiveAction({ action: 'GS (Game Settings)', username: acc.username })
                          }
                        />
                        <ActionBtn
                          label="T"
                          tooltip="Trade History"
                          onClick={() =>
                            setActiveAction({ action: 'T (Trade Details)', username: acc.username })
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Action Dialog Popup */}
      {activeAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none">
          <div className="w-full max-w-md bg-white border border-zinc-200 rounded-[8px] shadow-lg p-6 text-left animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-base">
                <Info className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>Action Information</span>
              </div>
              <button
                onClick={() => setActiveAction(null)}
                className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-600 focus:outline-none cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 border-t border-b border-zinc-100 text-xs md:text-sm text-zinc-500 leading-relaxed mb-6">
              Action <strong>{activeAction.action}</strong> for client{' '}
              <strong>{activeAction.username}</strong> will be implemented after its workflow is
              provided.
            </div>

            <div className="flex justify-end">
              <div className="w-[100px]">
                <Button onClick={() => setActiveAction(null)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
