import React from 'react';
import { mockAnnouncements } from '../../mock/super-admin/announcements';
import { Megaphone } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  if (mockAnnouncements.length === 0) return null;

  const latest = mockAnnouncements[0];

  return (
    <div className="w-full bg-[#080C14] border-b border-[#1E293B] px-4 py-2 flex items-center justify-between text-[11px] md:text-xs text-slate-400 select-none">
      <div className="flex items-center gap-2 overflow-hidden mr-4">
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-semibold text-[10px] uppercase tracking-wider shrink-0">
          <Megaphone className="w-3 h-3 text-orange-400 animate-pulse" />
          Notice
        </span>
        <span className="truncate text-slate-300 font-normal">{latest.text}</span>
      </div>
      <div className="text-[10px] text-slate-500 font-medium shrink-0 hidden sm:block uppercase tracking-wider">
        {latest.date}
      </div>
    </div>
  );
};
