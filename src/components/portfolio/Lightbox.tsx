'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { CornerFrame } from '@/components/ui/CornerFrame';
import type { PortfolioImage } from '@/data/portfolio';

interface LightboxProps {
  images: PortfolioImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const image = images[index];

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  // Lock background scroll and move focus into the dialog.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goPrev, goNext]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer, image ${index + 1} of ${images.length}`}
      className="fixed inset-0 z-[60] flex flex-col bg-dusk animate-fade"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const deltaX = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        if (deltaX > 50) goPrev();
        if (deltaX < -50) goNext();
        touchStartX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
        <span className="font-mono text-sm uppercase tracking-widest2 text-paper/80 sm:text-base">
          {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="font-mono text-sm uppercase tracking-widest2 text-paper transition-opacity hover:opacity-70 sm:text-base"
        >
          Close ✕
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-16">
        <CornerFrame tone="paper" alwaysVisible className="flex h-full w-full items-center justify-center">
          <div className="relative h-full max-h-[75vh] w-full max-w-4xl">
            <Image
              key={image.id}
              src={image.src}
              alt={image.alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </CornerFrame>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 text-lg text-paper transition-colors hover:border-paper sm:flex"
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 text-lg text-paper transition-colors hover:border-paper sm:flex"
            >
              →
            </button>
          </>
        ) : null}
      </div>

      {(image.caption || images.length > 1) && (
        <div className="flex flex-col items-center gap-3 px-5 pb-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="max-w-md text-sm text-paper/70 sm:text-base">{image.caption}</p>
          {images.length > 1 ? (
            <div className="flex justify-center gap-10 sm:hidden">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 text-lg text-paper"
              >
                ←
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 text-lg text-paper"
              >
                →
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
