import React from 'react';
import { Wallet, ShieldAlert, TrendingUp, BookOpen } from 'lucide-react';
import type { AccountSummaryConfig } from '../../../types/user';

// Configuration object for virtual account metrics
export const accountConfig: AccountSummaryConfig = {
  balance: 50000.00,
  exposure: 0.00,
  todayPL: 0.00,
  activeBets: 0,
  currencySymbol: '₹'
};

export const AccountSummary: React.FC = () => {
  const formatCurrency = (val: number) => {
    return `${accountConfig.currencySymbol}${val.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const stats = [
    {
      label: 'Available Balance',
      value: formatCurrency(accountConfig.balance),
      icon: Wallet,
      color: 'text-emerald-400',
    },
    {
      label: 'Exposure',
      value: formatCurrency(accountConfig.exposure),
      icon: ShieldAlert,
      color: 'text-amber-400',
    },
    {
      label: "Today's Profit/Loss",
      value: formatCurrency(accountConfig.todayPL),
      icon: TrendingUp,
      color: accountConfig.todayPL >= 0 ? 'text-emerald-400' : 'text-rose-400',
    },
    {
      label: 'Active Bets',
      value: String(accountConfig.activeBets),
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
              <Icon className="w-4.5 h-4.5 text-orange-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default AccountSummary;
