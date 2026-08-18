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
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none text-left font-sans">
        <SettingsHeader
          title="Set Button Values"
          description="Configure your quick-stake button values for fast betslip placement."
          breadcrumbs={breadcrumbs}
        />

        <div className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-6 max-w-md w-full shadow-md font-mono">
          <form onSubmit={handleSave} className="flex flex-col gap-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2 border-b border-[#1E293B] pb-3">
              <Sliders className="w-4 h-4 text-orange-400" />
              <span>Configure Amounts</span>
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {buttons.map((btn, index) => (
                <div key={index} className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Button {index + 1}</label>
                  <input
                    type="number"
                    value={btn === 0 ? '' : btn}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    className="w-full h-10 px-3 bg-[#090E17] border border-[#233252] rounded-[8px] text-xs font-bold text-slate-100 outline-none focus:border-orange-500 text-center transition-colors"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 border-t border-[#1E293B] pt-4 mt-2">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 h-9 rounded-[8px] bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white text-[10px] font-bold uppercase tracking-wider outline-none transition-all cursor-pointer shadow-md shadow-orange-950/40"
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
