import React, { useState } from 'react';

export const HomeNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('HOME');
  const tabs = ['HOME', 'LOTTERY', 'TENNIS', 'CRICKET', 'BACCARAT'];

  return (
    <nav className="h-[42px] w-full bg-[#181A20] border-b border-zinc-900/50 flex items-center px-4 overflow-x-auto scrollbar-none select-none shrink-0 z-30">
      <div className="flex items-center gap-1.5 h-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              h-full px-4 text-[11px] font-bold tracking-wider uppercase transition-all outline-none cursor-pointer relative
              ${
                activeTab === tab
                  ? 'text-[#078FCB]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }
            `}
          >
            <span>{tab}</span>
            {activeTab === tab && (
              <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#078FCB] rounded-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
