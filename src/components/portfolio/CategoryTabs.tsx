'use client';

import { cn } from '@/lib/utils';
import type { PortfolioCategory, PortfolioCategoryId } from '@/data/portfolio';

interface CategoryTabsProps {
  categories: PortfolioCategory[];
  active: PortfolioCategoryId;
  onChange: (id: PortfolioCategoryId) => void;
}

export function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Portfolio categories"
      className="flex flex-wrap gap-x-8 gap-y-3 border-b border-line pb-6"
    >
      {categories.map((category) => {
        const isActive = category.id === active;
        return (
          <button
            key={category.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(category.id)}
            className={cn(
              'relative pb-2 font-mono text-xs uppercase tracking-widest2 transition-colors duration-200',
              isActive ? 'text-ink' : 'text-ink-soft hover:text-ink',
            )}
          >
            {category.label}
            <span
              className={cn(
                'absolute bottom-0 left-0 h-[1.5px] w-full bg-accent transition-opacity duration-200 md:-bottom-[25px]',
                isActive ? 'opacity-100' : 'opacity-0',
              )}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}
