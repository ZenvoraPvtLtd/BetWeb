import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { SportsSelector } from '../../components/user/sports/SportsSelector';
import { HomeMarketTable } from '../../components/user/home/HomeMarketTable';
import { GameGrid } from '../../components/user/home/GameGrid';
import { PromotionModal } from '../../components/home/PromotionModal';
import { MatchSkeleton } from '../../components/user/feedback/Skeleton';
import { userMatches } from '../../data/matches';

export const HomePage: React.FC = () => {
  const { sportSlug } = useParams<{ sportSlug: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedSportId = sportSlug || 'all';
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [sportSlug]);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('hasSeenPromo');
    if (!hasSeen) {
      setIsPromoOpen(true);
    }
  }, []);

  const handleClosePromo = () => {
    setIsPromoOpen(false);
    sessionStorage.setItem('hasSeenPromo', 'true');
  };

  const handleSelectSportId = (id: string) => {
    if (id === 'all') {
      navigate('/home');
    } else {
      if (location.pathname.startsWith('/sports/')) {
        navigate(`/sports/${id}`);
      } else {
        navigate(`/home/${id}`);
      }
    }
  };

  const filteredMatches = selectedSportId === 'all'
    ? userMatches
    : userMatches.filter(match => match.sport.toLowerCase().replace(' ', '-') === selectedSportId);

  return (
    <UserLayout>
      <div className="flex flex-col gap-6">
        {/* Category Sport Filters */}
        <SportsSelector
          selectedSportId={selectedSportId}
          onSelectSportId={handleSelectSportId}
        />

        {isLoading ? (
          <div className="flex flex-col gap-6">
            <MatchSkeleton />
            <MatchSkeleton />
          </div>
        ) : (
          <>
            {/* Betting Exchange Market Table */}
            <HomeMarketTable matches={filteredMatches} />

            {/* Casino Lobbies Game Grid */}
            <GameGrid />
          </>
        )}
      </div>

      <PromotionModal isOpen={isPromoOpen} onClose={handleClosePromo} />
    </UserLayout>
  );
};
export default HomePage;
