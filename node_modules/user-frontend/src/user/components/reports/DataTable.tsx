import React from 'react';

export interface TableColumn<T> {
  header: React.ReactNode;
  key: string;
  renderCell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onViewDetails?: (row: T) => void;
  renderMobileCard?: (row: T) => React.ReactNode;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  onViewDetails,
  renderMobileCard,
}: DataTableProps<T>) {
  return (
    <div className="w-full flex flex-col select-none">
      {/* 1. Desktop Tabular View */}
      <div className="hidden md:block w-full bg-[#111F30] border border-slate-700/15 rounded-[12px] overflow-hidden shadow-xs">
        <div className="w-full overflow-x-auto scrollbar-thin">
          <table className="w-full border-collapse text-left min-w-[700px]">
            <thead>
              <tr className="border-b border-zinc-900/80 bg-[#0D1B2A] text-[10px] uppercase font-bold text-[#94A3B8] tracking-widest sticky top-0 z-10">
                {columns.map((col) => (
                  <th key={col.key} className="py-3.5 px-4 first:pl-5 last:pr-5">
                    {col.header}
                  </th>
                ))}
                {onViewDetails && <th className="py-3.5 px-4 text-right pr-5">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/30 text-xs font-semibold text-zinc-300">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-zinc-900/20 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="py-3 px-4 first:pl-5 last:pr-5">
                      {col.renderCell ? col.renderCell(row) : (row as any)[col.key]}
                    </td>
                  ))}
                  {onViewDetails && (
                    <td className="py-3 px-4 text-right pr-5">
                      <button
                        onClick={() => onViewDetails(row)}
                        className="text-[10px] font-bold text-[#0EA5E9] hover:text-[#38BDF8] hover:underline uppercase tracking-wider outline-none cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Mobile Cards Grid View */}
      <div className="flex flex-col gap-3 md:hidden">
        {data.map((row) => {
          if (renderMobileCard) {
            return <React.Fragment key={row.id}>{renderMobileCard(row)}</React.Fragment>;
          }

          // Default fallback card layout
          return (
            <div
              key={row.id}
              className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-4 flex flex-col gap-2.5 text-left text-xs"
            >
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  ID: #{row.id}
                </span>
                {onViewDetails && (
                  <button
                    onClick={() => onViewDetails(row)}
                    className="text-[10px] font-bold text-[#0EA5E9] hover:text-[#38BDF8] uppercase tracking-wider outline-none"
                  >
                    Details
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                {columns.map((col) => (
                  <div key={col.key} className="flex justify-between items-center text-[11px]">
                    <span className="font-bold text-[#94A3B8] uppercase tracking-wider text-[9px]">
                      {col.header}
                    </span>
                    <span className="font-bold text-white">
                      {col.renderCell ? col.renderCell(row) : (row as any)[col.key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
