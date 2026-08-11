import React, { useState } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { Eye, EyeOff, Lock, AlertCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const ChangePasswordPage: React.FC = () => {
  const { addToast } = useSettings();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const getPasswordStrength = () => {
    if (!newPassword) return null;
    if (newPassword.length < 6) return { label: 'Weak', color: 'text-rose-500 bg-rose-500/10 border-rose-500/20', width: 'w-1/3 bg-rose-500' };

    const hasLetters = /[a-zA-Z]/.test(newPassword);
    const hasNumbers = /[0-9]/.test(newPassword);
    const hasSymbols = /[^a-zA-Z0-9]/.test(newPassword);

    if (newPassword.length >= 8 && hasLetters && hasNumbers && hasSymbols) {
      return { label: 'Strong', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', width: 'w-full bg-emerald-500' };
    }

    return { label: 'Medium', color: 'text-amber-500 bg-amber-500/10 border-amber-500/20', width: 'w-2/3 bg-amber-500' };
  };

  const strength = getPasswordStrength();

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!currentPassword) {
      newErrors.current = 'Current password is required.';
    }
    if (!newPassword) {
      newErrors.new = 'New password is required.';
    } else if (newPassword.length < 6) {
      newErrors.new = 'Password must be at least 6 characters long.';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirm = 'Confirm password does not match.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast('Please correct the validation errors', 'error');
      return;
    }

    setErrors({});
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    addToast('Password updated successfully', 'success');
  };

  const breadcrumbs = [
    { label: 'Account', to: '/settings' },
    { label: 'My Profile', to: '/account/profile' },
    { label: 'Change Password' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <SettingsHeader
          title="Change Password"
          description="Update your security passcode to keep your exchange account secure."
          breadcrumbs={breadcrumbs}
        />

        <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-6 max-w-md w-full">
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 border-b border-zinc-900 pb-3">
              <Lock className="w-4 h-4 text-[#0EA5E9]" />
              <span>Update Password</span>
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`w-full h-10 px-3 pr-10 bg-zinc-950/20 border rounded-[8px] text-xs font-bold text-white outline-none focus:border-[#0EA5E9] ${
                    errors.current ? 'border-rose-500/50' : 'border-zinc-800'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white cursor-pointer outline-none"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.current && (
                <span className="text-[9px] font-bold text-rose-500 flex items-center gap-1 mt-0.5 uppercase tracking-wide">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.current}</span>
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full h-10 px-3 pr-10 bg-zinc-950/20 border rounded-[8px] text-xs font-bold text-white outline-none focus:border-[#0EA5E9] ${
                    errors.new ? 'border-rose-500/50' : 'border-zinc-800'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white cursor-pointer outline-none"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.new && (
                <span className="text-[9px] font-bold text-rose-500 flex items-center gap-1 mt-0.5 uppercase tracking-wide">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.new}</span>
                </span>
              )}

              {strength && (
                <div className="flex flex-col gap-1.5 mt-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase text-zinc-500">Passcode Strength</span>
                    <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 border rounded-full ${strength.color}`}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-300 ${strength.width}`} />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-bold text-zinc-550 uppercase tracking-wider">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full h-10 px-3 pr-10 bg-zinc-950/20 border rounded-[8px] text-xs font-bold text-white outline-none focus:border-[#0EA5E9] ${
                    errors.confirm ? 'border-rose-500/50' : 'border-zinc-800'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white cursor-pointer outline-none"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirm && (
                <span className="text-[9px] font-bold text-rose-500 flex items-center gap-1 mt-0.5 uppercase tracking-wide">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.confirm}</span>
                </span>
              )}
            </div>

            <div className="flex gap-3 justify-end mt-4 border-t border-zinc-900/60 pt-4">
              <a
                href="/account/profile"
                className="px-4 h-9 rounded-[8px] bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center justify-center outline-none"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="px-4 h-9 rounded-[8px] bg-[#0EA5E9] hover:bg-[#0284c7] text-white text-[10px] font-bold uppercase tracking-wider outline-none transition-colors cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};
export default ChangePasswordPage;
