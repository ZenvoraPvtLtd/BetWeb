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
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left font-sans">
        <SettingsHeader
          title="My Profile"
          description="View your account information and login security parameters."
          breadcrumbs={breadcrumbs}
        />

        {isLoading ? (
          <div className="flex flex-col gap-4 animate-pulse">
            <div className="h-28 bg-[#131B2E] rounded-[12px] border border-[#1E293B]" />
            <div className="h-28 bg-[#131B2E] rounded-[12px] border border-[#1E293B]" />
          </div>
        ) : (
          <div className="flex flex-col gap-6 max-w-2xl">
            {/* Account Info card */}
            <div className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-6 text-left flex flex-col gap-4 shadow-md font-mono">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2 border-b border-[#1E293B] pb-3">
                <UserCheck className="w-4 h-4 text-orange-400" />
                <span>Account Information</span>
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Username</span>
                  <span className="text-xs font-extrabold text-slate-100 uppercase">{user?.username || 'User'}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">User ID</span>
                  <span className="text-xs font-extrabold text-orange-400">USER-00821</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wider">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Member Since</span>
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>August 2026</span>
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Last Login</span>
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Today, 03:26 AM</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Security Profile card */}
            <div className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-6 text-left flex flex-col gap-4 shadow-md font-mono">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2 border-b border-[#1E293B] pb-3">
                <Shield className="w-4 h-4 text-orange-400" />
                <span>Account Security</span>
              </h3>

              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Password</span>
                  <span className="text-sm font-extrabold text-slate-400 mt-1 tracking-widest">••••••••</span>
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
        )}
      </div>
    </UserLayout>
  );
};
export default ProfilePage;
