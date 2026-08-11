import React from 'react';
import { Wallet, ShieldAlert, TrendingUp, BookOpen } from 'lucide-react';

export const DashboardStats: React.FC = () => {
  const stats = [
    {
      label: 'Available Balance',
      value: 'pts 50,000.00',
      icon: Wallet,
      color: 'text-emerald-400',
    },
    {
      label: 'Exposure',
      value: 'pts 0.00',
      icon: ShieldAlert,
      color: 'text-amber-500',
    },
    {
      label: "Today's P/L",
      value: 'pts +320.00',
      icon: TrendingUp,
      color: 'text-[#22C55E]',
    },
    {
      label: 'Active Bets',
      value: '3',
      icon: BookOpen,
      color: 'text-[#0EA5E9]',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 select-none">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-4 flex items-center justify-between shadow-2xs hover:bg-[#16283D] transition-colors"
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#94A3B8]">
                {stat.label}
              </span>
              <span className={`text-sm md:text-base font-extrabold tracking-tight mt-1 ${stat.color}`}>
                {stat.value}
              </span>
            </div>
            <div className="w-9 h-9 rounded-[8px] bg-zinc-900/30 border border-zinc-800 flex items-center justify-center text-zinc-400">
              <Icon className="w-4 h-4" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
