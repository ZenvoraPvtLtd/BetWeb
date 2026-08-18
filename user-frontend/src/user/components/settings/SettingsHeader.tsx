import React from 'react';
import { Breadcrumbs } from '../user/layout/Breadcrumbs';

interface SettingsHeaderProps {
  title: string;
  description: string;
  breadcrumbs: { label: string; to?: string }[];
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title,
  description,
  breadcrumbs,
}) => {
  return (
    <div className="flex flex-col gap-3 select-none text-left font-sans">
      <Breadcrumbs items={breadcrumbs} />

      <div className="pb-4 border-b border-[#1E293B]">
        <h2 className="text-xl font-extrabold text-slate-100 uppercase tracking-wider font-mono">{title}</h2>
        <p className="text-xs text-slate-400 mt-1 font-semibold">{description}</p>
      </div>
    </div>
  );
};
export default SettingsHeader;
