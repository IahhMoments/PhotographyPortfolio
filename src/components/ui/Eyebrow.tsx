import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: React.ReactNode;
  /** Optional two-digit index, e.g. "02" — used on page headers to mark position in the primary nav sequence. */
  index?: string;
  className?: string;
}

/** Small uppercase, letter-spaced label set in the utility monospace face. */
export function Eyebrow({ children, index, className }: EyebrowProps) {
  return (
    <p className={cn('font-mono text-xs uppercase tracking-widest2 text-ink-soft', className)}>
      {index ? <span className="text-accent">{index} — </span> : null}
      {children}
    </p>
  );
}
