/**
 * Router Configuration — React Router v7
 *
 * Separated from the Router component to satisfy React Fast Refresh.
 * Only exports the router config array — no components or HOCs.
 */

import { AppShell } from '@/components/layout/AppShell';
import { TheStoa } from '@/components/layout/TheStoa';
import { RequireAuth, PublicRoute } from '@/components/auth/AuthGuard';

// ---- Pages ----
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { PracticesPage } from '@/pages/PracticesPage';
import { PracticeDetailPage } from '@/pages/PracticeDetailPage';
import { CheckInPage } from '@/pages/CheckInPage';
import { ReflectionsPage } from '@/pages/ReflectionsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// ---- Router Configuration ----
export const router = [
  // ---- Public Routes ----
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/auth/register',
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },

  // ---- Protected Routes (with AppShell + TheStoa) ----
  {
    path: '/',
    element: (
      <RequireAuth>
        <AppShell />
      </RequireAuth>
    ),
    children: [
      {
        path: 'stoa',
        element: <TheStoa />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'practices',
            element: <PracticesPage />,
          },
          {
            path: 'practices/:id',
            element: <PracticeDetailPage />,
          },
          {
            path: 'checkin',
            element: <CheckInPage />,
          },
          {
            path: 'reflections',
            element: <ReflectionsPage />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },

  // ---- 404 ----
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
