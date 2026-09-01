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
    <footer className="border-t border-line bg-paper">
      <Container className="grid gap-10 py-16 sm:py-20 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex flex-col items-center justify-center text-center">
          <Image src={assetPath('/images/logo/logo.png')} alt={site.name} width={1600} height={345} className="h-10 w-auto" />
          <p className="mx-auto mt-3 max-w-xs text-sm text-ink-soft">{site.tagline}</p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-ink-soft">Site</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
            {primaryNav.map((item, index) => {
              const isLastOddItem = primaryNav.length % 2 !== 0 && index === primaryNav.length - 1;

              return (
                <li key={item.href} className={isLastOddItem ? 'col-span-2' : undefined}>
                  <Link
                    href={item.href}
                    className="block text-base text-ink transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-ink-soft">Connect</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
            <li>
              <a href={`mailto:${site.email}`} className="block text-base text-ink transition-colors hover:text-accent">
                {site.email}
              </a>
            </li>
            {socialLinks.map((link, index) => {
              const isLastOddItem = socialLinks.length % 2 !== 0 && index === socialLinks.length - 1;

              return (
                <li key={link.label} className={isLastOddItem ? 'col-span-2' : undefined}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-base text-ink transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
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
