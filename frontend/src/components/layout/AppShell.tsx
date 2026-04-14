/**
 * AppShell — Main layout wrapper
 *
 * Provides the outer layout: header, sidebar, and content area.
 * The Stoa (sidebar) is rendered as a child for nested routing.
 */

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-parchment">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-marble-border bg-parchment px-4 lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-stone hover:bg-marble hover:text-ink transition-colors"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile logo */}
        <div className="flex items-center gap-2">
          <GreekColumnsIcon className="h-8 w-8 text-greek-red" />
          <span className="font-heading text-lg uppercase tracking-wider text-ink">
            Eudaimonia
          </span>
        </div>

        {/* Avatar */}
        <div className="w-8" /> {/* Spacer for centering */}
      </header>

      {/* Main content */}
      <main className="flex">
        {/* Page content */}
        <div className="flex-1 lg:ml-64">
          <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Greek Columns Icon — SVG logo for Eudaimonia
 */
function GreekColumnsIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Column left */}
      <rect x="3" y="4" width="3" height="16" fill="currentColor" rx="0.5" />
      {/* Column right */}
      <rect x="18" y="4" width="3" height="16" fill="currentColor" rx="0.5" />
      {/* Pediment (triangular top) */}
      <path
        d="M1 4L12 1L23 4V6L12 3L1 6V4Z"
        fill="currentColor"
      />
      {/* Base */}
      <rect x="2" y="20" width="20" height="2" fill="currentColor" rx="0.5" />
    </svg>
  );
}
