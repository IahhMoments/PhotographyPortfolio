// ---------------------------------------------------------------------------
// FAQ DATA
//
// Empty on purpose for now. When you're ready to add questions, just push
// entries onto this array in the shape below — the FAQ page automatically
// switches from its "coming soon" empty state to a rendered accordion list
// the moment this array has at least one item. No page code needs to change.
//
// Example:
// { id: 'turnaround', question: 'How long until I get my photos?',
//   answer: 'Portrait and family galleries are delivered within 2 weeks...' }
// ---------------------------------------------------------------------------

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export const faqEntries: FaqEntry[] = [];
