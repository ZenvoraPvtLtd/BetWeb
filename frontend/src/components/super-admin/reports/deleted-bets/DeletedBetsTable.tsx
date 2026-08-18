import React, { useRef, useEffect } from 'react';
import type { DeletedBet } from '../../../../mock/super-admin/deletedBets';
import { formatFinancial } from '../../../../utils/formatters';

interface DeletedBetsTableProps {
  bets: DeletedBet[];
  isLoading: boolean;
  emptyStateText: string;
  selectedIds: string[];
  onSelectRow: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

export const DeletedBetsTable: React.FC<DeletedBetsTableProps> = ({
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

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isSomeSelected;
    }
  }, [isSomeSelected]);

  const getEventTypeBadge = (type: string) => {
    if (type.toLowerCase() === 'back') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono">
          Back
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30 font-mono">
        Lay
      </span>
    );
  };

  const getPLColor = (val: number) => {
    if (val < 0) return 'text-red-400 font-semibold';
    if (val > 0) return 'text-emerald-400 font-semibold';
    return 'text-slate-400';
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '-';
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
        <table className="w-full text-left border-collapse min-w-[1100px]">
          {/* Table Headers */}
          <thead>
            <tr className="bg-[#0E1524] border-b border-[#1E293B] text-slate-400 uppercase text-[9px] font-bold tracking-wider">
              <th className="py-3.5 px-4 text-center w-12">
                <input
                  type="checkbox"
                  ref={headerCheckboxRef}
                  checked={isAllSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-[#233252] text-orange-500 focus:ring-orange-500 cursor-pointer h-3.5 w-3.5 bg-[#090E17]"
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
              <th className="py-3.5 px-4 text-center w-24">Status</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse border-b border-[#1E293B]">
                  <td className="py-4 px-4 text-center">
                    <div className="h-4 w-4 bg-[#18233C] rounded mx-auto" />
                  </td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-20" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-24" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-36" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-28" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-16" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-14" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-12 ml-auto" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-16 ml-auto" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-16 ml-auto" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-28" /></td>
                  <td className="py-4 px-4"><div className="h-4 bg-[#18233C] rounded w-16 mx-auto" /></td>
                </tr>
              ))
            ) : bets.length === 0 ? (
              <tr>
                <td
                  colSpan={12}
                  className="py-14 px-6 text-center text-xs md:text-sm text-slate-400 font-normal"
                >
                  {emptyStateText}
                </td>
              </tr>
            ) : (
              bets.map((bet) => {
                const isSelected = selectedIds.includes(bet.id);
                return (
                  <tr
                    key={bet.id}
                    className={`
                      border-b border-[#1E293B] text-xs transition-colors
                      ${isSelected ? 'bg-orange-500/10' : 'hover:bg-[#18233C]/60'}
                    `}
                  >
                    {/* Select Row Checkbox */}
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => onSelectRow(bet.id, e.target.checked)}
                        className="rounded border-[#233252] text-orange-500 focus:ring-orange-500 cursor-pointer h-3.5 w-3.5 bg-[#090E17]"
                        aria-label={`Select bet ${bet.id}`}
                      />
                    </td>

                    {/* Uplevel */}
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{bet.uplevel}</td>

                    {/* User Name */}
                    <td className="py-3 px-4 font-semibold text-slate-200">{bet.username}</td>

                    {/* Event Name */}
                    <td className="py-3 px-4 font-semibold text-slate-100 max-w-[200px] truncate">
                      {bet.eventName}
                    </td>

                    {/* Nation */}
                    <td className="py-3 px-4 text-slate-300 font-medium">{bet.nation}</td>

                    {/* Event Type */}
                    <td className="py-3 px-4">{getEventTypeBadge(bet.eventType)}</td>

                    {/* Market Type */}
                    <td className="py-3 px-4 text-slate-300 font-medium">{bet.type}</td>

                    {/* Rate */}
                    <td className="py-3 px-4 text-right tabular-nums font-mono font-semibold text-slate-200">
                      {bet.rate.toFixed(2)}
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-4 text-right tabular-nums font-mono text-slate-200">
                      {formatFinancial(bet.amount)}
                    </td>

                    {/* P/L */}
                    <td className={`py-3 px-4 text-right tabular-nums font-mono ${getPLColor(bet.pnl)}`}>
                      {formatFinancial(bet.pnl)}
                    </td>

                    {/* Place Date */}
                    <td className="py-3 px-4 text-slate-400 font-mono text-[10.5px]">
                      {formatDate(bet.placeDate)}
                    </td>

                    {/* Status Column badge */}
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/15 text-red-400 border border-red-500/30 font-mono">
                        Deleted
                      </span>
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
