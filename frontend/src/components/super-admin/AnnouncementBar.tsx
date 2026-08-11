import React from 'react';
import { mockAnnouncements } from '../../mock/super-admin/announcements';
import { Volume2 } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  if (mockAnnouncements.length === 0) return null;

  // Display the latest announcement in a premium top banner
  const latest = mockAnnouncements[0];

  return (
    <div className="w-full bg-zinc-950 border-b border-zinc-900 px-4 py-2 flex items-center justify-between text-[11px] md:text-xs text-zinc-400 select-none">
      <div className="flex items-center gap-2 overflow-hidden mr-4">
        <Volume2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
        <span className="font-semibold text-zinc-300 shrink-0">Latest:</span>
        <span className="truncate text-zinc-400 font-normal">{latest.text}</span>
      </div>
      <div className="text-[10px] text-zinc-600 font-medium shrink-0 hidden sm:block uppercase tracking-wider">
        {latest.date}
      </div>
    </div>
  );
};
