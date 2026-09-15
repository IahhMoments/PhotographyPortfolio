import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/layout/Container';
import { CTABand } from '@/components/home/CTABand';
import { AlbumGallery } from '@/components/portfolio/AlbumGallery';
import { categories, getImagesByCategory } from '@/data/portfolio';

interface AlbumPageProps {
  params: Promise<{ category: string }>;
}

// Pre-renders one static page per category at build time — required since
// this site is a static export with no server to resolve dynamic routes
// at request time.
export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const { category: categoryId } = await params;
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return {};
  return {
    title: category.label,
    description: category.description,
  };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { category: categoryId } = await params;
  const category = categories.find((c) => c.id === categoryId);
  if (!category) notFound();

  const images = getImagesByCategory(category.id);

  return (
    <>
      <PageHero index="02" title={category.label} description={category.description} />
      <Container as="section" className="pb-24">
        <Link
          href="/portfolio"
          className="mb-10 inline-block font-mono text-xs uppercase tracking-widest2 text-ink-soft transition-colors hover:text-ink"
        >
          ← All categories
        </Link>
        <AlbumGallery images={images} />
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