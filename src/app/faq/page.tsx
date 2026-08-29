import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/layout/Container';
import { FaqAccordion, FaqEmptyState } from '@/components/faq/FaqAccordion';
import { faqEntries } from '@/data/faq';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions.',
};

export default function FaqPage() {
  return (
    <>
      <PageHero index="05" title="Frequently Asked Questions" />
      <Container as="section" className="pb-28">
        {faqEntries.length > 0 ? <FaqAccordion entries={faqEntries} /> : <FaqEmptyState />}
      </Container>
    </>
  );
}
