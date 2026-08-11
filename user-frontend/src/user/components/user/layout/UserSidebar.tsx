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
  Flame,
  Zap,
  Gem,
  Award,
  Sliders,
  Activity,
  Gamepad,
  LayoutGrid,
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
    { label: 'Horse Racing', to: '/sports/horse-racing', icon: Flame },
    { label: 'Greyhound Racing', to: '/sports/greyhound-racing', icon: Zap }
  ];

  const othersItems = [
    { label: 'Our Casino', to: '/casino/our-casino', icon: Gem, comingSoon: true },
    { label: 'Our VIP Casino', to: '/casino/vip', icon: Award, comingSoon: true },
    { label: 'Our Premium Casino', to: '/casino/premium', icon: Gem, comingSoon: true },
    { label: 'Our Virtual', to: '/casino/virtual', icon: Activity, comingSoon: true },
    { label: 'Live Casino', to: '/casino/live', icon: Dices },
    { label: 'Casino', to: '/casino', icon: Dices },
    { label: 'Mini', to: '/casino/mini', icon: LayoutGrid },
    { label: 'Slots', to: '/casino/slots', icon: Sliders },
    { label: 'Crash', to: '/casino/crash', icon: Activity },
    { label: 'Sports', to: '/sports', icon: Trophy },
    { label: 'Slot Game', to: '/games/slot', icon: Gamepad },
    { label: 'Fantasy Game', to: '/games/fantasy', icon: Sparkles }
  ];

  const gameCategoryItems = [
    'Lottery',
    'Baccarat',
    '32 Cards',
    'Teenpatti',
    'Poker',
    'Lucky 7',
  ];

  const reportItems = [
    { label: 'My Bets', to: '/reports/my-bets' },
    { label: 'Account Statement', to: '/reports/account-statement' },
    { label: 'Current Bets', to: '/reports/current-bets' },
    { label: 'Deleted Bets', to: '/reports/deleted-bets' },
    { label: 'Game Reports', to: '/reports/game-reports' },
    { label: 'Profit & Loss', to: '/reports/profit-loss' }
  ];

  const settingItems = [
    { label: 'Block Markets', to: '/settings/block-markets' },
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
      <div className="h-16 border-b border-zinc-900/60 flex items-center justify-between px-4 shrink-0 bg-[#0B1625]/30 select-none">
        <Logo width={isCollapsed ? 35 : 110} theme="light" />
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 hover:bg-zinc-800 rounded-md text-zinc-550 hover:text-white transition-colors outline-none hidden md:block cursor-pointer"
            aria-label="Collapse Sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  };

  const sidebarContent = (
    <div className="flex-1 flex flex-col h-full bg-[#07111F] text-white select-none">
      {renderLogo()}

      <div className="flex-1 overflow-y-auto py-4 px-2.5 flex flex-col gap-1.5 scrollbar-thin">
        {!isCollapsed && (
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest px-3 mb-1 block">
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
                h-10 w-full flex items-center gap-3 px-3 rounded-[6px] text-xs font-semibold
                transition-all duration-150 relative group outline-none
                ${
                  isActive
                    ? 'bg-[#0EA5E9] text-white shadow-md shadow-[#0EA5E9]/15'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
                }
              `}
            >
              <Icon className={`w-[17px] h-[17px] shrink-0 ${isActive ? 'text-white' : 'text-[#0EA5E9]'}`} />
              {!isCollapsed && <span>{item.label}</span>}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#111F30] text-white text-[11px] font-bold rounded border border-zinc-800 shadow-md opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </a>
          );
        })}

        <div className="h-[1px] bg-zinc-900/60 my-2 mx-1 shrink-0" />

        {/* RACING Section */}
        <div className="flex flex-col">
          <button
            onClick={() => !isCollapsed && toggleRacing()}
            className={`
              h-9 w-full flex items-center justify-between px-3 rounded-[6px] text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-900/20 outline-none transition-colors relative group
              ${isCollapsed ? 'pointer-events-none' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-3">
              <Compass className="w-[17px] h-[17px] text-[#0EA5E9] shrink-0" />
              {!isCollapsed && <span>Racing</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-550 transition-transform ${
                  racingExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#111F30] text-white text-[11px] font-bold rounded border border-zinc-800 shadow-md opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                Racing
              </div>
            )}
          </button>

          {!isCollapsed && racingExpanded && (
            <div className="flex flex-col gap-0.5 pl-9 mt-1 pr-1 border-l border-zinc-900 ml-[21px]">
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
                      ${isActive ? 'text-[#0EA5E9]' : 'text-zinc-455 hover:text-white'}
                    `}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
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
              h-9 w-full flex items-center justify-between px-3 rounded-[6px] text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-900/20 outline-none transition-colors relative group
              ${isCollapsed ? 'pointer-events-none' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-3">
              <Dices className="w-[17px] h-[17px] text-[#0EA5E9] shrink-0" />
              {!isCollapsed && <span>Others</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-550 transition-transform ${
                  othersExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#111F30] text-white text-[11px] font-bold rounded border border-zinc-800 shadow-md opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                Others
              </div>
            )}
          </button>

          {!isCollapsed && othersExpanded && (
            <div className="flex flex-col gap-0.5 pl-9 mt-1 pr-1 border-l border-zinc-900 ml-[21px]">
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
                      ${isActive ? 'text-[#0EA5E9]' : 'text-zinc-450 hover:text-white'}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.comingSoon && (
                      <span className="text-[7px] px-1 py-0.2 rounded border border-zinc-800 bg-zinc-950/20 text-zinc-500 font-bold uppercase tracking-wider scale-90 shrink-0">
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
              h-9 w-full flex items-center justify-between px-3 rounded-[6px] text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-900/20 outline-none transition-colors relative group
              ${isCollapsed ? 'pointer-events-none' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-[17px] h-[17px] text-[#0EA5E9] shrink-0" />
              {!isCollapsed && <span>Sports</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-550 transition-transform ${
                  sportsExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#111F30] text-white text-[11px] font-bold rounded border border-zinc-800 shadow-md opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                Sports
              </div>
            )}
          </button>

          {!isCollapsed && sportsExpanded && (
            <div className="flex flex-col gap-0.5 pl-9 mt-1 pr-1 border-l border-zinc-900 ml-[21px]">
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
                      ${isActive ? 'text-[#0EA5E9]' : 'text-zinc-450 hover:text-white'}
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
              h-9 w-full flex items-center justify-between px-3 rounded-[6px] text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-900/20 outline-none transition-colors relative group
              ${isCollapsed ? 'pointer-events-none' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-[17px] h-[17px] text-[#0EA5E9] shrink-0" />
              {!isCollapsed && <span>Game Categories</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-550 transition-transform ${
                  gamesExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#111F30] text-white text-[11px] font-bold rounded border border-zinc-800 shadow-md opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                Games
              </div>
            )}
          </button>

          {!isCollapsed && gamesExpanded && (
            <div className="flex flex-col gap-0.5 pl-9 mt-1 pr-1 border-l border-zinc-900 ml-[21px]">
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
                      ${isActive ? 'text-[#0EA5E9]' : 'text-zinc-455 hover:text-white'}
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
              h-9 w-full flex items-center justify-between px-3 rounded-[6px] text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-900/20 outline-none transition-colors relative group
              ${isCollapsed ? 'pointer-events-none' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-3">
              <ClipboardList className="w-[17px] h-[17px] text-[#0EA5E9] shrink-0" />
              {!isCollapsed && <span>Reports</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-550 transition-transform ${
                  reportsExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#111F30] text-white text-[11px] font-bold rounded border border-zinc-800 shadow-md opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                Reports
              </div>
            )}
          </button>

          {!isCollapsed && reportsExpanded && (
            <div className="flex flex-col gap-0.5 pl-9 mt-1 pr-1 border-l border-zinc-900 ml-[21px]">
              {reportItems.map((rep) => {
                const isActive = location.pathname === rep.to;
                return (
                  <a
                    key={rep.label}
                    href={rep.to}
                    onClick={(e) => handleLinkClick(e, rep.to)}
                    className={`
                      h-8 flex items-center text-[11px] font-semibold transition-colors
                      ${isActive ? 'text-[#0EA5E9]' : 'text-zinc-400 hover:text-white'}
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
              h-9 w-full flex items-center justify-between px-3 rounded-[6px] text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-900/20 outline-none transition-colors relative group
              ${isCollapsed ? 'pointer-events-none' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-[17px] h-[17px] text-[#0EA5E9] shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-550 transition-transform ${
                  settingsExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#111F30] text-white text-[11px] font-bold rounded border border-zinc-800 shadow-md opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                Settings
              </div>
            )}
          </button>

          {!isCollapsed && settingsExpanded && (
            <div className="flex flex-col gap-0.5 pl-9 mt-1 pr-1 border-l border-zinc-900 ml-[21px]">
              {settingItems.map((set) => {
                const isActive = location.pathname === set.to;
                return (
                  <a
                    key={set.label}
                    href={set.to}
                    onClick={(e) => handleLinkClick(e, set.to)}
                    className={`
                      h-8 flex items-center justify-between text-[11px] font-semibold transition-colors pr-1
                      ${isActive ? 'text-[#0EA5E9]' : 'text-zinc-400 hover:text-white'}
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
              h-9 w-full flex items-center justify-between px-3 rounded-[6px] text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-900/20 outline-none transition-colors relative group
              ${isCollapsed ? 'pointer-events-none' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-3">
              <CircleUser className="w-[17px] h-[17px] text-[#0EA5E9] shrink-0" />
              {!isCollapsed && <span>Account</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-550 transition-transform ${
                  accountExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#111F30] text-white text-[11px] font-bold rounded border border-zinc-800 shadow-md opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                Account
              </div>
            )}
          </button>

          {!isCollapsed && accountExpanded && (
            <div className="flex flex-col gap-0.5 pl-9 mt-1 pr-1 border-l border-zinc-900 ml-[21px]">
              {accountItems.map((acc) => {
                const isActive = location.pathname === acc.to;
                return (
                  <a
                    key={acc.label}
                    href={acc.to}
                    onClick={(e) => handleLinkClick(e, acc.to)}
                    className={`
                      h-8 flex items-center text-[11px] font-semibold transition-colors
                      ${isActive ? 'text-[#0EA5E9]' : 'text-zinc-400 hover:text-white'}
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
        <div className="h-12 border-t border-zinc-900/60 flex items-center justify-center p-2 shrink-0 bg-[#0B1625]/20">
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-8 h-8 rounded-[6px] hover:bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white transition-colors outline-none cursor-pointer"
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
          hidden md:flex flex-col h-full shrink-0 select-none border-r border-zinc-900/60 transition-all duration-200 ease-in-out
          ${isCollapsed ? 'w-[72px]' : 'w-[250px]'}
        `}
      >
        {sidebarContent}
      </aside>

      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/40 backdrop-blur-3xs transition-opacity duration-200"
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
