import React, { useState, useEffect } from 'react';
import { HomeHeader } from '../../components/home/HomeHeader';
import { HomeNavigation } from '../../components/home/HomeNavigation';
import { HomeSidebar } from '../../components/home/HomeSidebar';
import { HomeContent } from '../../components/home/HomeContent';
import { PromotionModal } from '../../components/home/PromotionModal';

export const HomePage: React.FC = () => {
  const [isPromoOpen, setIsPromoOpen] = useState(false);

  // Automatically open the promotional popup on mount
  useEffect(() => {
    setIsPromoOpen(true);
  }, []);

  return (
    <div className="w-full h-screen bg-[#0A0B0D] flex flex-col overflow-hidden text-white font-sans relative">
      {/* 1. TOP HEADER */}
      <HomeHeader />

      {/* 2. SECOND NAVIGATION */}
      <HomeNavigation />

      {/* 3. WORKSPACE: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        <HomeSidebar />
        <HomeContent />
      </div>

      {/* 4. PROMOTIONAL POPUP */}
      <PromotionModal isOpen={isPromoOpen} onClose={() => setIsPromoOpen(false)} />
    </div>
  );
};
export default HomePage;
