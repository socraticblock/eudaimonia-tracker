import { clsx, type ClassValue } from 'clsx';

/**
 * Utility for combining Tailwind classes conditionally.
 * clsx handles strings, arrays, and objects elegantly.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
