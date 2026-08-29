import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';

interface CTABandProps {
  heading: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
  tone?: 'default' | 'inverted';
}

/** A full-width CTA banner. Reused on Home, Portfolio, and Pricing, each with different copy pointing to Contact. */
export function CTABand({ heading, body, ctaLabel, ctaHref, tone = 'default' }: CTABandProps) {
  const inverted = tone === 'inverted';
  return (
    <section className={inverted ? 'bg-ink text-paper' : 'bg-paper-soft'}>
      <Container className="py-20 sm:py-28">
        <FadeIn className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg">
            <h2 className={inverted ? 'text-3xl text-paper sm:text-4xl' : 'text-3xl sm:text-4xl'}>{heading}</h2>
            {body ? (
              <p className={inverted ? 'mt-4 text-paper/70' : 'mt-4 text-ink-soft'}>{body}</p>
            ) : null}
          </div>
          <Button href={ctaHref} variant={inverted ? 'secondary' : 'primary'} className={inverted ? 'border-paper text-paper hover:bg-paper/10' : ''}>
            {ctaLabel}
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
