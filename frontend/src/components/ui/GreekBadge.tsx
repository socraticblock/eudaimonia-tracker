/**
 * GreekBadge — Status badge component
 *
 * Used for: streak counts, practice frequency, status indicators.
 * Gold styling for streaks, colored for other statuses.
 */

import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'streak' | 'success' | 'warning' | 'error' | 'greek-red';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface GreekBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-marble text-ink border-marble-border',
  streak: 'bg-gold-pale text-gold-dark border-gold/30',
  success: 'bg-success-light text-success border-success/30',
  warning: 'bg-warning-light text-warning border-warning/30',
  error: 'bg-error-light text-error border-error/30',
  'greek-red': 'bg-greek-red/10 text-greek-red border-greek-red/30',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export function GreekBadge({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className,
}: GreekBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-heading uppercase tracking-wide',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

/**
 * StreakBadge — Specialized badge for streak display
 */
interface StreakBadgeProps {
  count: number;
  size?: BadgeSize;
  showFire?: boolean;
  className?: string;
}

export function StreakBadge({ count, size = 'md', showFire = true, className }: StreakBadgeProps) {
  return (
    <GreekBadge
      variant="streak"
      size={size}
      icon={
        showFire ? (
          <OlympicFlame className={size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
        ) : undefined
      }
      className={className}
    >
      {count} {count === 1 ? 'day' : 'days'}
    </GreekBadge>
  );
}

/**
 * OlympicFlame — SVG icon for streak display
 */
export function OlympicFlame({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={cn('flame-animation', className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z" />
      <path d="M12 14C12 14 9 17 9 20C9 21.66 10.34 23 12 23C13.66 23 15 21.66 15 20C15 17 12 14 12 14Z" />
    </svg>
  );
}

/**
 * FrequencyBadge — Shows practice frequency (Daily/Weekly/Monthly)
 */
interface FrequencyBadgeProps {
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  size?: BadgeSize;
}

const frequencyEmojis: Record<string, string> = {
  DAILY: '☀️',
  WEEKLY: '🌙',
  MONTHLY: '⭐',
};

const frequencyLabels: Record<string, string> = {
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
};

export function FrequencyBadge({ frequency, size = 'sm' }: FrequencyBadgeProps) {
  return (
    <GreekBadge variant="greek-red" size={size}>
      {frequencyEmojis[frequency]} {frequencyLabels[frequency]}
    </GreekBadge>
  );
}
