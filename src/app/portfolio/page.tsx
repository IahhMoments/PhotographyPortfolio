import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/layout/Container';
import { Gallery } from '@/components/portfolio/Gallery';
import { CTABand } from '@/components/home/CTABand';
import { categories, portfolioImages } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portrait, family, and event photography — browse the full portfolio by category.',
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        index="02"
        title="Portfolio"
        description="A selection of portrait, family, and event work. Browse by category below."
      />
      <Container as="section" className="pb-24">
        <Suspense fallback={<div>Loading gallery...</div>}>
          <Gallery categories={categories} images={portfolioImages} />
        </Suspense>
      </Container>
      <CTABand
        heading="Let's create something worth remembering."
        body="Ready to book a session of your own?"
        ctaLabel="Book a session"
        ctaHref="/contact"
      />
    </>
  );
}
