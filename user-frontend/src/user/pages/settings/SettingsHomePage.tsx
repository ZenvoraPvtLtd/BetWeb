import React, { useState, useEffect } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { SettingsCard } from '../../components/settings/SettingsCard';
import { SettingsSkeleton } from '../../components/settings/SettingsSkeleton';
import { ShieldAlert, Mail, Calendar, Dices, CreditCard } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const SettingsHomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { unreadMessagesCount } = useSettings();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const breadcrumbs = [
    { label: 'Settings' }
  ];

  return (
    <UserLayout>
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left font-sans">
        <SettingsHeader
          title="Account Settings & Preferences"
          description="Configure your sports bookmaker markets, view inbox announcements, select transaction wire gateways, and adjust layout features."
          breadcrumbs={breadcrumbs}
        />

        {isLoading ? (
          <SettingsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
            <SettingsCard
              title="Block Markets"
              description="Manage and filter out specific betting markets or odds categories from showing up on match panels."
              to="/settings/block-markets"
              icon={ShieldAlert}
            />

            <div className="relative">
              <SettingsCard
                title="Inbox Messages"
                description="View and read notifications, system alerts, scheduled maintenance updates, and bonus logs."
                to="/settings/messages"
                icon={Mail}
              />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-4 right-4 bg-red-500 border border-[#0B0F19] text-white text-[9px] font-bold px-2 py-0.5 rounded-full animate-bounce">
                  {unreadMessagesCount} Unread
                </span>
              )}
            </div>

            <SettingsCard
              title="Add Match List"
              description="Select from upcoming matches and tournaments lists to customize your dashboard fixtures stream."
              to="/settings/add-match-list"
              icon={Calendar}
            />

            <SettingsCard
              title="Casino Listings"
              description="Toggle enabling or disabling specific roulette, poker, and teenpatti lobby game variations."
              to="/settings/casino-list"
              icon={Dices}
            />

            <SettingsCard
              title="Payment Methods"
              description="Configure preferred bank transfer accounts and virtual UPI payment details for portfolio trades."
              to="/settings/payment-method"
              icon={CreditCard}
            />
          </div>
        )}
      </div>
    </UserLayout>
  );
};
export default SettingsHomePage;
