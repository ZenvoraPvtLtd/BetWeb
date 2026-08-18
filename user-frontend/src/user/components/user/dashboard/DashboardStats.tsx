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
      color: 'text-amber-400',
    },
    {
      label: "Today's P/L",
      value: 'pts +320.00',
      icon: TrendingUp,
      color: 'text-emerald-400',
    },
    {
      label: 'Active Bets',
      value: '3',
      icon: BookOpen,
      color: 'text-orange-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 select-none font-mono">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-4 flex items-center justify-between shadow-md hover:bg-[#18233C] hover:border-[#2B3C60] transition-colors"
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                {stat.label}
              </span>
              <span className={`text-sm md:text-base font-extrabold tracking-tight mt-1 ${stat.color}`}>
                {stat.value}
              </span>
            </div>
            <div className="w-9 h-9 rounded-[8px] bg-[#090E17] border border-[#233252] flex items-center justify-center text-slate-400">
              <Icon className="w-4 h-4 text-orange-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default DashboardStats;
