import type { FaqEntry } from '@/data/faq';

export function FaqAccordion({ entries }: { entries: FaqEntry[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {entries.map((entry) => (
        <details key={entry.id} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg text-ink marker:content-none">
            {entry.question}
            <span className="shrink-0 font-mono text-ink-soft transition-transform duration-300 ease-premium group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-4 max-w-2xl text-ink-soft">{entry.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqEmptyState() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-sm border border-dashed border-line py-28 text-center">
      <p className="font-mono text-xs uppercase tracking-widest2 text-ink-soft">Coming soon</p>
      <p className="max-w-xs text-ink-soft">
        FAQ content is on the way. In the meantime, feel free to reach out with any questions directly.
      </p>
    </div>
  );
}
