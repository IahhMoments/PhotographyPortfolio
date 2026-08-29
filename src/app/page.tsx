import { Hero } from '@/components/home/Hero';
import { Introduction } from '@/components/home/Introduction';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { CTABand } from '@/components/home/CTABand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <FeaturedWork />
      <CTABand
        heading="Love what you see? Let's create something together."
        body="Explore packages for portraits, families, and events."
        ctaLabel="View pricing"
        ctaHref="/pricing"
      />
      <CTABand
        heading="Ready to create something memorable?"
        ctaLabel="Get booked"
        ctaHref="/contact"
        tone="inverted"
      />
    </>
  );
}
