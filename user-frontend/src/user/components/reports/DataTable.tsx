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
    <div className="w-full flex flex-col select-none font-sans">
      {/* 1. Desktop Tabular View */}
      <div className="hidden md:block w-full bg-[#131B2E] border border-[#1E293B] rounded-[12px] overflow-hidden shadow-md">
        <div className="w-full overflow-x-auto scrollbar-thin">
          <table className="w-full border-collapse text-left min-w-[700px]">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#0E1524] text-[10px] uppercase font-bold text-slate-400 tracking-widest sticky top-0 z-10 font-mono">
                {columns.map((col) => (
                  <th key={col.key} className="py-3.5 px-4 first:pl-5 last:pr-5">
                    {col.header}
                  </th>
                ))}
                {onViewDetails && <th className="py-3.5 px-4 text-right pr-5">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B] text-xs font-semibold text-slate-300">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-[#18233C]/60 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="py-3 px-4 first:pl-5 last:pr-5 font-mono">
                      {col.renderCell ? col.renderCell(row) : (row as any)[col.key]}
                    </td>
                  ))}
                  {onViewDetails && (
                    <td className="py-3 px-4 text-right pr-5">
                      <button
                        onClick={() => onViewDetails(row)}
                        className="text-[10px] font-bold text-orange-400 hover:text-orange-300 hover:underline uppercase tracking-wider outline-none cursor-pointer font-mono"
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
              className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-4 flex flex-col gap-2.5 text-left text-xs shadow-md"
            >
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-2 font-mono">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  ID: #{row.id}
                </span>
                {onViewDetails && (
                  <button
                    onClick={() => onViewDetails(row)}
                    className="text-[10px] font-bold text-orange-400 hover:text-orange-300 uppercase tracking-wider outline-none"
                  >
                    Details
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-1.5 font-mono">
                {columns.map((col) => (
                  <div key={col.key} className="flex justify-between items-center text-[11px]">
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">
                      {col.header}
                    </span>
                    <span className="font-bold text-slate-100">
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
