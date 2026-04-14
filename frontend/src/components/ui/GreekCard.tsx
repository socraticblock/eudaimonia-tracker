/**
 * GreekCard — Card component
 *
 * Styled with Greek theming: marble-like background, meander border option.
 * Cards are the primary content container in Eudaimonia.
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface GreekCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'parchment';
  meanderBorder?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles: Record<string, string> = {
  default: 'bg-marble border-2 border-marble-border shadow-md',
  elevated: 'bg-marble border-2 border-marble-border shadow-xl',
  outlined: 'bg-transparent border-2 border-marble-border',
  parchment: 'bg-parchment border-2 border-parble-border shadow-md',
};

const paddingStyles: Record<string, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/**
 * GreekCard — Main card component
 *
 * @example
 * <GreekCard meanderBorder padding="md">
 *   <h3>Practice Name</h3>
 *   <p>Description here</p>
 * </GreekCard>
 */
export const GreekCard = forwardRef<HTMLDivElement, GreekCardProps>(
  (
    {
      variant = 'default',
      meanderBorder = false,
      padding = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl',
          variantStyles[variant],
          paddingStyles[padding],
          meanderBorder && 'meander-border',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GreekCard.displayName = 'GreekCard';

/**
 * GreekCardHeader — Card header with Greek key divider
 */
export interface GreekCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function GreekCardHeader({
  title,
  subtitle,
  action,
  className,
  ...props
}: GreekCardHeaderProps) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg uppercase tracking-wide text-ink">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1 text-sm text-stone">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      {/* Meander divider */}
      <div className="mt-3 meander-border" />
    </div>
  );
}

/**
 * GreekCardContent — Card content area
 */
export function GreekCardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props} />;
}

/**
 * GreekCardFooter — Card footer
 */
export function GreekCardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mt-4 flex items-center gap-3 pt-4 border-t border-marble-border', className)}
      {...props}
    />
  );
}
