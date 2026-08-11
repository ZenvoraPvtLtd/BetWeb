import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ReportErrorStateProps {
  onRetry: () => void;
}

export const ReportErrorState: React.FC<ReportErrorStateProps> = ({ onRetry }) => {
  return (
    <div className="w-full py-16 bg-[#111F30] border border-slate-700/10 rounded-[12px] flex flex-col items-center justify-center p-6 text-center select-none shadow-xs">
      <AlertCircle className="w-12 h-12 text-[#F43F5E] mb-3 animate-pulse" />
      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
        Unable to load report data
      </h4>
      <p className="text-xs text-[#94A3B8] font-medium mt-1.5 max-w-[280px]">
        A network problem or timeout occurred while pulling statement records.
      </p>
      <button
        onClick={onRetry}
        className="mt-5 px-4 h-9 rounded-[8px] bg-[#0EA5E9] hover:bg-[#0284c7] text-white text-xs font-bold uppercase tracking-wider transition-colors outline-none cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
};
export default ReportErrorState;
