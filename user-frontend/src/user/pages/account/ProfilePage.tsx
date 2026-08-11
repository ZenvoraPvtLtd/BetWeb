import React, { useState, useEffect } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { Shield, Key, Calendar, Clock, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const breadcrumbs = [
    { label: 'Account', to: '/settings' },
    { label: 'My Profile' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <SettingsHeader
          title="My Profile"
          description="View your account information and login security parameters."
          breadcrumbs={breadcrumbs}
        />

        {isLoading ? (
          <div className="flex flex-col gap-4 animate-pulse">
            <div className="h-28 bg-[#111F30] rounded-[12px] border border-slate-700/10" />
            <div className="h-28 bg-[#111F30] rounded-[12px] border border-slate-700/10" />
          </div>
        ) : (
          <div className="flex flex-col gap-6 max-w-2xl">
            {/* Account Info card */}
            <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-6 text-left flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 border-b border-zinc-900 pb-3">
                <UserCheck className="w-4 h-4 text-[#0EA5E9]" />
                <span>Account Information</span>
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Username</span>
                  <span className="text-xs font-extrabold text-white uppercase">{user?.username || 'User'}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">User ID</span>
                  <span className="text-xs font-extrabold text-white">USER-00821</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Status</span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[#22C55E] font-bold uppercase tracking-wider">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Member Since</span>
                  <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>August 2026</span>
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Last Login</span>
                  <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Today, 03:26 AM</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Security Profile card */}
            <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-6 text-left flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 border-b border-zinc-900 pb-3">
                <Shield className="w-4 h-4 text-[#0EA5E9]" />
                <span>Account Security</span>
              </h3>

              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Password</span>
                  <span className="text-sm font-extrabold text-zinc-400 mt-1 tracking-widest">••••••••</span>
                </div>
                <a
                  href="/account/change-password"
                  className="flex items-center gap-1.5 px-4 h-9 rounded-[8px] bg-zinc-900 border border-zinc-850 hover:bg-zinc-850 text-[10px] font-bold uppercase tracking-wider text-white transition-colors cursor-pointer outline-none"
                >
                  <Key className="w-3.5 h-3.5 text-[#0EA5E9]" />
                  <span>Change Password</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};
export default ProfilePage;
