import { cn } from '@/lib/utils';

interface CornerFrameProps {
  children: React.ReactNode;
  className?: string;
  /** Show the brackets immediately instead of only on hover/focus — used for the hero image. */
  alwaysVisible?: boolean;
  /** Text color the brackets should inherit (they use currentColor). */
  tone?: 'ink' | 'paper';
}

/**
 * Wraps an image with four hairline corner brackets — the site's one
 * recurring signature motif, a nod to a viewfinder finding focus. Used on the
 * hero image, gallery thumbnails on hover, and the lightbox frame.
 */
export function CornerFrame({ children, className, alwaysVisible, tone = 'ink' }: CornerFrameProps) {
  const toneClass = tone === 'paper' ? 'text-paper' : 'text-ink';
  return (
    <div className={cn('group relative', className)}>
      {children}
      <span
        aria-hidden="true"
        className={cn(
          'corner-bracket corner-bracket--tl',
          toneClass,
          alwaysVisible && 'corner-bracket--visible',
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          'corner-bracket corner-bracket--tr',
          toneClass,
          alwaysVisible && 'corner-bracket--visible',
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          'corner-bracket corner-bracket--bl',
          toneClass,
          alwaysVisible && 'corner-bracket--visible',
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          'corner-bracket corner-bracket--br',
          toneClass,
          alwaysVisible && 'corner-bracket--visible',
        )}
      />
    </div>
  );
}
