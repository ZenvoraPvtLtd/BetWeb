import React, { useState } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const SecurityAuthPage: React.FC = () => {
  const { addToast, showConfirm } = useSettings();

  const [authEnabled, setAuthEnabled] = useState(() => {
    return localStorage.getItem('user_security_auth') === 'true';
  });

  const [method, setMethod] = useState<'pin' | 'otp' | 'authenticator'>('pin');

  const handleToggleAuth = () => {
    if (authEnabled) {
      showConfirm(
        'Disable Security Authentication?',
        'This will remove login confirmation prompts and extra security filters from your account.',
        'Disable Security',
        () => {
          setAuthEnabled(false);
          localStorage.setItem('user_security_auth', 'false');
          addToast('Security authentication disabled successfully', 'success');
        }
      );
    } else {
      setAuthEnabled(true);
      localStorage.setItem('user_security_auth', 'true');
      addToast('Security authentication enabled successfully', 'success');
    }
  };

  const breadcrumbs = [
    { label: 'Account', to: '/settings' },
    { label: 'Security Auth Verification' }
  ];

  return (
    <UserLayout>
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left font-sans">
        <SettingsHeader
          title="Security Auth Verification"
          description="Protect your account settlements by enabling two-factor verification methods."
          breadcrumbs={breadcrumbs}
        />

        <div className="flex flex-col gap-6 max-w-md w-full font-mono">
          <div className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-6 text-left flex flex-col gap-4 shadow-md">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2 border-b border-[#1E293B] pb-3">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>Status Information</span>
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Authentication status</span>
                <span className={`text-[9px] font-extrabold uppercase mt-1.5 px-2 py-0.5 border rounded-full self-start ${
                  authEnabled
                    ? 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30'
                    : 'text-rose-400 bg-rose-500/15 border-rose-500/30'
                }`}>
                  {authEnabled ? 'Enabled' : 'Not Enabled'}
                </span>
              </div>

              <button
                onClick={handleToggleAuth}
                className={`
                  px-4 h-9 rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-all outline-none cursor-pointer border shadow-sm
                  ${
                    authEnabled
                      ? 'bg-rose-500/15 hover:bg-rose-500/25 border-rose-500/30 text-rose-400'
                      : 'bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] border-orange-500 text-white'
                  }
                `}
              >
                {authEnabled ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>

          <div className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-6 text-left flex flex-col gap-4 shadow-md">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2 border-b border-[#1E293B] pb-3">
              <ShieldAlert className="w-4 h-4 text-orange-400" />
              <span>Verification Method</span>
            </h3>

            <div className="flex flex-col gap-2">
              {[
                { id: 'pin', label: 'Security PIN', desc: 'Confirm using a unique 6-digit numeric passcode.' },
                { id: 'otp', label: 'SMS One-Time Passcode (OTP)', desc: 'Verification passcode sent to registered phone.' },
                { id: 'authenticator', label: 'Google Authenticator', desc: 'Secure TOTP verification app authentication.' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id as any)}
                  className={`
                    w-full p-3.5 rounded-[8px] border text-left flex flex-col gap-1 outline-none transition-all cursor-pointer
                    ${
                      method === m.id
                        ? 'bg-orange-500/10 border-orange-500/60 ring-1 ring-orange-500/20'
                        : 'bg-[#090E17] border-[#233252] hover:bg-[#18233C]'
                    }
                  `}
                >
                  <span className="text-[11px] font-bold text-slate-100 uppercase">{m.label}</span>
                  <span className="text-[9px] text-slate-400 leading-normal font-semibold">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};
export default SecurityAuthPage;
