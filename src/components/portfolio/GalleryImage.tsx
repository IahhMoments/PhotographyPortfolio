import Image from 'next/image';
import { CornerFrame } from '@/components/ui/CornerFrame';
import type { PortfolioImage } from '@/data/portfolio';

interface GalleryImageProps {
  image: PortfolioImage;
  index: number;
  total: number;
  onOpen: () => void;
}

export function GalleryImage({ image, index, total, onOpen }: GalleryImageProps) {
  const aspect = image.height / image.width;
  const isTall = aspect > 1.15;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full text-left focus-visible:outline-none"
      aria-label={`Open image ${index + 1} of ${total}: ${image.alt}`}
    >
      <CornerFrame className="overflow-hidden rounded-sm bg-paper-soft ring-0 transition-shadow group-focus-visible:ring-2 group-focus-visible:ring-accent">
        <div className={isTall ? 'relative aspect-[4/5]' : 'relative aspect-[4/3]'}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 48vw, (min-width: 640px) 55vw, 90vw"
            className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
          />
        </div>
      </CornerFrame>
      <div className="mt-3 flex items-baseline justify-between gap-3 font-mono text-[12px] uppercase tracking-widest2 text-ink-soft sm:text-[13px]">
        <span className="text-base font-medium text-ink sm:text-lg">{String(index + 1).padStart(2, '0')}</span>
        {image.caption ? <span className="truncate pl-4 text-[10px] sm:text-[11px]">{image.caption}</span> : null}
      </div>
    </button>
  );
}
