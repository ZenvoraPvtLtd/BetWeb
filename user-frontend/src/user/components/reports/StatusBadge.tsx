import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStyles = () => {
    switch (status.toUpperCase()) {
      case 'WON':
      case 'SETTLED':
        return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400';
      case 'LOST':
        return 'bg-rose-500/15 border-rose-500/30 text-rose-400';
      case 'OPEN':
      case 'ACTIVE':
        return 'bg-orange-500/15 border-orange-500/30 text-orange-400';
      case 'CANCELLED':
        return 'bg-amber-500/15 border-amber-500/30 text-amber-400';
      case 'DELETED':
        return 'bg-[#18233C] border-[#2B3C60] text-slate-400';
      default:
        return 'bg-[#18233C] border-[#2B3C60] text-slate-300';
    }
  };

  return (
    <span className={`px-2 py-0.5 border rounded-full text-[9px] font-bold uppercase tracking-wider font-mono ${getStyles()}`}>
      {status}
    </span>
  );
};
export default StatusBadge;
