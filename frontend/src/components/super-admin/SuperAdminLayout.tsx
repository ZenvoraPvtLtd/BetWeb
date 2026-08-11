import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { SuperAdminHeader } from './SuperAdminHeader';
import { SuperAdminSidebar } from './navigation/SuperAdminSidebar';

interface SuperAdminLayoutProps {
  children: React.ReactNode;
}

export const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileDrawerOpen(false);
      }
    };
    if (isMobileDrawerOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileDrawerOpen]);

  return (
    <div className="w-full h-screen flex flex-col bg-zinc-50/30 text-zinc-900 overflow-hidden">
      {/* 1. Announcement Bar Banner (Full Width Top) */}
      <AnnouncementBar />

      {/* 2. Split Workspace Layout Container */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Column: Desktop Collapsible Sidebar (Left Panel) */}
        <SuperAdminSidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          className="hidden md:flex h-full"
        />

        {/* Mobile Slide-out Drawer Panel */}
        {isMobileDrawerOpen && (
          <>
            {/* Backdrop filter overlay click-to-dismiss */}
            <div
              onClick={() => setIsMobileDrawerOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-xs z-40 transition-opacity duration-300"
              aria-hidden="true"
            />
            {/* Sliding Sidebar Panel */}
            <div className="md:hidden fixed inset-y-0 left-0 w-[240px] bg-[#0A0A0C] z-50 shadow-2xl flex flex-col transition-transform duration-300">
              <SuperAdminSidebar
                isCollapsed={false}
                setIsCollapsed={() => {}}
                className="w-full border-none h-full bg-transparent"
                onItemClick={() => setIsMobileDrawerOpen(false)}
              />
            </div>
          </>
        )}

        {/* Right Column: Top Header + Content Area Workspace */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Header Panel sits inside the Right column, next to the Sidebar */}
          <SuperAdminHeader onMenuToggle={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)} />

          {/* Active Content Area (Right Bottom Pane) */}
          <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6 md:py-8 box-border">
            <div className="max-w-[1400px] mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
