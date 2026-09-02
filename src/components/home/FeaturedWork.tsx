import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FadeIn } from '@/components/ui/FadeIn';
import { getFeaturedImages } from '@/data/portfolio';

export function FeaturedWork() {
  const images = getFeaturedImages(4);

  return (
    <Container as="section" className="py-8 sm:py-12">
      <FadeIn className="mb-10 flex items-end justify-between gap-6">
        <div>
          <Eyebrow index="02">Selected Work</Eyebrow>
          <h2 className="mt-4 text-3xl sm:text-4xl">A few recent favorites</h2>
        </div>
        <Link
          href="/portfolio"
          className="hidden shrink-0 font-mono text-xs uppercase tracking-widest2 text-ink-soft transition-colors hover:text-accent sm:block"
        >
          View full portfolio →
        </Link>
      </FadeIn>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {images.map((image, i) => (
          <FadeIn key={image.id} delay={i * 80} className={i === 0 ? 'col-span-2 row-span-2' : ''}>
            <Link href={`/portfolio?category=${image.category}`} className="block h-full">
              <CornerFrame className="h-full overflow-hidden rounded-sm bg-paper-soft">
                <div className={i === 0 ? 'relative aspect-square sm:aspect-[4/5]' : 'relative aspect-[4/5]'}>
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
        ))}
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
