/**
 * GreekAvatar — Philosopher avatar component
 *
 * Shows philosopher initials with school-based coloring.
 * Olympic fire indicator for active streaks.
 */

import { cn } from '@/lib/utils';
import { OlympicFlame } from './GreekBadge';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface GreekAvatarProps {
  name: string;
  imageUrl?: string;
  school?: string;
  streak?: number;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

// School colors for avatar backgrounds
const schoolColors: Record<string, string> = {
  STOA: 'bg-greek-red/20 text-greek-red',
  ACADEMY: 'bg-gold/20 text-gold-dark',
  GARDEN: 'bg-success/20 text-success',
  DEFAULT: 'bg-stone/20 text-stone',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getSchoolColor(school?: string): string {
  if (!school) return schoolColors.DEFAULT;
  return schoolColors[school.toUpperCase()] || schoolColors.DEFAULT;
}

export function GreekAvatar({
  name,
  imageUrl,
  school,
  streak = 0,
  size = 'md',
  className,
}: GreekAvatarProps) {
  const initials = getInitials(name);
  const colorClass = getSchoolColor(school);

  return (
    <div className={cn('relative inline-block', className)}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className={cn(
            'rounded-full border-2 border-marble-border object-cover',
            sizeStyles[size]
          )}
        />
      ) : (
        <div
          className={cn(
            'flex items-center justify-center rounded-full border-2 border-marble-border font-heading font-bold uppercase',
            sizeStyles[size],
            colorClass
          )}
        >
          {initials}
        </div>
      )}

      {/* Streak indicator */}
      {streak > 0 && (
        <div className="absolute -bottom-0.5 -right-0.5 flex items-center gap-0.5 rounded-full bg-parchment px-1.5 py-0.5 text-xs text-gold">
          <OlympicFlame className="w-3 h-3" />
          <span className="font-mono font-bold">{streak}</span>
        </div>
      )}
    </div>
  );
}
