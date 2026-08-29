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
        paper: '#F7F6F2', // primary background
        'paper-soft': '#ECEAE5', // secondary / card background
        ink: '#171717', // primary text
        'ink-soft': '#666666', // secondary text — chosen to clear 4.5:1 contrast on both paper and paper-soft
        line: '#D9D7D2', // borders, dividers, hairlines
        accent: '#33465C', // deep slate — used sparingly: focus rings, links, active tab
        'accent-soft': '#33465C1A', // accent at 10% opacity, for subtle fills
        dusk: '#0B0B0B', // near-black, used only for the immersive lightbox backdrop
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
