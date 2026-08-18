import React, { useState } from 'react';
import { Logo } from '../../common/Logo';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Play,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Dices,
  Sparkles,
  ClipboardList,
  Settings,
  CircleUser,
  Compass
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useSettings } from '../../../context/SettingsContext';

interface SidebarItem {
  label: string;
  icon: LucideIcon;
  to: string;
}

interface UserSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const UserSidebar: React.FC<UserSidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  isOpenMobile,
  onCloseMobile,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useSettings();

  const [racingExpanded, setRacingExpanded] = useState(() => {
    return localStorage.getItem('sidebar_racing_open') !== 'false';
  });
  const [othersExpanded, setOthersExpanded] = useState(() => {
    return localStorage.getItem('sidebar_others_open') !== 'false';
  });
  const [sportsExpanded, setSportsExpanded] = useState(() => {
    return localStorage.getItem('sidebar_sports_open') !== 'false';
  });
  const [gamesExpanded, setGamesExpanded] = useState(false);
  const [reportsExpanded, setReportsExpanded] = useState(false);
  const [settingsExpanded, setSettingsExpanded] = useState(false);
  const [accountExpanded, setAccountExpanded] = useState(false);

  const toggleRacing = () => {
    const next = !racingExpanded;
    setRacingExpanded(next);
    localStorage.setItem('sidebar_racing_open', String(next));
  };

  const toggleOthers = () => {
    const next = !othersExpanded;
    setOthersExpanded(next);
    localStorage.setItem('sidebar_others_open', String(next));
  };

  const toggleSports = () => {
    const next = !sportsExpanded;
    setSportsExpanded(next);
    localStorage.setItem('sidebar_sports_open', String(next));
  };

  const mainNavItems: SidebarItem[] = [
    { label: 'Home', icon: Home, to: '/home' },
    { label: 'Live Now', icon: Play, to: '#live-now' },
  ];

  const sportsItems = [
    'Golf',
    'Kabaddi',
    'E Games',
    'Soccer',
    'Tennis',
    'Basketball',
    'Futsal',
    'Cricket',
    'Table Tennis',
    'Volleyball',
    'Snooker',
  ];

  const racingItems = [
    { label: 'Horse Racing', to: '/sports/horse-racing', icon: Trophy },
    { label: 'Greyhound Racing', to: '/sports/greyhound-racing', icon: Trophy }
  ];

  const othersItems = [
    { label: 'Live Casino', to: '/casino', icon: Sparkles, comingSoon: false },
    { label: 'Crash Games', to: '/games/crash', icon: Sparkles, comingSoon: false },
    { label: 'Slot Games', to: '/games/slots', icon: Dices, comingSoon: true },
    { label: 'Fantasy Sports', to: '/sports/fantasy', icon: Trophy, comingSoon: true }
  ];

  const gameCategoryItems = [
    'Teenpatti',
    'Casino',
    'Cards 32',
    'Crash',
    'Lucky 7',
    'Lottery'
  ];

  const reportItems = [
    { label: 'Account Statement', to: '/reports/account-statement' },
    { label: 'Deposit Statement', to: '/reports/deposit-statement' },
    { label: 'Withdraw Statement', to: '/reports/withdraw-statement' },
    { label: 'Profit Loss', to: '/reports/profit-loss' },
    { label: 'Bet History', to: '/reports/bet-history' },
    { label: 'Live Current Bets', to: '/reports/current-bets' },
    { label: 'Unsettled Bet', to: '/reports/unsettled-bet' },
    { label: 'Game Reports', to: '/reports/game-reports' },
    { label: 'Casino History', to: '/reports/casino-report-history' }
  ];

  const settingItems = [
    { label: 'Block Markets', to: '/settings/block-markets' },
    { label: 'Casino Settings', to: '/settings/casino' },
    { label: 'Messages', to: '/settings/messages', badge: true },
    { label: 'Add Match List', to: '/settings/add-match-list' },
    { label: 'Casino List', to: '/settings/casino-list' },
    { label: 'Payment Method', to: '/settings/payment-method' }
  ];

  const accountItems = [
    { label: 'Profile', to: '/account/profile' },
    { label: 'My Bets', to: '/reports/my-bets' },
    { label: 'Account Statement', to: '/reports/account-statement' },
    { label: 'Change Password', to: '/account/change-password' },
    { label: 'Settings', to: '/account/settings' }
  ];

  const handleLinkClick = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    onCloseMobile();
    if (to.startsWith('#')) {
      const el = document.getElementById(to.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(to);
    }
  };

  const handleOthersItemClick = (e: React.MouseEvent, item: typeof othersItems[0]) => {
    e.preventDefault();
    if (item.comingSoon) {
      addToast('This section is coming soon.', 'info');
      return;
    }
    handleLinkClick(e, item.to);
  };

  const renderLogo = () => {
    return (
      <div className="h-16 border-b border-[#1E293B] flex items-center justify-between px-4 shrink-0 bg-[#0E1524] select-none">
        <Logo width={isCollapsed ? 35 : 110} theme="light" />
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 hover:bg-[#18233C] rounded-md text-slate-400 hover:text-white transition-colors outline-none hidden md:block cursor-pointer"
            aria-label="Collapse Sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  };

  const sidebarContent = (
    <div className="flex-1 flex flex-col h-full bg-[#090D16] text-[#F8FAFC] select-none">
      {renderLogo()}

      <div className="flex-1 overflow-y-auto py-4 px-2.5 flex flex-col gap-1.5 scrollbar-thin">
        {!isCollapsed && (
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-1 block font-mono">
            Main
          </span>
        )}

        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <a
              key={item.label}
              href={item.to}
              onClick={(e) => handleLinkClick(e, item.to)}
              className={`
                h-10 w-full flex items-center gap-3 px-3 rounded-[8px] text-xs font-semibold
                transition-all duration-150 relative group outline-none
                ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white shadow-md shadow-orange-950/40'
                    : 'text-slate-400 hover:text-white hover:bg-[#131B2E]'
                }
              `}
            >
              <Icon className={`w-[17px] h-[17px] shrink-0 ${isActive ? 'text-white' : 'text-orange-400'}`} />
              {!isCollapsed && <span>{item.label}</span>}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#131B2E] text-white text-[11px] font-bold rounded border border-[#233252] shadow-xl opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </a>
          );
        })}

        <div className="h-[1px] bg-[#1E293B] my-2 mx-1 shrink-0" />

        {/* RACING Section */}
        <div className="flex flex-col">
          <button
            onClick={() => !isCollapsed && toggleRacing()}
            className={`
              h-9 w-full flex items-center justify-between px-3 rounded-[6px] text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-[#131B2E] outline-none transition-colors relative group
              ${isCollapsed ? 'pointer-events-none' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-3">
              <Compass className="w-[17px] h-[17px] text-orange-400 shrink-0" />
              {!isCollapsed && <span>Racing</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                  racingExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#131B2E] text-white text-[11px] font-bold rounded border border-[#233252] shadow-xl opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                Racing
              </div>
            )}
          </button>

          {!isCollapsed && racingExpanded && (
            <div className="flex flex-col gap-0.5 pl-9 mt-1 pr-1 border-l border-[#1E293B] ml-[21px]">
              {racingItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <a
                    key={item.label}
                    href={item.to}
                    onClick={(e) => handleLinkClick(e, item.to)}
                    className={`
                      h-8 flex items-center gap-2 text-[11px] font-semibold transition-colors
                      ${isActive ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-white'}
                    `}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* OTHERS Section */}
        <div className="flex flex-col mt-1">
          <button
            onClick={() => !isCollapsed && toggleOthers()}
            className={`
              h-9 w-full flex items-center justify-between px-3 rounded-[6px] text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-[#131B2E] outline-none transition-colors relative group
              ${isCollapsed ? 'pointer-events-none' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-3">
              <Dices className="w-[17px] h-[17px] text-orange-400 shrink-0" />
              {!isCollapsed && <span>Others</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                  othersExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#131B2E] text-white text-[11px] font-bold rounded border border-[#233252] shadow-xl opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                Others
              </div>
            )}
          </button>

          {!isCollapsed && othersExpanded && (
            <div className="flex flex-col gap-0.5 pl-9 mt-1 pr-1 border-l border-[#1E293B] ml-[21px]">
              {othersItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <a
                    key={item.label}
                    href={item.to}
                    onClick={(e) => handleOthersItemClick(e, item)}
                    className={`
                      h-8 flex items-center justify-between text-[11px] font-semibold transition-colors pr-1
                      ${item.comingSoon ? 'opacity-40 hover:opacity-60' : ''}
                      ${isActive ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-white'}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                      <span>{item.label}</span>
                    </div>
                    {item.comingSoon && (
                      <span className="text-[7px] px-1 py-0.2 rounded border border-[#233252] bg-[#090E17] text-slate-500 font-bold uppercase tracking-wider scale-90 shrink-0">
                        Soon
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* SPORTS Section */}
        <div className="flex flex-col mt-1">
          <button
            onClick={() => !isCollapsed && toggleSports()}
            className={`
              h-9 w-full flex items-center justify-between px-3 rounded-[6px] text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-[#131B2E] outline-none transition-colors relative group
              ${isCollapsed ? 'pointer-events-none' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-[17px] h-[17px] text-orange-400 shrink-0" />
              {!isCollapsed && <span>Sports</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                  sportsExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#131B2E] text-white text-[11px] font-bold rounded border border-[#233252] shadow-xl opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                Sports
              </div>
            )}
          </button>

          {!isCollapsed && sportsExpanded && (
            <div className="flex flex-col gap-0.5 pl-9 mt-1 pr-1 border-l border-[#1E293B] ml-[21px]">
              {sportsItems.map((sport) => {
                const route = `/sports/${sport.toLowerCase().replace(' ', '-')}`;
                const isActive = location.pathname === route;
                return (
                  <a
                    key={sport}
                    href={route}
                    onClick={(e) => handleLinkClick(e, route)}
                    className={`
                      h-8 flex items-center text-[11px] font-semibold transition-colors
                      ${isActive ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-white'}
                    `}
                  >
                    {sport}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* GAME CATEGORIES Section */}
        <div className="flex flex-col mt-1">
          <button
            onClick={() => !isCollapsed && setGamesExpanded(!gamesExpanded)}
            className={`
              h-9 w-full flex items-center justify-between px-3 rounded-[6px] text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-[#131B2E] outline-none transition-colors relative group
              ${isCollapsed ? 'pointer-events-none' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-[17px] h-[17px] text-orange-400 shrink-0" />
              {!isCollapsed && <span>Game Categories</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                  gamesExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#131B2E] text-white text-[11px] font-bold rounded border border-[#233252] shadow-xl opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                Games
              </div>
            )}
          </button>

          {!isCollapsed && gamesExpanded && (
            <div className="flex flex-col gap-0.5 pl-9 mt-1 pr-1 border-l border-[#1E293B] ml-[21px]">
              {gameCategoryItems.map((game) => {
                let route = `/games/${game.toLowerCase().replace(' ', '-')}`;
                if (game === 'Teenpatti') {
                  route = '/games/teenpatti';
                } else if (game === 'Lottery') {
                  route = '/sports/cricket';
                } else if (game === 'Lucky 7') {
                  route = '/games/lucky7';
                }
                const isActive = location.pathname === route;
                return (
                  <a
                    key={game}
                    href={route}
                    onClick={(e) => handleLinkClick(e, route)}
                    className={`
                      h-8 flex items-center text-[11px] font-semibold transition-colors
                      ${isActive ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-white'}
                    `}
                  >
                    {game}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* REPORTS Section */}
        <div className="flex flex-col mt-1">
          <button
            onClick={() => !isCollapsed && setReportsExpanded(!reportsExpanded)}
            className={`
              h-9 w-full flex items-center justify-between px-3 rounded-[6px] text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-[#131B2E] outline-none transition-colors relative group
              ${isCollapsed ? 'pointer-events-none' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-3">
              <ClipboardList className="w-[17px] h-[17px] text-orange-400 shrink-0" />
              {!isCollapsed && <span>Reports</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                  reportsExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#131B2E] text-white text-[11px] font-bold rounded border border-[#233252] shadow-xl opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                Reports
              </div>
            )}
          </button>

          {!isCollapsed && reportsExpanded && (
            <div className="flex flex-col gap-0.5 pl-9 mt-1 pr-1 border-l border-[#1E293B] ml-[21px]">
              {reportItems.map((rep) => {
                const isActive = location.pathname === rep.to;
                return (
                  <a
                    key={rep.label}
                    href={rep.to}
                    onClick={(e) => handleLinkClick(e, rep.to)}
                    className={`
                      h-8 flex items-center text-[11px] font-semibold transition-colors
                      ${isActive ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-white'}
                    `}
                  >
                    {rep.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* SETTINGS Section */}
        <div className="flex flex-col mt-1">
          <button
            onClick={() => !isCollapsed && setSettingsExpanded(!settingsExpanded)}
            className={`
              h-9 w-full flex items-center justify-between px-3 rounded-[6px] text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-[#131B2E] outline-none transition-colors relative group
              ${isCollapsed ? 'pointer-events-none' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-[17px] h-[17px] text-orange-400 shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                  settingsExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#131B2E] text-white text-[11px] font-bold rounded border border-[#233252] shadow-xl opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                Settings
              </div>
            )}
          </button>

          {!isCollapsed && settingsExpanded && (
            <div className="flex flex-col gap-0.5 pl-9 mt-1 pr-1 border-l border-[#1E293B] ml-[21px]">
              {settingItems.map((set) => {
                const isActive = location.pathname === set.to;
                return (
                  <a
                    key={set.label}
                    href={set.to}
                    onClick={(e) => handleLinkClick(e, set.to)}
                    className={`
                      h-8 flex items-center justify-between text-[11px] font-semibold transition-colors pr-1
                      ${isActive ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-white'}
                    `}
                  >
                    <span>{set.label}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* ACCOUNT Section */}
        <div className="flex flex-col mt-1">
          <button
            onClick={() => !isCollapsed && setAccountExpanded(!accountExpanded)}
            className={`
              h-9 w-full flex items-center justify-between px-3 rounded-[6px] text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-[#131B2E] outline-none transition-colors relative group
              ${isCollapsed ? 'pointer-events-none' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-3">
              <CircleUser className="w-[17px] h-[17px] text-orange-400 shrink-0" />
              {!isCollapsed && <span>Account</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                  accountExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#131B2E] text-white text-[11px] font-bold rounded border border-[#233252] shadow-xl opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                Account
              </div>
            )}
          </button>

          {!isCollapsed && accountExpanded && (
            <div className="flex flex-col gap-0.5 pl-9 mt-1 pr-1 border-l border-[#1E293B] ml-[21px]">
              {accountItems.map((acc) => {
                const isActive = location.pathname === acc.to;
                return (
                  <a
                    key={acc.label}
                    href={acc.to}
                    onClick={(e) => handleLinkClick(e, acc.to)}
                    className={`
                      h-8 flex items-center text-[11px] font-semibold transition-colors
                      ${isActive ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-white'}
                    `}
                  >
                    {acc.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {isCollapsed && (
        <div className="h-12 border-t border-[#1E293B] flex items-center justify-center p-2 shrink-0 bg-[#0E1524]">
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-8 h-8 rounded-[6px] hover:bg-[#18233C] flex items-center justify-center text-slate-400 hover:text-white transition-colors outline-none cursor-pointer"
            aria-label="Expand Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <aside
        className={`
          hidden md:flex flex-col h-full shrink-0 select-none border-r border-[#1E293B] transition-all duration-200 ease-in-out
          ${isCollapsed ? 'w-[72px]' : 'w-[250px]'}
        `}
      >
        {sidebarContent}
      </aside>

      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
          />
          <div className="relative flex flex-col w-[250px] max-w-[80vw] h-full shadow-2xl animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
export default UserSidebar;
