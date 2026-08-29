import type { Metadata } from 'next';

// Self-hosted fonts (no external network requests at runtime — important for
// a static GitHub Pages deploy, and for privacy/performance in general).
import '@fontsource/instrument-sans/500.css';
import '@fontsource/instrument-sans/600.css';
import '@fontsource/karla/400.css';
import '@fontsource/karla/500.css';
import '@fontsource/ibm-plex-mono/400.css';

import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { site } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Photographer in ${site.location}`,
    template: `%s — ${site.name}`,
  },
  description: site.bioShort,
  openGraph: {
    title: site.name,
    description: site.bioShort,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.bioShort,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Skip link for keyboard users — first focusable element on every page. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
