import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { PricingPackage } from '@/data/pricing';

export function PricingCard({ pkg }: { pkg: PricingPackage }) {
  return (
    <div
      className={cn(
        'flex h-full flex-col rounded-sm border p-8',
        pkg.featured ? 'border-ink bg-ink text-paper' : 'border-line bg-paper',
      )}
    >
      {pkg.featured ? (
        <span className="mb-6 w-fit rounded-full border border-paper/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest2 text-paper/80">
          Most booked
        </span>
      ) : null}

      <h3 className={cn('text-xl', pkg.featured ? 'text-paper' : 'text-ink')}>{pkg.name}</h3>

      <div className="mt-4 flex items-baseline gap-2">
        {pkg.priceNote ? (
          <span className={cn('text-xs uppercase tracking-wide', pkg.featured ? 'text-paper/60' : 'text-ink-soft')}>
            {pkg.priceNote}
          </span>
        ) : null}
        <span className="font-display text-4xl">{pkg.price}</span>
      </div>

      <p className={cn('mt-3 text-sm', pkg.featured ? 'text-paper/70' : 'text-ink-soft')}>{pkg.description}</p>

      <ul className="mt-8 flex-1 space-y-3">
        {pkg.features.map((feature) => (
          <li
            key={feature}
            className={cn(
              'flex items-start gap-3 text-sm',
              pkg.featured ? 'text-paper/85' : 'text-ink',
            )}
          >
            <span className={cn('mt-1 h-1 w-1 shrink-0 rounded-full', pkg.featured ? 'bg-paper' : 'bg-accent')} />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        href="/contact"
        variant={pkg.featured ? 'secondary' : 'primary'}
        className={cn('mt-8 w-full', pkg.featured && 'border-paper text-paper hover:bg-paper/10')}
      >
        {pkg.ctaLabel}
      </Button>
    </div>
  );
}
