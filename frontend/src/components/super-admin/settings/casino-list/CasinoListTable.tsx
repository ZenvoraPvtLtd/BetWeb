import React from 'react';
import type { CasinoListItem } from '../../../../config/superAdmin/casinoList';

interface CasinoListTableProps {
  casinos: CasinoListItem[];
  onToggleEnabled: (id: string, enabled: boolean) => void;
}

export const CasinoListTable: React.FC<CasinoListTableProps> = ({ casinos, onToggleEnabled }) => {
  return (
    <div className="w-full bg-[#131B2E] border border-[#1E293B] rounded-[10px] shadow-xl select-none relative overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-[#0E1524] border-b border-[#1E293B] text-slate-400 uppercase text-[9px] font-bold tracking-wider font-mono">
              <th className="py-3 px-4 w-[42%]">Name</th>
              <th className="py-3 px-4 w-[42%]">Slug</th>
              <th className="py-3 px-4 text-center w-[16%]">Action</th>
            </tr>
          </thead>

          <tbody>
            {casinos.map((casino) => (
              <tr
                key={casino.id}
                className="border-b border-[#1E293B] hover:bg-[#18233C]/60 transition-colors text-xs font-medium text-slate-200"
              >
                {/* Column 1: Name */}
                <td className="py-3.5 px-4 font-semibold text-slate-100">{casino.name}</td>

                {/* Column 2: Slug */}
                <td className="py-3.5 px-4 font-mono text-orange-400 text-[11px]">{casino.slug}</td>

                {/* Column 3: Action */}
                <td className="py-3.5 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={casino.enabled}
                    onChange={(e) => onToggleEnabled(casino.id, e.target.checked)}
                    className="w-4 h-4 rounded border-[#233252] bg-[#090E17] text-orange-500 focus:ring-orange-500 cursor-pointer focus:outline-none"
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
