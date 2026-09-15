'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GalleryImage } from '@/components/portfolio/GalleryImage';
import { FadeIn } from '@/components/ui/FadeIn';
import type { PortfolioCategory, PortfolioImage, PortfolioCategoryId } from '@/data/portfolio';

interface GalleryProps {
  categories: PortfolioCategory[];
  images: PortfolioImage[];
}

interface CategoryTabsProps {
  categories: PortfolioCategory[];
  active: PortfolioCategoryId;
  onChange: (id: PortfolioCategoryId) => void;
}

function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Portfolio categories">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          role="tab"
          aria-selected={active === category.id}
          className={
            active === category.id
              ? 'border-b border-ink pb-2 text-sm text-ink'
              : 'border-b border-transparent pb-2 text-sm text-ink-soft transition-colors hover:border-line hover:text-ink'
          }
          onClick={() => onChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

export function Gallery({ categories, images }: GalleryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') as PortfolioCategoryId | null;
  
  const initialCategory = 
    categoryParam && categories.some((c) => c.id === categoryParam)
      ? categoryParam
      : (categories[0]?.id ?? 'portraits');
  
  const [active, setActive] = useState<PortfolioCategoryId>(initialCategory);

  // Update active category if URL parameter changes
  useEffect(() => {
    if (categoryParam && categories.some((c) => c.id === categoryParam)) {
      setActive(categoryParam);
    }
  }, [categoryParam, categories]);

  const filtered = useMemo(() => images.filter((img) => img.category === active), [images, active]);
  const activeCategory = categories.find((c) => c.id === active);

  function handleChangeCategory(id: PortfolioCategoryId) {
    setActive(id);
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
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-3">
          {filtered.map((image, i) => (
            <FadeIn key={image.id} delay={Math.min(i, 6) * 60}>
              {/* Clicking a photo here goes to that album's dedicated page
                  (with the full collage), not straight to the Lightbox. */}
              <GalleryImage
                image={image}
                index={i}
                total={filtered.length}
                onOpen={() => router.push(`/portfolio/${active}`)}
              />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}