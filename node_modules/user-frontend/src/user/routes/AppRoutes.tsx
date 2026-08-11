import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicLayout } from '../layouts/PublicLayout';
import { UserLoginPage } from '../pages/auth/UserLoginPage';
import { HomePage } from '../pages/dashboard/HomePage';
import { MatchDetailPage } from '../pages/sports/MatchDetailPage';
import { CasinoListPage } from '../pages/casino/CasinoListPage';
import { GenericCasinoPage } from '../pages/casino/GenericCasinoPage';
import { CasinoLobbyPage } from '../pages/games/CasinoLobbyPage';
import { Cards32ListPage } from '../pages/games/Cards32ListPage';
import { CrashPage } from '../pages/games/CrashPage';
import { GamePage } from '../pages/games/GamePage';
import { BetSlipProvider } from '../context/BetSlipContext';
import { SettingsProvider } from '../context/SettingsContext';

// Reports dashboard pages
import { ReportsHomePage } from '../pages/reports/ReportsHomePage';
import { MyBetsPage } from '../pages/reports/MyBetsPage';
import { AccountStatementPage } from '../pages/reports/AccountStatementPage';
import { CurrentBetsPage } from '../pages/reports/CurrentBetsPage';
import { DeletedBetsPage } from '../pages/reports/DeletedBetsPage';
import { GameReportsPage } from '../pages/reports/GameReportsPage';
import { ProfitLossPage } from '../pages/reports/ProfitLossPage';
import { DepositStatementPage } from '../pages/reports/DepositStatementPage';
import { WithdrawStatementPage } from '../pages/reports/WithdrawStatementPage';
import { BetHistoryPage } from '../pages/reports/BetHistoryPage';
import { UnsettledBetPage } from '../pages/reports/UnsettledBetPage';
import { CasinoReportHistoryPage } from '../pages/reports/CasinoReportHistoryPage';

// Settings pages
import { SettingsHomePage } from '../pages/settings/SettingsHomePage';
import { BlockMarketsPage } from '../pages/settings/BlockMarketsPage';
import { MessagesPage } from '../pages/settings/MessagesPage';
import { AddMatchListPage } from '../pages/settings/AddMatchListPage';
import { CasinoSettingsPage } from '../pages/settings/CasinoSettingsPage';
import { PaymentMethodPage } from '../pages/settings/PaymentMethodPage';

// Account pages
import { ProfilePage } from '../pages/account/ProfilePage';
import { ChangePasswordPage } from '../pages/account/ChangePasswordPage';
import { AccountSettingsPage } from '../pages/account/AccountSettingsPage';
import { ButtonValuesPage } from '../pages/account/ButtonValuesPage';
import { SecurityAuthPage } from '../pages/account/SecurityAuthPage';

// Static / Aux pages
import { RulesPage } from '../pages/RulesPage';
import { ResponsibleGamingPage } from '../pages/ResponsibleGamingPage';
import { TermsPage } from '../pages/TermsPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { SupportPage } from '../pages/SupportPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { UnauthorizedPage } from '../pages/UnauthorizedPage';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth routes */}
        <Route
          path="/logina"
          element={
            <PublicRoute>
              <PublicLayout>
                <UserLoginPage />
              </PublicLayout>
            </PublicRoute>
          }
        />

        {/* Guarded workspace routes with BetSlip & Settings state scope */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <SettingsProvider>
                <BetSlipProvider>
                  <Routes>
                    <Route path="home" element={<HomePage />} />
                    <Route path="home/:sportSlug" element={<HomePage />} />
                    
                    {/* Sports pages */}
                    <Route path="sports" element={<Navigate to="/home" replace />} />
                    <Route path="sports/:sportSlug" element={<HomePage />} />
                    <Route path="match/:matchId" element={<MatchDetailPage />} />
                    
                    {/* Casino Listing & Game Categories */}
                    <Route path="casino" element={<CasinoListPage />} />
                    <Route path="casino/live" element={<GenericCasinoPage />} />
                    <Route path="casino/mini" element={<GenericCasinoPage />} />
                    <Route path="casino/slots" element={<GenericCasinoPage />} />
                    <Route path="casino/crash" element={<CrashPage />} />
                    <Route path="games/crash" element={<CrashPage />} />
                    <Route path="crash" element={<CrashPage />} />
                    <Route path="games/slot" element={<GenericCasinoPage />} />
                    <Route path="games/fantasy" element={<GenericCasinoPage />} />
                    <Route path="games/casino" element={<Navigate to="/casino" replace />} />
                    
                    {/* Teenpatti, Poker & Lucky 7 Lobbies */}
                    <Route path="games/teenpatti" element={<CasinoLobbyPage type="teenpatti" />} />
                    <Route path="games/poker" element={<CasinoLobbyPage type="poker" />} />
                    <Route path="games/lucky7" element={<CasinoLobbyPage type="lucky7" />} />
                    <Route path="games/teenpatti/:teenpattiSlug" element={<GamePage />} />
                    
                    {/* 32 Cards lobby */}
                    <Route path="games/32-cards" element={<Cards32ListPage />} />
                    
                    {/* Other game slugs */}
                    <Route path="games/:slug" element={<GamePage />} />
                    <Route path="game/:slug" element={<GamePage />} />

                    {/* Reports pages */}
                    <Route path="reports" element={<ReportsHomePage />} />
                    <Route path="reports/my-bets" element={<MyBetsPage />} />
                    <Route path="reports/account-statement" element={<AccountStatementPage />} />
                    <Route path="reports/current-bets" element={<CurrentBetsPage />} />
                    <Route path="reports/deleted-bets" element={<DeletedBetsPage />} />
                    <Route path="reports/game-reports" element={<GameReportsPage />} />
                    <Route path="reports/profit-loss" element={<ProfitLossPage />} />
                    <Route path="reports/deposit-statement" element={<DepositStatementPage />} />
                    <Route path="reports/withdraw-statement" element={<WithdrawStatementPage />} />
                    <Route path="reports/bet-history" element={<BetHistoryPage />} />
                    <Route path="reports/unsettled-bet" element={<UnsettledBetPage />} />
                    <Route path="reports/casino-report-history" element={<CasinoReportHistoryPage />} />

                    {/* Settings pages */}
                    <Route path="settings" element={<SettingsHomePage />} />
                    <Route path="settings/block-markets" element={<BlockMarketsPage />} />
                    <Route path="settings/messages" element={<MessagesPage />} />
                    <Route path="settings/add-match-list" element={<AddMatchListPage />} />
                    <Route path="settings/casino-list" element={<CasinoSettingsPage />} />
                    <Route path="settings/payment-method" element={<PaymentMethodPage />} />

                    {/* Account pages */}
                    <Route path="account/profile" element={<ProfilePage />} />
                    <Route path="account/change-password" element={<ChangePasswordPage />} />
                    <Route path="account/settings" element={<AccountSettingsPage />} />
                    <Route path="account/button-values" element={<ButtonValuesPage />} />
                    <Route path="account/security-auth" element={<SecurityAuthPage />} />

                    {/* Static / Aux pages */}
                    <Route path="rules" element={<RulesPage />} />
                    <Route path="responsible-gaming" element={<ResponsibleGamingPage />} />
                    <Route path="terms" element={<TermsPage />} />
                    <Route path="privacy" element={<PrivacyPage />} />
                    <Route path="support" element={<SupportPage />} />

                    {/* Fallback internal routing redirect */}
                    <Route path="unauthorized" element={<UnauthorizedPage />} />
                    <Route path="404" element={<NotFoundPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </BetSlipProvider>
              </SettingsProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
