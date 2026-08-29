import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FadeIn } from '@/components/ui/FadeIn';
import { site } from '@/data/site';

// Swap this src for your own hero photograph — a wide, high-resolution image
// works best. Keep the aspect ratio close to 3:2 for the crop to hold up from
// mobile through desktop widths.
const HERO_IMAGE = {
  src: 'https://placehold.co/2400x1500/171717/ECEAE5?text=Hero+Image&font=roboto',
  alt: 'Placeholder hero photograph — replace with your own signature image',
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <CornerFrame alwaysVisible tone="paper" className="min-h-[86vh] w-full sm:min-h-[92vh]">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dusk/80 via-dusk/10 to-transparent" />

        <Container className="absolute inset-x-0 bottom-0 pb-16 pt-10 sm:pb-24">
          <FadeIn>
            <Eyebrow className="text-paper/70">
              <span className="text-paper">01 — </span>
              {site.location}
            </Eyebrow>
            <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] text-paper sm:text-6xl lg:text-7xl">
              {site.name}
            </h1>
            <p className="mt-5 max-w-md text-lg text-paper/85">{site.tagline}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/portfolio" variant="primary" className="bg-paper text-ink hover:bg-paper/90">
                View my work
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                className="border-paper/70 text-paper hover:border-paper hover:bg-paper/10"
              >
                Get booked
              </Button>
            </div>
          </FadeIn>
        </Container>
      </CornerFrame>
    </section>
  );
}
