/**
 * GreekSelect — Select dropdown component
 *
 * Styled with Greek theming to match GreekInput.
 */

import { forwardRef, useId, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GreekSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
}

export const GreekSelect = forwardRef<HTMLSelectElement, GreekSelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block font-heading text-sm uppercase tracking-wider text-ink"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'block w-full appearance-none rounded-lg border-2 bg-cream px-4 py-2.5 pr-10',
              'font-body text-ink',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              error
                ? 'border-error focus:border-error focus:ring-error/30'
                : 'border-marble-border focus:border-gold focus:ring-gold/30',
              'disabled:bg-parchment-dark disabled:cursor-not-allowed disabled:opacity-60',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Chevron icon */}
          <ChevronDown className="pointer-events-none absolute inset-y-0 right-0 mr-3 flex items-center text-stone" />
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

GreekSelect.displayName = 'GreekSelect';
