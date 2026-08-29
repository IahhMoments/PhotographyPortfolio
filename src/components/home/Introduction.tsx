import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FadeIn } from '@/components/ui/FadeIn';
import { site } from '@/data/site';

export function Introduction() {
  return (
    <Container as="section" className="py-24 sm:py-32">
      <FadeIn className="grid gap-8 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-16">
        <Eyebrow>About</Eyebrow>
        <p className="max-w-2xl text-2xl leading-relaxed text-ink sm:text-3xl">{site.heroIntro}</p>
      </FadeIn>
    </Container>
  );
}
