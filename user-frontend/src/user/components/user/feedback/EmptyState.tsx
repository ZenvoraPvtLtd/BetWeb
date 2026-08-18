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
    <div className="w-full py-10 bg-[#131B2E] border border-[#1E293B] rounded-[12px] flex flex-col items-center justify-center p-6 text-center select-none shadow-md">
      <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-3 animate-pulse">
        <CalendarRange className="w-5 h-5 text-orange-400" />
      </div>
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-mono">
        {title}
      </h4>
      <p className="text-xs text-slate-400 font-medium mt-1 max-w-[280px]">
        {message}
      </p>
    </div>
  );
};
export default EmptyState;
