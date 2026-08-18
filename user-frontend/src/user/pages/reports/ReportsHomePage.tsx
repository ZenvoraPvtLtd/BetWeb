import React from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { ReportsHeader } from '../../components/reports/ReportsHeader';
import { ReportSummaryCards } from '../../components/reports/ReportSummaryCards';
import { ArrowRight, Receipt, FileText, PlayCircle, Trash2, ShieldCheck, TrendingUp } from 'lucide-react';

export const ReportsHomePage: React.FC = () => {
  const summaryCards = [
    { label: 'Total Bets Logged', value: 12, color: 'text-slate-100' },
    { label: 'Active Open Bets', value: 2, color: 'text-orange-400' },
    { label: 'Settled Outcomes', value: 8, color: 'text-emerald-400' },
    { label: 'Total Staked Points', value: '₹15,400.00', color: 'text-slate-100' },
  ];

  const quickLinks = [
    { title: 'My Bets', description: 'Log of settled and active bets with status indicators.', to: '/reports/my-bets', icon: Receipt },
    { title: 'Account Statement', description: 'Debit and credit transaction statements history.', to: '/reports/account-statement', icon: FileText },
    { title: 'Current Bets', description: 'View current active, open, and unsettled bets.', to: '/reports/current-bets', icon: PlayCircle },
    { title: 'Deleted Bets', description: 'Display cancelled and deleted bets history.', to: '/reports/deleted-bets', icon: Trash2 },
    { title: 'Game Reports', description: 'Session statistics for casino and card games.', to: '/reports/game-reports', icon: ShieldCheck },
    { title: 'Profit & Loss', description: 'Breakdown of gains and losses by sport or category.', to: '/reports/profit-loss', icon: TrendingUp }
  ];

  const breadcrumbs = [
    { label: 'Reports' }
  ];

  return (
    <UserLayout>
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left font-sans">
        <ReportsHeader
          title="Account Activity Reports"
          description="Access account summaries, profit ledgers, statement balances, and mock transaction files."
          breadcrumbs={breadcrumbs}
          showExport={false}
        />

        <ReportSummaryCards cards={summaryCards} />

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 font-mono">
            Reports Directory
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.title}
                  href={link.to}
                  className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-5 flex flex-col justify-between hover:bg-[#18233C] hover:border-orange-500/40 transition-all shadow-md group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-[8px] bg-[#090E17] border border-[#233252] flex items-center justify-center text-slate-400 group-hover:text-orange-400 transition-colors">
                      <Icon className="w-4.5 h-4.5 text-orange-400" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide group-hover:text-orange-400 transition-colors font-mono">
                      {link.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed font-medium">
                      {link.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};
export default ReportsHomePage;
