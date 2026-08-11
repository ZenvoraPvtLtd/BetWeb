import React from 'react';
import type { CasinoListItem } from '../../../../config/superAdmin/casinoList';

interface CasinoListTableProps {
  casinos: CasinoListItem[];
  onToggleEnabled: (id: string, enabled: boolean) => void;
}

export const CasinoListTable: React.FC<CasinoListTableProps> = ({ casinos, onToggleEnabled }) => {
  return (
    <div className="w-full bg-white border border-zinc-200 rounded-[8px] shadow-sm select-none relative overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-550 uppercase text-[9px] font-bold tracking-wider font-mono">
              <th className="py-3 px-4 w-[42%]">Name</th>
              <th className="py-3 px-4 w-[42%]">Slug</th>
              <th className="py-3 px-4 text-center w-[16%]">Action</th>
            </tr>
          </thead>

          <tbody>
            {casinos.map((casino) => (
              <tr
                key={casino.id}
                className="border-b border-zinc-150/60 hover:bg-zinc-50/50 transition-colors text-xs font-medium text-zinc-800"
              >
                {/* Column 1: Name */}
                <td className="py-3 px-4 font-semibold">{casino.name}</td>

                {/* Column 2: Slug */}
                <td className="py-3 px-4 font-mono text-zinc-650 text-[11px]">{casino.slug}</td>

                {/* Column 3: Action */}
                <td className="py-3 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={casino.enabled}
                    onChange={(e) => onToggleEnabled(casino.id, e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-350 text-indigo-650 focus:ring-indigo-500 cursor-pointer focus:outline-none"
                    aria-label={`Enable/disable ${casino.name}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
