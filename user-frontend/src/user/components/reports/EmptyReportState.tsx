import React from 'react';
import { FilterX } from 'lucide-react';

interface EmptyReportStateProps {
  title?: string;
  message?: string;
  onResetFilters?: () => void;
}

export const EmptyReportState: React.FC<EmptyReportStateProps> = ({
  title = 'No records found',
  message = 'Try modifying your search query or selecting a broader date range.',
  onResetFilters,
}) => {
  return (
    <div className="w-full py-16 bg-[#111F30] border border-slate-700/10 rounded-[12px] flex flex-col items-center justify-center p-6 text-center select-none shadow-xs">
      <FilterX className="w-12 h-12 text-[#94A3B8] mb-3 animate-pulse" />
      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
        {title}
      </h4>
      <p className="text-xs text-[#94A3B8] font-medium mt-1.5 max-w-[280px]">
        {message}
      </p>
      {onResetFilters && (
        <button
          onClick={onResetFilters}
          className="mt-5 px-4 h-9 rounded-[8px] bg-[#0EA5E9] hover:bg-[#0284c7] text-white text-xs font-bold uppercase tracking-wider transition-colors outline-none cursor-pointer"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};
export default EmptyReportState;
