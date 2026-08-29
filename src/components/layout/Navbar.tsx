'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { primaryNav, site } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-lg font-medium tracking-tight text-ink">
          {site.name}
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'font-mono text-xs uppercase tracking-widest2 text-ink-soft transition-colors duration-200 hover:text-ink',
                isActive(item.href) && 'text-ink',
              )}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" variant="primary" className="px-5 py-2.5 text-xs">
            Get booked
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={cn(
                'absolute left-0 top-0 h-px w-6 bg-ink transition-transform duration-300 ease-premium',
                open && 'translate-y-[7px] rotate-45',
              )}
            />
            <span
              className={cn(
                'absolute bottom-0 left-0 h-px w-6 bg-ink transition-transform duration-300 ease-premium',
                open && '-translate-y-[7px] -rotate-45',
              )}
            />
          </span>
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          'grid overflow-hidden border-t border-line/70 bg-paper transition-[grid-template-rows] duration-300 ease-premium md:hidden',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <Container className="flex flex-col gap-1 py-6">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'py-3 font-display text-2xl text-ink-soft transition-colors',
                  isActive(item.href) && 'text-ink',
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" variant="primary" className="mt-4 w-full">
              Get booked
            </Button>
          </Container>
        </div>
      </div>
    </header>
  );
}
