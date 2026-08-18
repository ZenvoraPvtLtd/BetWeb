import React from 'react';
import { UserLayout } from '../components/user/layout/UserLayout';
import { SettingsHeader } from '../components/settings/SettingsHeader';
import { FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Home', to: '/home' },
    { label: 'Terms & Conditions' }
  ];

  return (
    <UserLayout>
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left max-w-3xl font-sans">
        <SettingsHeader
          title="Terms & Conditions"
          description="Please review our terms of use before placing wagers on the exchange."
          breadcrumbs={breadcrumbs}
        />

        <div className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-6 text-slate-300 text-xs font-medium leading-relaxed flex flex-col gap-4 shadow-md font-mono">
          <h3 className="text-sm font-bold text-slate-100 uppercase flex items-center gap-2 border-b border-[#1E293B] pb-3">
            <FileText className="w-4 h-4 text-orange-400" />
            <span>Exchange Terms of Use</span>
          </h3>

          <p>
            1. By accessing or using the XPLAY5 Exchange interface, you agree to comply with all terms and conditions set forth herein.
          </p>
          <p>
            2. Users must be at least 18 years of age or the legal age of majority in their jurisdiction of residence to open an account.
          </p>
          <p>
            3. All match data, scorecards, and streaming decks provided are mock reference indices. The exchange does not warrant real-time accuracy.
          </p>
          <p>
            4. In the event of system errors, software bugs, or unexpected database exceptions, the exchange reserves the right to void impacted matched bets.
          </p>
        </div>
      </div>
    </UserLayout>
  );
};
export default TermsPage;
