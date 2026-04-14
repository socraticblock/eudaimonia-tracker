/**
 * Auth Guards — PublicRoute and RequireAuth
 *
 * Separated from router config to satisfy React Fast Refresh.
 * Guard functions that wrap routes must live in their own file.
 */

import { Navigate } from 'react-router-dom';

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('auth_token');

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('auth_token');

  if (isAuthenticated) {
    return <Navigate to="/stoa" replace />;
  }

  return <>{children}</>;
}
