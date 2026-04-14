/**
 * TheStoa — Sidebar navigation
 *
 * Named after the Stoic colonnade where Zeno taught.
 * Contains navigation links with Greek labels and streak status.
 */

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Scroll,
  CheckSquare,
  BookOpen,
  User,
  Settings,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OlympicFlame } from '@/components/ui';

interface NavItem {
  to: string;
  label: string;
  greekLabel: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    to: '/stoa',
    label: 'Dashboard',
    greekLabel: 'ἡ Στοά',
    icon: <Home className="h-5 w-5" />,
  },
  {
    to: '/stoa/practices',
    label: 'Practices',
    greekLabel: 'αἱ Πράξεις',
    icon: <Scroll className="h-5 w-5" />,
  },
  {
    to: '/stoa/checkin',
    label: 'Check-In',
    greekLabel: 'ὁ Ἔλεγχος',
    icon: <CheckSquare className="h-5 w-5" />,
  },
  {
    to: '/stoa/reflections',
    label: 'Reflections',
    greekLabel: 'ἡ Σκέψις',
    icon: <BookOpen className="h-5 w-5" />,
  },
];

const bottomNavItems: NavItem[] = [
  {
    to: '/stoa/profile',
    label: 'Profile',
    greekLabel: 'ὁ Φιλόσοφος',
    icon: <User className="h-5 w-5" />,
  },
  {
    to: '/stoa/settings',
    label: 'Settings',
    greekLabel: 'ἡ Σύσκηψις',
    icon: <Settings className="h-5 w-5" />,
  },
];

export function TheStoa() {
  // TODO: Get from Zustand store
  const philosopher = {
    name: 'Marcus Aurelius',
    school: 'STOA',
    streak: 12,
  };

  // For demo purposes, collapse state is local
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-marble-border bg-parchment transition-all duration-300 lg:flex',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-marble-border px-4">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <GreekColumnsIcon className="h-8 w-8 text-greek-red" />
              <span className="font-heading text-xl uppercase tracking-wider text-ink">
                Eudaimonia
              </span>
            </motion.div>
          )}
          {isCollapsed && (
            <GreekColumnsIcon className="mx-auto h-8 w-8 text-greek-red" />
          )}
        </div>

        {/* Streak indicator */}
        <div className={cn('border-b border-marble-border p-4', isCollapsed && 'px-2')}>
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-1 rounded-lg bg-gold-pale p-2">
              <OlympicFlame className="h-6 w-6 text-gold" />
              <span className="font-mono text-xs font-bold text-gold-dark">
                {philosopher.streak}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-lg bg-gold-pale p-3">
              <OlympicFlame className="h-8 w-8 text-gold" />
              <div>
                <p className="font-heading text-sm uppercase tracking-wide text-gold-dark">
                  {philosopher.streak} Day Streak
                </p>
                <p className="text-xs text-gold/80">Olympic Fire Burns</p>
              </div>
            </div>
          )}
        </div>

        {/* Main navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <StoaNavLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              greekLabel={item.greekLabel}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>

        {/* Bottom navigation */}
        <div className="space-y-1 border-t border-marble-border p-4">
          {bottomNavItems.map((item) => (
            <StoaNavLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              greekLabel={item.greekLabel}
              isCollapsed={isCollapsed}
            />
          ))}

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.removeItem('auth_token');
              window.location.href = '/';
            }}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-stone hover:bg-marble hover:text-ink',
              'transition-colors'
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!isCollapsed && (
              <span className="font-heading text-sm uppercase tracking-wide">
                Logout
              </span>
            )}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-marble-border bg-parchment text-stone hover:bg-marble-border hover:text-ink transition-colors"
        >
          <ChevronLeft
            className={cn(
              'h-4 w-4 transition-transform',
              isCollapsed && 'rotate-180'
            )}
          />
        </button>
      </aside>

      {/* Page content renders here via Outlet */}
      <div className="flex-1 lg:ml-64">
        <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
          <Outlet />
        </div>
      </div>
    </>
  );
}

// ---- NavLink components ----

interface StoaNavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  greekLabel: string;
  isCollapsed: boolean;
}

function StoaNavLink({ to, icon, label, greekLabel, isCollapsed }: StoaNavLinkProps) {
  return (
    <NavLink
      to={to}
      end={to === '/stoa'}
      className={({ isActive }) =>
        cn(
          'group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
          isActive
            ? 'bg-greek-red/10 text-greek-red'
            : 'text-stone hover:bg-marble hover:text-ink',
          isCollapsed && 'justify-center px-2'
        )
      }
    >
      <span className="shrink-0">{icon}</span>
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col"
        >
          <span className="font-heading text-sm uppercase tracking-wide">
            {label}
          </span>
          <span className="text-xs italic text-stone/60">{greekLabel}</span>
        </motion.div>
      )}
    </NavLink>
  );
}

// ---- Greek Columns Icon ----
function GreekColumnsIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="4" width="3" height="16" fill="currentColor" rx="0.5" />
      <rect x="18" y="4" width="3" height="16" fill="currentColor" rx="0.5" />
      <path d="M1 4L12 1L23 4V6L12 3L1 6V4Z" fill="currentColor" />
      <rect x="2" y="20" width="20" height="2" fill="currentColor" rx="0.5" />
    </svg>
  );
}
