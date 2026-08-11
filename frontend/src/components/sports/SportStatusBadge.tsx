import React from 'react';

interface SportStatusBadgeProps {
  status: 'Upcoming' | 'Live' | 'Completed';
}

export const SportStatusBadge: React.FC<SportStatusBadgeProps> = ({ status }) => {
  if (status === 'Live') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/10 border border-red-500/20 text-red-500 animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        Live Demo
      </span>
    );
  }

  if (status === 'Completed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-500/10 border border-zinc-500/20 text-zinc-400">
        Completed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
      Upcoming
    </span>
  );
};
