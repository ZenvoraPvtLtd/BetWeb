import React from 'react';
import { UserLayout } from '../components/user/layout/UserLayout';
import { SettingsHeader } from '../components/settings/SettingsHeader';
import { HeartHandshake, Shield, Scale, Info } from 'lucide-react';

export const ResponsibleGamingPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Home', to: '/home' },
    { label: 'Responsible Gaming' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left max-w-4xl">
        <SettingsHeader
          title="Responsible Gaming"
          description="We promote gaming as a leisure activity and encourage healthy gaming habits."
          breadcrumbs={breadcrumbs}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-6 flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 border-b border-zinc-900 pb-3">
              <HeartHandshake className="w-4 h-4 text-[#0EA5E9]" />
              <span>Play Responsibly</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
              Gaming should remain a source of entertainment. Avoid attempting to recover losses, only play with discretionary funds, and monitor the time you spend on the platform.
            </p>
          </div>

          <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-6 flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 border-b border-zinc-900 pb-3">
              <Scale className="w-4 h-4 text-[#0EA5E9]" />
              <span>Set Your Limits</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
              Establish limits before placing your first wager. Decide on maximum daily limits for exposures, bets count, and deposit volumes. Stick to your limits.
            </p>
          </div>

          <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-6 flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 border-b border-zinc-900 pb-3">
              <Shield className="w-4 h-4 text-[#0EA5E9]" />
              <span>Take a Break</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
              If gaming stops feeling like entertainment, take an self-exclusion break. Lock your account settings temporarily to restrict sports matches and casino games access.
            </p>
          </div>

          <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-6 flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 border-b border-zinc-900 pb-3">
              <Info className="w-4 h-4 text-[#0EA5E9]" />
              <span>Get Support</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
              If you or someone you know shows signs of problematic gaming, professional resources and organizations are available globally. Contact our help desk for details.
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};
export default ResponsibleGamingPage;
