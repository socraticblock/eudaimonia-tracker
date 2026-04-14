/**
 * GreekInput — Text input component
 *
 * Styled with Greek theming: marble-like input with gold focus ring.
 * Supports error states, labels, and helper text.
 */

import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface GreekInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const GreekInput = forwardRef<HTMLInputElement, GreekInputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-heading text-sm uppercase tracking-wider text-ink"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              // Base styles
              'block w-full rounded-lg border-2 bg-cream px-4 py-2.5',
              'font-body text-ink placeholder:text-stone',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              // States
              error
                ? 'border-error focus:border-error focus:ring-error/30'
                : 'border-marble-border focus:border-gold focus:ring-gold/30',
              'disabled:bg-parchment-dark disabled:cursor-not-allowed disabled:opacity-60',
              // Icon padding
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-error" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="text-sm text-stone">{helperText}</p>
        )}
      </div>
    );
  }
);

GreekInput.displayName = 'GreekInput';
