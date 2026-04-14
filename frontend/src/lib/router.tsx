/**
 * Router Configuration — React Router v7
 *
 * Uses the new React Router v7 file-based routing with
 * nested layouts and data loading.
 */

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { TheStoa } from '@/components/layout/TheStoa';

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

// ---- Auth Guard ----
function RequireAuth({ children }: { children: React.ReactNode }) {
  // TODO: Replace with actual auth check
  const isAuthenticated = localStorage.getItem('auth_token');
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return <>{children}</>;
}

// ---- Public Route (redirects if authenticated) ----
function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('auth_token');
  
  if (isAuthenticated) {
    return <Navigate to="/stoa" replace />;
  }
  
  return <>{children}</>;
}

// ---- Router Configuration ----
export const router = createBrowserRouter([
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
]);

export function Router() {
  return <RouterProvider router={router} />;
}
