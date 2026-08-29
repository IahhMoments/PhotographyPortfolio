import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional class names without conflicting Tailwind utility clashes. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
