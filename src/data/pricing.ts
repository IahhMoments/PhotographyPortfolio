// ---------------------------------------------------------------------------
// PRICING DATA
//
// These are placeholder prices, roughly typical for portrait/family/event
// photography in Virginia — replace every field with your real packages
// whenever you're ready. Nothing in the Pricing page is hard-coded outside
// this file, so editing here is the only step required.
// ---------------------------------------------------------------------------

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  /** Highlights this card visually as the recommended option. */
  featured?: boolean;
  ctaLabel: string;
}

export const pricingNote =
  'Pricing shown below is a placeholder based on typical Virginia photography rates — final packages and pricing are still being finalized.';

export const pricingPackages: PricingPackage[] = [
  {
    id: 'portrait',
    name: 'Portrait Session',
    price: '$250',
    description: 'A focused session for individuals or couples.',
    features: [
      '1-hour session',
      '1 location',
      '1 outfit',
      '15 edited images',
      'Private online gallery',
    ],
    ctaLabel: 'Book a portrait session',
  },
  {
    id: 'family',
    name: 'Family Session',
    price: '$350',
    description: 'Relaxed, candid coverage for the whole family.',
    features: [
      '1–1.5 hour session',
      '1 location',
      'Up to 6 people',
      '30 edited images',
      'Private online gallery',
    ],
    featured: true,
    ctaLabel: 'Book a family session',
  },
  {
    id: 'event',
    name: 'Event Photography',
    price: '$500',
    priceNote: 'starting at',
    description: 'Documentary-style coverage for celebrations and gatherings.',
    features: [
      'Up to 3 hours of coverage',
      'Full event documentation',
      'Professionally edited images',
      'Private online gallery',
    ],
    ctaLabel: 'Book event coverage',
  },
  {
    id: 'custom',
    name: 'Custom / Premium',
    price: "Let's talk",
    description: 'For weddings, multi-day events, or a project with its own shape.',
    features: [
      'Scoped to your event or project',
      'Multiple photographers available',
      'Custom deliverables and turnaround',
      'Travel available',
    ],
    ctaLabel: 'Start the conversation',
  },
];
