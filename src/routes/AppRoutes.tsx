import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Protection } from '../components/Protection';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  SearchPage,
  BusDetailsPage,
  SeatSelectionPage,
  PassengerDetailsPage,
  PaymentPage,
  BookingConfirmationPage,
  MyBookingsPage,
  ProfilePage,
  HelpPage,
  PrivacyPage,
  TermsPage,
} from '../pages';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/help"
        element={
          <MainLayout>
            <HelpPage />
          </MainLayout>
        }
      />
      <Route
        path="/privacy"
        element={
          <MainLayout>
            <PrivacyPage />
          </MainLayout>
        }
      />
      <Route
        path="/terms"
        element={
          <MainLayout>
            <TermsPage />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout>
            <LoginPage />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <MainLayout>
            <RegisterPage />
          </MainLayout>
        }
      />
      <Route
        path="/search"
        element={
          <MainLayout>
            <SearchPage />
          </MainLayout>
        }
      />
      <Route
        path="/bus/:busId"
        element={
          <MainLayout>
            <BusDetailsPage />
          </MainLayout>
        }
      />
      <Route
        path="/booking/:tripId/seats"
        element={
          <MainLayout>
            <SeatSelectionPage />
          </MainLayout>
        }
      />
      <Route
        path="/booking/:tripId/passenger"
        element={
          <Protection>
            <MainLayout>
              <PassengerDetailsPage />
            </MainLayout>
          </Protection>
        }
      />
      <Route
        path="/booking/:tripId/payment"
        element={
          <Protection>
            <MainLayout>
              <PaymentPage />
            </MainLayout>
          </Protection>
        }
      />
      <Route
        path="/booking/:tripId/confirmation"
        element={
          <Protection>
            <MainLayout>
              <BookingConfirmationPage />
            </MainLayout>
          </Protection>
        }
      />
      <Route
        path="/my-bookings"
        element={
          <Protection>
            <MainLayout>
              <MyBookingsPage />
            </MainLayout>
          </Protection>
        }
      />
      <Route
        path="/profile"
        element={
          <Protection>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </Protection>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
