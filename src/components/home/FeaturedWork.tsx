import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FadeIn } from '@/components/ui/FadeIn';
import { getFeaturedImages } from '@/data/portfolio';

// Every 7th tile is blown up like the original hero tile, and every 7th
// offset-by-3 is a wide landscape tile — mixing session types and sizes so
// the grid reads as an editorial collage rather than a uniform wall of
// squares. `grid-flow-row-dense` (below) lets normal tiles fill in around
// the larger ones instead of leaving gaps.
function tileVariant(i: number): 'big' | 'wide' | 'normal' {
  const position = i % 7;
  if (position === 0) return 'big';
  if (position === 3) return 'wide';
  return 'normal';
}

export function FeaturedWork() {
  const images = getFeaturedImages(25);

  return (
    <Container as="section" className="py-8 sm:py-12">
      <FadeIn className="mb-10 flex items-end justify-between gap-6">
        <div>
          <Eyebrow index="02">Selected Work</Eyebrow>
          <h2 className="mt-4 text-3xl sm:text-4xl">A cross-section of recent favorites</h2>
        </div>
        <Link
          href="/portfolio"
          className="hidden shrink-0 font-mono text-xs uppercase tracking-widest2 text-ink-soft transition-colors hover:text-accent sm:block"
        >
          View full portfolio →
        </Link>
      </FadeIn>

      <div className="grid grid-flow-row-dense grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {images.map((image, i) => {
          const variant = tileVariant(i);
          const spanClass =
            variant === 'big' ? 'col-span-2 row-span-2' : variant === 'wide' ? 'col-span-2' : '';
          const aspectClass =
            variant === 'big'
              ? 'aspect-square sm:aspect-[4/5]'
              : variant === 'wide'
                ? 'aspect-[8/5]'
                : 'aspect-[4/5]';

          return (
            <FadeIn key={image.id} delay={(i % 4) * 80} className={spanClass}>
              <Link href={`/portfolio?category=${image.category}`} className="block h-full">
                <CornerFrame className="h-full overflow-hidden rounded-sm bg-paper-soft">
                  <div className={`relative ${aspectClass}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
                    />
                  </div>
                </CornerFrame>
              </Link>
            </FadeIn>
          );
        })}
      </div>

      <Link
        href="/portfolio"
        className="mt-8 inline-block font-mono text-xs uppercase tracking-widest2 text-ink-soft transition-colors hover:text-accent sm:hidden"
      >
        View full portfolio →
      </Link>
    </Container>
  );
}