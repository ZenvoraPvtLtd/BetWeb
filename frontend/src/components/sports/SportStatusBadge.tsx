import React from 'react';

interface SportStatusBadgeProps {
  status: 'Upcoming' | 'Live' | 'Completed';
}

export const SportStatusBadge: React.FC<SportStatusBadgeProps> = ({ status }) => {
  if (status === 'Live') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/15 border border-red-500/30 text-red-400 animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
        Live Demo
      </span>
    );
  }

  if (status === 'Completed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 border border-slate-700 text-slate-400">
        Completed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/15 border border-orange-500/30 text-orange-400">
      Upcoming
    </span>
  );
};
