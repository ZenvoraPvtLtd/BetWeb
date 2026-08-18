import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ReportErrorStateProps {
  onRetry: () => void;
}

export const ReportErrorState: React.FC<ReportErrorStateProps> = ({ onRetry }) => {
  return (
    <div className="w-full py-16 bg-[#131B2E] border border-[#1E293B] rounded-[12px] flex flex-col items-center justify-center p-6 text-center select-none shadow-md font-sans">
      <AlertCircle className="w-12 h-12 text-rose-400 mb-3 animate-pulse" />
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-mono">
        Unable to load report data
      </h4>
      <p className="text-xs text-slate-400 font-medium mt-1.5 max-w-[280px]">
        A network problem or timeout occurred while pulling statement records.
      </p>
      <button
        onClick={onRetry}
        className="mt-5 px-4 h-9 rounded-[8px] bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white text-xs font-bold uppercase tracking-wider transition-all outline-none cursor-pointer font-mono shadow-md"
      >
        Try Again
      </button>
    </div>
  );
};
export default ReportErrorState;
