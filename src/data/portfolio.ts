// ---------------------------------------------------------------------------
// PORTFOLIO DATA
//
// HOW TO ADD YOUR OWN PHOTOS
// 1. Drop your image files into /public/images/portfolio/<category>/
// 2. Add one entry per photo to the matching array below, e.g.:
//      { id: 'portraits-07', src: '/images/portfolio/portraits/07.jpg',
//        alt: 'Describe what is actually in the photo', category: 'portraits' }
// 3. Delete the placeholder entries once you have real photos in a category.
// 4. To move a photo between categories, just change its `category` value.
// 5. To add a brand-new category, add it to `categories` below and add a
//    matching array of images — the Portfolio page and CategoryTabs component
//    render categories from this list, so no UI code needs to change.
//
// The `alt` field is what screen readers announce and what search engines
// index — always describe the actual photo content, not a filename.
// `width`/`height` are the real pixel dimensions of the source file; keeping
// them accurate prevents layout shift while images lazy-load.
// ---------------------------------------------------------------------------

export type PortfolioCategoryId = 'portraits' | 'family' | 'events' | 'coming-soon';

export interface PortfolioCategory {
  id: PortfolioCategoryId;
  label: string;
  description: string;
}

export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  category: PortfolioCategoryId;
  width: number;
  height: number;
  /** Optional short caption shown in the lightbox — e.g. location or a one-line note. */
  caption?: string;
}

export const categories: PortfolioCategory[] = [
  {
    id: 'portraits',
    label: 'Portraits',
    description: 'Individual and couples sessions, shot in natural light.',
  },
  {
    id: 'family',
    label: 'Family',
    description: 'Family and lifestyle sessions, at home or on location.',
  },
  {
    id: 'events',
    label: 'Events',
    description: 'Celebrations, gatherings, and milestone events.',
  },
  {
    id: 'coming-soon',
    label: 'Coming Soon',
    description: 'A new category of work, on the way.',
  },
];

// --- PLACEHOLDER IMAGES -----------------------------------------------------
// Generated via placehold.co so it is immediately obvious these are stand-ins
// and not real photography. Replace freely — see instructions above.

const portraitPlaceholder = (n: number, label: string): PortfolioImage => ({
  id: `portraits-${n}`,
  src: `https://placehold.co/1200x1500/ECEAE5/6B6B6B?text=Portrait+${label}&font=roboto`,
  alt: `Placeholder portrait image ${label} — replace with your own photo`,
  category: 'portraits',
  width: 1200,
  height: 1500,
});

const familyPlaceholder = (n: number, label: string): PortfolioImage => ({
  id: `family-${n}`,
  src: `https://placehold.co/1400x1050/ECEAE5/6B6B6B?text=Family+${label}&font=roboto`,
  alt: `Placeholder family session image ${label} — replace with your own photo`,
  category: 'family',
  width: 1400,
  height: 1050,
});

const eventPlaceholder = (n: number, label: string): PortfolioImage => ({
  id: `events-${n}`,
  src: `https://placehold.co/1600x1067/ECEAE5/6B6B6B?text=Event+${label}&font=roboto`,
  alt: `Placeholder event image ${label} — replace with your own photo`,
  category: 'events',
  width: 1600,
  height: 1067,
});

export const portfolioImages: PortfolioImage[] = [
  portraitPlaceholder(1, '01'),
  portraitPlaceholder(2, '02'),
  portraitPlaceholder(3, '03'),
  portraitPlaceholder(4, '04'),
  portraitPlaceholder(5, '05'),
  portraitPlaceholder(6, '06'),
  familyPlaceholder(1, '01'),
  familyPlaceholder(2, '02'),
  familyPlaceholder(3, '03'),
  familyPlaceholder(4, '04'),
  familyPlaceholder(5, '05'),
  eventPlaceholder(1, '01'),
  eventPlaceholder(2, '02'),
  eventPlaceholder(3, '03'),
  eventPlaceholder(4, '04'),
  // 'coming-soon' intentionally has no images yet — the Portfolio page shows
  // an empty state for any category with zero entries.
];

export function getImagesByCategory(category: PortfolioCategoryId): PortfolioImage[] {
  return portfolioImages.filter((image) => image.category === category);
}

// Fisher–Yates shuffle — returns a new array in randomized order without
// mutating the input.
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}

// A randomized cross-section used for the "Selected Work" collage on the
// homepage. Pulls from every category except 'coming-soon', shuffles the
// order, and returns up to `count` images — as more real photos are added,
// the collage grows toward that cap. Note: since this site is statically
// exported, the shuffle runs at build time — the order is random but fixed
// until the next build/deploy, not re-randomized on every page load.
export function getFeaturedImages(count = 25): PortfolioImage[] {
  const eligible = portfolioImages.filter((image) => image.category !== 'coming-soon');
  return shuffle(eligible).slice(0, count);
}