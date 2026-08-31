import Image from 'next/image';
import Link from 'next/link';
import { primaryNav, site } from '@/data/site';
import { Container } from '@/components/layout/Container';
import { assetPath } from '@/lib/utils';

const socialLinks = [
  { label: 'Instagram', href: site.social.instagram },
  { label: 'Pinterest', href: site.social.pinterest },
  { label: 'Facebook', href: site.social.facebook },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="grid gap-12 py-16 sm:py-20 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image src={assetPath('/images/logo/logo.png')} alt={site.name} width={1600} height={345} className="h-10 w-auto" />
          <p className="mt-3 max-w-xs text-sm text-ink-soft">{site.tagline}</p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-ink-soft">Site</p>
          <ul className="mt-4 space-y-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-ink-soft">Connect</p>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={`mailto:${site.email}`} className="text-sm text-ink transition-colors hover:text-accent">
                {site.email}
              </a>
            </li>
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-4 border-t border-line py-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p>Privacy Policy — coming soon</p>
      </Container>
    </footer>
  );
}
