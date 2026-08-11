import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicLayout } from '../layouts/PublicLayout';
import { UserLoginPage } from '../pages/auth/UserLoginPage';
import { HomePage } from '../pages/dashboard/HomePage';

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

        {/* Guarded workspace routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Fallback routing redirects */}
        <Route path="*" element={<Navigate to="/logina" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
