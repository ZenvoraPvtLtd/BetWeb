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
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
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
            bg-zinc-900 border-zinc-800 peer-checked:bg-[#0EA5E9] peer-checked:border-[#0EA5E9]
            after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-zinc-450 after:rounded-full after:h-3.5 after:w-3.5 after:transition-all
            peer-checked:after:translate-x-4 peer-checked:after:bg-white
            ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
          `}
        />
      </div>
      {label && <span className="text-xs font-bold text-white uppercase tracking-wider">{label}</span>}
    </label>
  );
};
export default SettingsToggle;
