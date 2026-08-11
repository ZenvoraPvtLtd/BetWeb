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
    <div className="flex flex-col gap-3 select-none text-left">
      <Breadcrumbs items={breadcrumbs} />

      <div className="pb-4 border-b border-zinc-900">
        <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">{title}</h2>
        <p className="text-xs text-zinc-450 mt-1 font-semibold">{description}</p>
      </div>
    </div>
  );
};
export default SettingsHeader;
