/**
 * Router — React Router v7 entry point
 *
 * This file only exports the Router component.
 * Router configuration lives in router.config.ts
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { router } from './router.config';

export function Router() {
  return <RouterProvider router={createBrowserRouter(router)} />;
}
