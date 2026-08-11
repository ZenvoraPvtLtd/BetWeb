import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStyles = () => {
    switch (status.toUpperCase()) {
      case 'WON':
      case 'SETTLED':
        return 'bg-emerald-500/10 border-emerald-500/20 text-[#22C55E]';
      case 'LOST':
        return 'bg-rose-500/10 border-rose-500/20 text-[#F43F5E]';
      case 'OPEN':
      case 'ACTIVE':
        return 'bg-[#0EA5E9]/10 border-[#0EA5E9]/20 text-[#0EA5E9]';
      case 'CANCELLED':
        return 'bg-amber-500/10 border-amber-500/20 text-[#F59E0B]';
      case 'DELETED':
        return 'bg-zinc-800 border-zinc-700 text-zinc-400';
      default:
        return 'bg-zinc-800 border-zinc-750 text-zinc-300';
    }
  };

  return (
    <span className={`px-2 py-0.5 border rounded-full text-[9px] font-bold uppercase tracking-wider ${getStyles()}`}>
      {status}
    </span>
  );
};
export default StatusBadge;
