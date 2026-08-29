import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

interface PageHeroProps {
  index: string;
  title: string;
  description?: string;
}

export function PageHero({ index, title, description }: PageHeroProps) {
  return (
    <Container as="section" className="pb-14 pt-32 sm:pb-20 sm:pt-40">
      <Eyebrow index={index}>{title}</Eyebrow>
      <h1 className="mt-4 max-w-2xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">{title}</h1>
      {description ? (
        <p className="mt-6 max-w-xl text-balance text-lg text-ink-soft">{description}</p>
      ) : null}
    </Container>
  );
}
