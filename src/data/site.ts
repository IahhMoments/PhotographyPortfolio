// ---------------------------------------------------------------------------
// SITE CONFIG
// Edit everything about the photographer's identity in this one file:
// name, tagline, bio, contact details, and social links. Nothing else in the
// codebase should need to change when you update this information.
// ---------------------------------------------------------------------------

export const site = {
  name: 'ShotbyMoments',
  shortName: 'Moments',
  tagline: 'Capturing authentic moments, people, and stories.',
  heroIntro:
    "I'm a portrait, family, and event photographer based in Virginia. My approach is quiet and observational — I look for the real moment in the room, not the posed one, and I edit with a light hand so the work still looks like your life.",
  bioShort:
    'Virginia-based photographer working in natural light, drawn to honest expressions over performed ones.',
  email: 'hello@example.com',
  phone: '(555) 010-2938',
  location: 'Richmond, Virginia',
  serviceArea: 'Available throughout Central Virginia and for travel bookings.',
  social: {
    instagram: 'https://instagram.com/yourusername',
    pinterest: 'https://pinterest.com/yourusername',
    facebook: 'https://facebook.com/yourusername',
  },
  // Used for canonical URLs, Open Graph tags, sitemap.xml, and robots.txt.
  // Override at build time with NEXT_PUBLIC_SITE_URL — see .env.example.
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
} as const;

// Primary navigation — order is intentional: it walks a visitor from
// discovering the work, to pricing, to booking, with FAQ last as
// secondary/reference material. Change labels here; both the header and
// footer read from this single list.
export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
] as const;
