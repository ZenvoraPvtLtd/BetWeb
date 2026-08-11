import React, { useState } from 'react';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SettingsHeader } from '../../components/settings/SettingsHeader';
import { Sliders, Save } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const ButtonValuesPage: React.FC = () => {
  const { addToast } = useSettings();

  const [buttons, setButtons] = useState<number[]>(() => {
    const saved = localStorage.getItem('user_quick_buttons');
    return saved ? JSON.parse(saved) : [10, 50, 100, 500, 1000, 5000];
  });

  const handleValueChange = (index: number, val: string) => {
    const parsed = parseInt(val) || 0;
    const next = [...buttons];
    next[index] = parsed;
    setButtons(next);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user_quick_buttons', JSON.stringify(buttons));
    addToast('Button values saved successfully', 'success');
  };

  const breadcrumbs = [
    { label: 'Account', to: '/settings' },
    { label: 'Set Button Values' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <SettingsHeader
          title="Set Button Values"
          description="Configure your quick-stake button values for fast betslip placement."
          breadcrumbs={breadcrumbs}
        />

        <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-6 max-w-md w-full">
          <form onSubmit={handleSave} className="flex flex-col gap-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 border-b border-zinc-900 pb-3">
              <Sliders className="w-4 h-4 text-[#0EA5E9]" />
              <span>Configure Amounts</span>
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {buttons.map((btn, index) => (
                <div key={index} className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Button {index + 1}</label>
                  <input
                    type="number"
                    value={btn === 0 ? '' : btn}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    className="w-full h-10 px-3 bg-zinc-950/20 border border-zinc-800 rounded-[8px] text-xs font-bold text-white outline-none focus:border-[#0EA5E9] text-center"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 border-t border-zinc-900/60 pt-4 mt-2">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 h-9 rounded-[8px] bg-[#0EA5E9] hover:bg-[#0284c7] text-white text-[10px] font-bold uppercase tracking-wider outline-none transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};
export default ButtonValuesPage;
