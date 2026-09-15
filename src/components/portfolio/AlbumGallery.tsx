'use client';

import { useState } from 'react';
import { GalleryImage } from '@/components/portfolio/GalleryImage';
import { Lightbox } from '@/components/portfolio/Lightbox';
import { FadeIn } from '@/components/ui/FadeIn';
import type { PortfolioImage } from '@/data/portfolio';

interface AlbumGalleryProps {
  images: PortfolioImage[];
}

/** The photo grid for a single album's page. Reuses GalleryImage and
 * Lightbox exactly as they already work elsewhere — clicking a photo opens
 * the same corner-framed viewer with arrow navigation and an image counter. */
export function AlbumGallery({ images }: AlbumGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-line py-28 text-center">
        <p className="font-mono text-xs uppercase tracking-widest2 text-ink-soft">Nothing here yet</p>
        <p className="max-w-xs text-ink-soft">New work for this category is coming soon — check back shortly.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-3">
        {images.map((image, i) => (
          <FadeIn key={image.id} delay={Math.min(i, 6) * 60}>
            <GalleryImage image={image} index={i} total={images.length} onOpen={() => setOpenIndex(i)} />
          </FadeIn>
        ))}
      </div>

      {openIndex !== null ? (
        <Lightbox images={images} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
      ) : null}
    </div>
  );
}