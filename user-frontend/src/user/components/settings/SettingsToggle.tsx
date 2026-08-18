import React from 'react';

interface SettingsToggleProps {
  enabled: boolean;
  onToggle: () => void;
  label?: string;
  disabled?: boolean;
}

export const SettingsToggle: React.FC<SettingsToggleProps> = ({
  enabled,
  onToggle,
  label,
  disabled = false,
}) => {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none font-sans">
      <div className="relative">
        <input
          type="checkbox"
          checked={enabled}
          onChange={onToggle}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={`
            w-9 h-5 rounded-full border transition-all duration-200 outline-none
            bg-[#090E17] border-[#233252] peer-checked:bg-gradient-to-r peer-checked:from-[#FF5722] peer-checked:to-[#F97316] peer-checked:border-orange-500
            after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-slate-400 after:rounded-full after:h-3.5 after:w-3.5 after:transition-all
            peer-checked:after:translate-x-4 peer-checked:after:bg-white
            ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
          `}
        />
      </div>
      {label && <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">{label}</span>}
    </label>
  );
};
export default SettingsToggle;
