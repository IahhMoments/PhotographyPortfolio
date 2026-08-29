'use client';

import { useMemo, useState } from 'react';
import { CategoryTabs } from '@/components/portfolio/CategoryTabs';
import { GalleryImage } from '@/components/portfolio/GalleryImage';
import { Lightbox } from '@/components/portfolio/Lightbox';
import { FadeIn } from '@/components/ui/FadeIn';
import type { PortfolioCategory, PortfolioImage, PortfolioCategoryId } from '@/data/portfolio';

interface GalleryProps {
  categories: PortfolioCategory[];
  images: PortfolioImage[];
}

export function Gallery({ categories, images }: GalleryProps) {
  const [active, setActive] = useState<PortfolioCategoryId>(categories[0]?.id ?? 'portraits');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => images.filter((img) => img.category === active), [images, active]);
  const activeCategory = categories.find((c) => c.id === active);

  function handleChangeCategory(id: PortfolioCategoryId) {
    setActive(id);
    setOpenIndex(null);
  }

  return (
    <div>
      <CategoryTabs categories={categories} active={active} onChange={handleChangeCategory} />

      <p className="mt-8 max-w-md text-sm text-ink-soft">{activeCategory?.description}</p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-line py-28 text-center">
          <p className="font-mono text-xs uppercase tracking-widest2 text-ink-soft">Nothing here yet</p>
          <p className="max-w-xs text-ink-soft">New work for this category is coming soon — check back shortly.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((image, i) => (
            <FadeIn key={image.id} delay={Math.min(i, 6) * 60}>
              <GalleryImage image={image} index={i} total={filtered.length} onOpen={() => setOpenIndex(i)} />
            </FadeIn>
          ))}
        </div>
      )}

      {openIndex !== null ? (
        <Lightbox
          images={filtered}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      ) : null}
    </div>
  );
}
