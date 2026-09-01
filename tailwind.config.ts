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
        paper: '#F3EBE3', // primary background: warm alabaster
        'paper-soft': '#FAF7F2', // card / elevated surface: soft linen
        ink: '#3D2B1F', // primary text: dark espresso
        'ink-soft': '#6E5B4F', // secondary text: muted sepia
        line: '#8F7D71', // borders, dividers, subtle separators
        accent: '#965C38', // interactive accent: deep sand / tan
        'accent-soft': '#965C3826', // accent at 15% opacity
        dusk: '#1E1A18', // warm dark backdrop for overlays
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
