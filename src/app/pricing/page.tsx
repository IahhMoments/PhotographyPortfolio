import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/layout/Container';
import { PricingCard } from '@/components/pricing/PricingCard';
import { CTABand } from '@/components/home/CTABand';
import { pricingNote, pricingPackages } from '@/data/pricing';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Session packages and pricing for portrait, family, and event photography.',
};

export default function PricingPage() {
  return (
    <>
      <PageHero index="03" title="Pricing" description="Simple, transparent packages — custom work always welcome." />

      <Container as="section" className="pb-8">
        <p className="mb-10 max-w-xl rounded-sm border border-line bg-paper-soft px-5 py-4 text-sm text-ink-soft">
          {pricingNote}
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingPackages.map((pkg) => (
            <PricingCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </Container>

      <CTABand
        heading="Have something specific in mind? Let's talk."
        body="Every project starts with a conversation."
        ctaLabel="Contact me"
        ctaHref="/contact"
        tone="inverted"
      />
    </>
  );
}
