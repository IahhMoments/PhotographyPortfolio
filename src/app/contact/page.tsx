import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/layout/Container';
import { ContactForm } from '@/components/contact/ContactForm';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Get in touch to book a portrait, family, or event photography session.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="04"
        title="Let's work together."
        description="Tell me a little about what you have in mind, and I'll follow up within a couple of days."
      />

      <Container as="section" className="grid gap-16 pb-28 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-ink-soft">Direct</p>
          <a href={`mailto:${site.email}`} className="mt-3 block text-lg text-ink hover:text-accent">
            {site.email}
          </a>
          <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="mt-1 block text-lg text-ink hover:text-accent">
            {site.phone}
          </a>
          <p className="mt-6 text-sm text-ink-soft">{site.serviceArea}</p>
        </div>

        <ContactForm />
      </Container>
    </>
  );
}
