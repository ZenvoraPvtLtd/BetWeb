import React from 'react';
import { Breadcrumbs } from '../user/layout/Breadcrumbs';
import { Download } from 'lucide-react';

interface ReportsHeaderProps {
  title: string;
  description: string;
  breadcrumbs: { label: string; to?: string }[];
  showExport?: boolean;
}

export const ReportsHeader: React.FC<ReportsHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  showExport = true,
}) => {
  const handleExport = () => {
    alert('Mock Export Triggered: Download began for CSV ledger.');
  };

  return (
    <div className="flex flex-col gap-3 select-none text-left">
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-900">
        <div>
          <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">{title}</h2>
          <p className="text-xs text-zinc-450 mt-1 font-semibold">{description}</p>
        </div>

        {showExport && (
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 h-9 rounded-[8px] bg-[#111F30] border border-slate-700/15 hover:bg-[#16283D] text-xs font-bold text-white transition-colors cursor-pointer outline-none self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-[#0EA5E9]" />
            <span>Export CSV</span>
          </button>
        )}
      </div>
    </div>
  );
};
export default ReportsHeader;
