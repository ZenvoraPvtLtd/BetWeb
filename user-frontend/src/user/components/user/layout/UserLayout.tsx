import React, { useState } from 'react';
import { UserSidebar } from './UserSidebar';
import { UserHeader } from './UserHeader';
import { UserFooter } from './UserFooter';
import { TopNavigation } from './TopNavigation';
import { MatchTicker } from './MatchTicker';

interface UserLayoutProps {
  children: React.ReactNode;
}

export const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="w-full h-screen flex bg-[#07111F] text-white overflow-hidden relative">
      {/* Collapsible/Expandable Left Sidebar Drawer */}
      <UserSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isOpenMobile={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main viewport panels */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header */}
        <UserHeader onToggleSidebar={() => setIsMobileOpen(!isMobileOpen)} />

        {/* Top Navigation Bar */}
        <TopNavigation />

        {/* Match Ticker */}
        <MatchTicker />

        {/* Content canvas container */}
        <div className="flex-1 overflow-y-auto relative min-h-0 bg-[#07111F] flex flex-col justify-between">
          <div className="flex-1">
            {children}
          </div>
          <UserFooter />
        </div>
      </div>
    </div>
  );
};
export default UserLayout;
