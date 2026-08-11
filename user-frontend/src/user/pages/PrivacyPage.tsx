import React from 'react';
import { UserLayout } from '../components/user/layout/UserLayout';
import { SettingsHeader } from '../components/settings/SettingsHeader';
import { Shield } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Home', to: '/home' },
    { label: 'Privacy Policy' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left max-w-3xl">
        <SettingsHeader
          title="Privacy Policy"
          description="Understand how we securely handle and protect your user account preferences data."
          breadcrumbs={breadcrumbs}
        />

        <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-6 text-zinc-400 text-xs font-semibold leading-relaxed flex flex-col gap-4">
          <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2 border-b border-zinc-900 pb-3">
            <Shield className="w-4 h-4 text-[#0EA5E9]" />
            <span>Privacy Disclosure</span>
          </h3>

          <p>
            1. We collect minimal account information (such as usernames and configuration preference selections) to serve layouts.
          </p>
          <p>
            2. We utilize secure encryption to safeguard logins, and do not store or transmit sensitive financial parameters.
          </p>
          <p>
            3. Cookies and local cache buffers are used solely to preserve collapsible section filters and authentication keys.
          </p>
        </div>
      </div>
    </UserLayout>
  );
};
export default PrivacyPage;
