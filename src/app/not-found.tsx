import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

export default function NotFound() {
  return (
    <Container as="section" className="flex min-h-[70vh] flex-col items-start justify-center py-32">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-4 text-4xl sm:text-5xl">This page stepped out of frame.</h1>
      <p className="mt-4 max-w-md text-ink-soft">
        The page you're looking for doesn't exist, or has moved. Let's get you back on track.
      </p>
      <Button href="/" variant="primary" className="mt-8">
        Back to home
      </Button>
    </Container>
  );
}
