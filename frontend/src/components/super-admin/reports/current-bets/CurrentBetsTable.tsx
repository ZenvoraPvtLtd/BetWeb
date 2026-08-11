import React, { useRef, useEffect } from 'react';
import type { CurrentBet } from '../../../../mock/super-admin/currentBets';
import { formatFinancial } from '../../../../utils/formatters';

interface CurrentBetsTableProps {
  bets: CurrentBet[];
  isLoading: boolean;
  emptyStateText: string;
  selectedIds: string[];
  onSelectRow: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

export const CurrentBetsTable: React.FC<CurrentBetsTableProps> = ({
  bets,
  isLoading,
  emptyStateText,
  selectedIds,
  onSelectRow,
  onSelectAll,
}) => {
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  const visibleIds = bets.map((b) => b.id);
  const isAllSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));
  const isSomeSelected =
    visibleIds.length > 0 &&
    visibleIds.some((id) => selectedIds.includes(id)) &&
    !isAllSelected;

  // Set checkbox indeterminate state
  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isSomeSelected;
    }
  }, [isSomeSelected]);

  const getEventTypeBadge = (type: string) => {
    if (type.toLowerCase() === 'back') {
      return (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-100/60 font-mono">
          Back
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-pink-50 text-pink-705 border border-pink-100/60 font-mono">
        Lay
      </span>
    );
  };

  const getPLColor = (val: number) => {
    if (val < 0) return 'text-red-650 font-medium';
    if (val > 0) return 'text-emerald-600 font-medium';
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
        <table className="w-full text-left border-collapse min-w-[1250px]">
          {/* Table Headers */}
          <thead>
            <tr className="bg-zinc-50/50 border-b border-zinc-200 text-zinc-500 uppercase text-[9px] font-semibold tracking-wider">
              <th className="py-3.5 px-4 text-center w-12">
                <input
                  type="checkbox"
                  ref={headerCheckboxRef}
                  checked={isAllSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-zinc-300 text-indigo-650 focus:ring-indigo-500 cursor-pointer h-3.5 w-3.5"
                  aria-label="Select all bets on this page"
                />
              </th>
              <th className="py-3.5 px-4">Uplevel</th>
              <th className="py-3.5 px-4">User Name</th>
              <th className="py-3.5 px-4">Event Name</th>
              <th className="py-3.5 px-4">Nation</th>
              <th className="py-3.5 px-4 w-28">Event Type</th>
              <th className="py-3.5 px-4 w-28">Type</th>
              <th className="py-3.5 px-4 text-right w-24">Rate</th>
              <th className="py-3.5 px-4 text-right w-28">Amount</th>
              <th className="py-3.5 px-4 text-right w-28">P/L</th>
              <th className="py-3.5 px-4">Place Date</th>
              <th className="py-3.5 px-4 text-center w-24">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              /* Skeleton Loader layout */
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse border-b border-zinc-100">
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-4 mx-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-16" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-20" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-32" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-20" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-12" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-16" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-12 ml-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-16 ml-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-16 ml-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-32" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-zinc-100 rounded w-12 mx-auto" />
                  </td>
                </tr>
              ))
            ) : bets.length === 0 ? (
              /* Empty Results Row */
              <tr>
                <td
                  colSpan={12}
                  className="py-14 px-6 text-center text-xs md:text-sm text-zinc-500 font-normal"
                >
                  {emptyStateText}
                </td>
              </tr>
            ) : (
              /* Active Rows render */
              bets.map((bet) => {
                const isSelected = selectedIds.includes(bet.id);
                return (
                  <tr
                    key={bet.id}
                    className={`
                      border-b border-zinc-100 text-xs transition-colors hover:bg-zinc-50/40
                      ${isSelected ? 'bg-indigo-50/15' : ''}
                    `}
                  >
                    {/* Select Row Checkbox */}
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => onSelectRow(bet.id, e.target.checked)}
                        className="rounded border-zinc-300 text-indigo-650 focus:ring-indigo-500 cursor-pointer h-3.5 w-3.5"
                        aria-label={`Select bet ${bet.id}`}
                      />
                    </td>

                    {/* Uplevel */}
                    <td className="py-3 px-4 text-zinc-500 font-bold font-mono">{bet.uplevel}</td>

                    {/* User Name */}
                    <td className="py-3 px-4 text-zinc-900 font-semibold">{bet.username}</td>

                    {/* Event Name */}
                    <td className="py-3 px-4 text-zinc-700 font-medium">{bet.eventName}</td>

                    {/* Nation */}
                    <td className="py-3 px-4 text-zinc-600 font-medium">{bet.nation}</td>

                    {/* Event Type (Back/Lay) */}
                    <td className="py-3 px-4">{getEventTypeBadge(bet.eventType)}</td>

                    {/* Type */}
                    <td className="py-3 px-4 text-zinc-500 font-medium">{bet.type}</td>

                    {/* Rate */}
                    <td className="py-3 px-4 text-right tabular-nums text-zinc-900 font-semibold font-mono">
                      {bet.rate.toFixed(2)}
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-4 text-right tabular-nums text-zinc-650 font-semibold font-mono">
                      {formatFinancial(bet.amount)}
                    </td>

                    {/* P/L */}
                    <td className={`py-3 px-4 text-right tabular-nums ${getPLColor(bet.pnl)}`}>
                      {bet.pnl > 0 ? `+${formatFinancial(bet.pnl)}` : formatFinancial(bet.pnl)}
                    </td>

                    {/* Place Date */}
                    <td className="py-3 px-4 tabular-nums text-zinc-500 font-semibold font-mono">
                      {formatDate(bet.placeDate)}
                    </td>

                    {/* Actions Column (View details placeholder dialog) */}
                    <td className="py-3 px-4 text-center">
                      <button
                        className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-900 hover:text-white border border-zinc-200 hover:border-zinc-900 text-[10px] font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-600"
                        onClick={() =>
                          alert(`View details workflow is pending details for bet ${bet.id}`)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
