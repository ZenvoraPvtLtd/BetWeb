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
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <SettingsHeader
          title="Security Auth Verification"
          description="Protect your account settlements by enabling two-factor verification methods."
          breadcrumbs={breadcrumbs}
        />

        <div className="flex flex-col gap-6 max-w-md w-full">
          <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-6 text-left flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 border-b border-zinc-900 pb-3">
              <ShieldCheck className="w-4 h-4 text-[#0EA5E9]" />
              <span>Status Information</span>
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Authentication status</span>
                <span className={`text-[9px] font-extrabold uppercase mt-1.5 px-2 py-0.5 border rounded-full self-start ${
                  authEnabled
                    ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
                    : 'text-rose-500 bg-rose-500/10 border-rose-500/20'
                }`}>
                  {authEnabled ? 'Enabled' : 'Not Enabled'}
                </span>
              </div>

              <button
                onClick={handleToggleAuth}
                className={`
                  px-4 h-9 rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-colors outline-none cursor-pointer border
                  ${
                    authEnabled
                      ? 'bg-rose-500/10 hover:bg-rose-500/15 border-rose-500/20 text-rose-500'
                      : 'bg-[#0EA5E9] hover:bg-[#0284c7] border-[#0EA5E9] text-white'
                  }
                `}
              >
                {authEnabled ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>

          <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-6 text-left flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 border-b border-zinc-900 pb-3">
              <ShieldAlert className="w-4 h-4 text-[#0EA5E9]" />
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
                        ? 'bg-[#0ea5e9]/5 border-[#0EA5E9]'
                        : 'bg-zinc-950/20 border-zinc-800/80 hover:bg-zinc-900/10'
                    }
                  `}
                >
                  <span className="text-[11px] font-bold text-white uppercase">{m.label}</span>
                  <span className="text-[9px] text-zinc-550 leading-normal font-semibold">{m.desc}</span>
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
