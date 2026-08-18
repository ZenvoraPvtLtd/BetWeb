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
    <div className="flex flex-col gap-3 select-none text-left font-sans">
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#1E293B]">
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 uppercase tracking-wider font-mono">{title}</h2>
          <p className="text-xs text-slate-400 mt-1 font-semibold">{description}</p>
        </div>

        {showExport && (
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 h-9 rounded-[8px] bg-[#18233C] border border-[#2B3C60] hover:bg-[#223050] text-xs font-bold text-slate-100 transition-colors cursor-pointer outline-none self-start sm:self-auto font-mono shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-orange-400" />
            <span>Export CSV</span>
          </button>
        )}
      </div>
    </div>
  );
};
export default ReportsHeader;
