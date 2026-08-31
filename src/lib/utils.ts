import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional class names without conflicting Tailwind utility clashes. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function assetPath(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE_PATH}${path}`;
}
