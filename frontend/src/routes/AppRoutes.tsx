import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/auth/Login';
import { MarketAnalysis } from '../pages/super-admin/MarketAnalysis';
import { EventDetail } from '../pages/super-admin/EventDetail';
import { PendingImplementation } from '../pages/super-admin/PendingImplementation';
import { SportPage } from '../pages/super-admin/sports/SportPage';
import { ListOfClients } from '../pages/super-admin/ListOfClients';
import { ReportPage } from '../pages/super-admin/reports/ReportPage';
import { AccountStatement } from '../pages/super-admin/reports/AccountStatement';
import { CurrentBets } from '../pages/super-admin/reports/CurrentBets';
import { DeletedBets } from '../pages/super-admin/reports/DeletedBets';
import { GameReports } from '../pages/super-admin/reports/GameReports';
import { ProfitLoss } from '../pages/super-admin/reports/ProfitLoss';
import { LiveCasinoGamePage } from '../pages/super-admin/live-casino/LiveCasinoGamePage';
import { Teenpatti20x20Page } from '../pages/super-admin/live-casino/Teenpatti20x20Page';
import { OneDayTeenpattiPage } from '../pages/super-admin/live-casino/OneDayTeenpattiPage';
import { OpenTeenpattiPage } from '../pages/super-admin/live-casino/OpenTeenpattiPage';
import { SettingsPage } from '../pages/super-admin/settings/SettingsPage';
import { BlockMarketsPage } from '../pages/super-admin/settings/block-markets/BlockMarketsPage';
import { SportMarketPlaceholderPage } from '../pages/super-admin/settings/block-markets/SportMarketPlaceholderPage';
import { MessagesPage } from '../pages/super-admin/settings/MessagesPage';
import { AddMatchListPage } from '../pages/super-admin/settings/add-match-list/AddMatchListPage';
import { AddMatchListPlaceholderPage } from '../pages/super-admin/settings/add-match-list/AddMatchListPlaceholderPage';
import { CasinoListPage } from '../pages/super-admin/settings/CasinoListPage';
import { PaymentMethodPage } from '../pages/super-admin/settings/PaymentMethodPage';
import { ChangePasswordPage } from '../pages/super-admin/ChangePasswordPage';
import { SportsExchangePage } from '../components/sports/SportsExchangePage';
import { UserDashboard } from '../pages/user/UserDashboard';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Protected Route Guard to prevent anonymous visits
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#0B0F19] text-white">
        <svg
          className="animate-spin h-7 w-7 text-orange-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

// Guest Route to redirect authenticated users away from the login page
const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/admin/market-analysis" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Guest Login Routes */}
          <Route
            path="/admin"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/admin/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          {/* Protected Super Admin Dashboard Routes */}
          <Route
            path="/admin/market-analysis"
            element={
              <ProtectedRoute>
                <MarketAnalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/market-analysis/:eventId"
            element={
              <ProtectedRoute>
                <EventDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sports/:sportSlug"
            element={
              <ProtectedRoute>
                <SportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sports/:sportSlug"
            element={
              <ProtectedRoute>
                <SportsExchangePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/clients"
            element={
              <ProtectedRoute>
                <ListOfClients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports/account-statement"
            element={
              <ProtectedRoute>
                <AccountStatement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports/current-bets"
            element={
              <ProtectedRoute>
                <CurrentBets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports/deleted-bets"
            element={
              <ProtectedRoute>
                <DeletedBets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports/game-reports"
            element={
              <ProtectedRoute>
                <GameReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports/profit-loss"
            element={
              <ProtectedRoute>
                <ProfitLoss />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports/:reportSlug"
            element={
              <ProtectedRoute>
                <ReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/live-casino/20-20-teenpatti"
            element={
              <ProtectedRoute>
                <Teenpatti20x20Page />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/live-casino/1-day-teenpatti"
            element={
              <ProtectedRoute>
                <OneDayTeenpattiPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/live-casino/open-teenpatti"
            element={
              <ProtectedRoute>
                <OpenTeenpattiPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/live-casino/:gameSlug"
            element={
              <ProtectedRoute>
                <LiveCasinoGamePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/block-markets/:sportSlug"
            element={
              <ProtectedRoute>
                <SportMarketPlaceholderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/block-markets"
            element={
              <ProtectedRoute>
                <BlockMarketsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/messages"
            element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/add-match-list/:sportSlug"
            element={
              <ProtectedRoute>
                <AddMatchListPlaceholderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/add-match-list"
            element={
              <ProtectedRoute>
                <AddMatchListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/casino-list"
            element={
              <ProtectedRoute>
                <CasinoListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/payment-method"
            element={
              <ProtectedRoute>
                <PaymentMethodPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/:settingsSlug"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/change-password"
            element={
              <ProtectedRoute>
                <ChangePasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pending"
            element={
              <ProtectedRoute>
                <PendingImplementation />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect to standard login context */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
