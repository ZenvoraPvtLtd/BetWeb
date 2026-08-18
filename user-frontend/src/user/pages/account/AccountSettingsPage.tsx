import React, { useState } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { SettingsToggle } from '../../components/settings/SettingsToggle';
import { Bell, Palette, ShieldAlert, Key } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const AccountSettingsPage: React.FC = () => {
  const { addToast } = useSettings();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [inAppAlerts, setInAppAlerts] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const handleToggle = (key: string, val: boolean, setter: (v: boolean) => void) => {
    setter(val);
    addToast(`${key} updated successfully`, 'success');
  };

  const breadcrumbs = [
    { label: 'Account', to: '/settings' },
    { label: 'Account Settings' }
  ];

  return (
    <UserLayout>
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left font-sans">
        <SettingsHeader
          title="Account Settings"
          description="Customize display options, notification settings, and security flags."
          breadcrumbs={breadcrumbs}
        />

        <div className="flex flex-col gap-6 max-w-2xl font-mono">
          <div className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-6 text-left flex flex-col gap-4 shadow-md">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2 border-b border-[#1E293B] pb-3">
              <Bell className="w-4 h-4 text-orange-400" />
              <span>Notification Preferences</span>
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between py-2 border-b border-[#1E293B] last:border-0 last:pb-0">
                <div className="flex flex-col text-left mr-4">
                  <span className="text-xs font-bold text-slate-100 uppercase tracking-wider">Email Notifications</span>
                  <span className="text-[10px] text-slate-400 mt-1 leading-relaxed">Receive updates on settlements, deposit completions, and login alerts.</span>
                </div>
                <SettingsToggle
                  enabled={emailAlerts}
                  onToggle={() => handleToggle('Email Alerts', !emailAlerts, setEmailAlerts)}
                />
              </div>

              <div className="flex items-start justify-between py-2 border-b border-[#1E293B] last:border-0 last:pb-0">
                <div className="flex flex-col text-left mr-4">
                  <span className="text-xs font-bold text-slate-100 uppercase tracking-wider">In-App Announcement Messages</span>
                  <span className="text-[10px] text-slate-400 mt-1 leading-relaxed">Enable popup warnings for game alerts and maintenance windows.</span>
                </div>
                <SettingsToggle
                  enabled={inAppAlerts}
                  onToggle={() => handleToggle('In-App Alerts', !inAppAlerts, setInAppAlerts)}
                />
              </div>
            </div>
          </div>

          <div className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-6 text-left flex flex-col gap-4 shadow-md">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2 border-b border-[#1E293B] pb-3">
              <Palette className="w-4 h-4 text-orange-400" />
              <span>Display Preferences</span>
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between py-2 border-b border-[#1E293B] last:border-0 last:pb-0">
                <div className="flex flex-col text-left mr-4">
                  <span className="text-xs font-bold text-slate-100 uppercase tracking-wider">Compact Betting Rows</span>
                  <span className="text-[10px] text-slate-400 mt-1 leading-relaxed">Reduces betting rows padding to show more live exchange match grids on desktop screen sizes.</span>
                </div>
                <SettingsToggle
                  enabled={compactMode}
                  onToggle={() => handleToggle('Compact View', !compactMode, setCompactMode)}
                />
              </div>

              <div className="flex items-start justify-between py-2 border-b border-[#1E293B] last:border-0 last:pb-0">
                <div className="flex flex-col text-left mr-4">
                  <span className="text-xs font-bold text-slate-100 uppercase tracking-wider">Contrast Booster Grid Layout</span>
                  <span className="text-[10px] text-slate-400 mt-1 leading-relaxed">Increases contrast margins between Back/Lay panels for improved visibility.</span>
                </div>
                <SettingsToggle
                  enabled={highContrast}
                  onToggle={() => handleToggle('High Contrast Settings', !highContrast, setHighContrast)}
                />
              </div>
            </div>
          </div>

          <div className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-6 text-left flex flex-col gap-4 shadow-md">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2 border-b border-[#1E293B] pb-3">
              <ShieldAlert className="w-4 h-4 text-orange-400" />
              <span>Security Settings</span>
            </h3>

            <div className="flex justify-between items-center py-2">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-slate-100 uppercase tracking-wider">Account Password</span>
                <span className="text-[10px] text-slate-400 mt-1">Keep your passcode robust and rotate it regularly.</span>
              </div>
              <a
                href="/account/change-password"
                className="flex items-center gap-1.5 px-4 h-9 rounded-[8px] bg-[#18233C] border border-[#2B3C60] hover:bg-[#223050] text-[10px] font-bold uppercase tracking-wider text-slate-100 transition-colors cursor-pointer outline-none shadow-sm"
              >
                <Key className="w-3.5 h-3.5 text-orange-400" />
                <span>Change Password</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};
export default AccountSettingsPage;
