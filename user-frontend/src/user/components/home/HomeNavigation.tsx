import React, { useState } from 'react';

export const HomeNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('HOME');
  const tabs = ['HOME', 'LOTTERY', 'TENNIS', 'CRICKET', 'BACCARAT'];

  return (
    <nav className="h-[42px] w-full bg-[#0E1524] border-b border-[#1E293B] flex items-center px-4 overflow-x-auto scrollbar-none select-none shrink-0 z-30">
      <div className="flex items-center gap-1.5 h-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              h-full px-4 text-[11px] font-bold tracking-wider uppercase transition-all outline-none cursor-pointer relative font-mono
              ${
                activeTab === tab
                  ? 'text-orange-400 font-extrabold'
                  : 'text-slate-400 hover:text-slate-200'
              }
            `}
          >
            <span>{tab}</span>
            {activeTab === tab && (
              <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-orange-500 rounded-full shadow-[0_0_8px_rgba(255,87,34,0.8)]" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
