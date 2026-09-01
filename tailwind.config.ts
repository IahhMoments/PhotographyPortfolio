import type { Config } from 'tailwindcss';

// ---------------------------------------------------------------------------
// DESIGN TOKENS
// This is the single place that controls the site's entire visual theme.
// Change a value here and it updates everywhere the corresponding Tailwind
// class (e.g. bg-paper, text-ink, font-display) is used.
// ---------------------------------------------------------------------------
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#E8E8E8', // primary background: neutral gray stone
        'paper-soft': '#D9D9D9', // elevated surfaces, cards, form fields
        ink: '#000000', // primary text: black
        'ink-soft': '#666666', // secondary text: muted gray
        line: '#979797', // borders and dividers
        accent: '#b5b0b0', // warm accent, used sparingly
        'accent-soft': '#B0886D20', // subtle warm accent support
        dusk: '#111111', // dark overlay backdrop
      },
      fontFamily: {
        // Display: large editorial headings, hero type, nav wordmark.
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        // Body: paragraphs, buttons, form fields, UI copy.
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        // Utility: small caps labels, index numbers, image metadata captions —
        // a nod to the technical, exposure-reading side of photography.
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '1280px',
      },
      letterSpacing: {
        widest2: '0.18em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fade: 'fade 0.6s ease-out forwards',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
