import React, { useState } from 'react';
import { Compass, Trophy, Zap, ChevronRight, Activity } from 'lucide-react';

export const HomeSidebar: React.FC = () => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>('Sports');

  const groups = [
    {
      name: 'Racing',
      icon: Zap,
      items: ['Horse Racing', 'Greyhound Racing'],
    },
    {
      name: 'Others',
      icon: Compass,
      items: ['Lottery Draws', 'Virtual Games'],
    },
    {
      name: 'Sports',
      icon: Trophy,
      items: ['Cricket', 'Tennis', 'Soccer', 'Basketball', 'Volleyball'],
    },
  ];

  return (
    <aside className="w-[220px] bg-[#090D16] border-r border-[#1E293B] hidden md:flex flex-col select-none shrink-0 h-full p-3 gap-2 overflow-y-auto">
      {groups.map((group) => {
        const Icon = group.icon;
        const isExpanded = expandedGroup === group.name;

        return (
          <div key={group.name} className="flex flex-col">
            <button
              onClick={() => setExpandedGroup(isExpanded ? null : group.name)}
              className={`
                w-full h-9 flex items-center justify-between px-3 rounded-[6px] text-xs font-bold tracking-wide uppercase transition-colors outline-none cursor-pointer
                ${
                  isExpanded
                    ? 'bg-[#131B2E] text-white border border-[#233252]'
                    : 'text-slate-400 hover:text-white hover:bg-[#131B2E]/50'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-orange-400" />
                <span>{group.name}</span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                  isExpanded ? 'rotate-90' : ''
                }`}
              />
            </button>

            {isExpanded && (
              <div className="flex flex-col gap-0.5 mt-1 pl-7">
                {group.items.map((item) => (
                  <a
                    key={item}
                    href={`/sports/${item.toLowerCase().replace(' ', '-')}`}
                    className="h-8 flex items-center text-[11px] font-semibold text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="h-[1px] bg-[#1E293B] my-2 mx-1" />

      {/* Quick Stats sidebar banner info */}
      <div className="bg-[#131B2E] border border-[#233252] rounded-[8px] p-3 text-left">
        <div className="flex items-center gap-1.5 text-orange-400 font-bold text-[10px] uppercase tracking-wider font-mono">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>Live Exchange</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
          Access premium mock-bets and real-time live events.
        </p>
      </div>
    </aside>
  );
};
