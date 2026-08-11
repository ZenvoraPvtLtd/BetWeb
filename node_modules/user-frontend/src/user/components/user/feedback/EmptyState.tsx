import React from 'react';
import { CalendarRange } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No live matches available',
  message = 'Check upcoming matches below for featured fixtures.',
}) => {
  return (
    <div className="w-full py-10 bg-[#111F30] border border-slate-700/10 rounded-[12px] flex flex-col items-center justify-center p-6 text-center select-none shadow-xs">
      <div className="w-12 h-12 rounded-full bg-zinc-900/30 border border-zinc-800/80 flex items-center justify-center text-zinc-400 mb-3 animate-pulse">
        <CalendarRange className="w-5 h-5 text-[#0EA5E9]" />
      </div>
      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
        {title}
      </h4>
      <p className="text-xs text-[#94A3B8] font-medium mt-1 max-w-[280px]">
        {message}
      </p>
    </div>
  );
};
export default EmptyState;
