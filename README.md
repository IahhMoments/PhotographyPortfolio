# Photography Portfolio

A modern, minimalist photography portfolio site — Home, Portfolio, Pricing, Contact, and FAQ — built to be exported as static HTML and hosted free on GitHub Pages.

**Stack:** Next.js 15 (App Router, static export) · React 18 · TypeScript · Tailwind CSS · self-hosted fonts (no external font/CDN requests).

---

## 1. Getting set up

You'll need [Node.js](https://nodejs.org) 20 or later.

```bash
npm install
cp .env.example .env.local     # then edit .env.local, see section 3
npm run dev                    # starts a dev server at http://localhost:3000
```

## 2. Building for production

```bash
npm run build
```

This produces a fully static site in the `out/` folder — every page is plain HTML/CSS/JS, with no server required. You can preview that exact build locally with:

```bash
npm run start     # serves the out/ folder at http://localhost:3000
```

You generally won't run this by hand for deployment — see section 7, the included GitHub Actions workflow does it for you on every push.

## 3. Configuring environment variables

Copy `.env.example` to `.env.local` for local development. There are two variables:

| Variable | What it's for |
|---|---|
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Your [Formspree](https://formspree.io) form ID, so the Contact page can actually send you emails. Sign up free, create a form, and copy the ID from your form's endpoint URL (`https://formspree.io/f/THIS_PART`). |
| `NEXT_PUBLIC_SITE_URL` | The absolute URL the site will be published at (no trailing slash). Used for SEO tags, `sitemap.xml`, and `robots.txt`. |

For the live site, don't commit `.env.local` — instead set these as **repository variables** (Settings → Secrets and variables → Actions → **Variables** tab) so the deploy workflow can read them. See section 8 for why these are safe to store as plain variables rather than encrypted secrets.

> This project ships with `.env.local` already filled in with your Formspree form ID, so `npm run dev` and `npm run build` work immediately. It's excluded from git via `.gitignore`, so it won't get committed — you'll still need to add the same values as GitHub Actions repository variables for the deployed site (section 8).

If you skip this step, the Contact form will detect it's unconfigured and show a clear inline message instead of silently failing.

## 4. Adding your own portfolio photos

All portfolio content lives in **`src/data/portfolio.ts`** — no other file needs to change.

1. Drop your image files into `public/images/portfolio/<category>/` (folders already exist for `portraits`, `family`, `events`, `coming-soon`).
2. Add one entry per photo to the matching array in `src/data/portfolio.ts`:
   ```ts
   {
     id: 'portraits-07',
     src: '/images/portfolio/portraits/07.jpg',
     alt: 'Describe what is actually in the photo',
     category: 'portraits',
     width: 1600,   // the real pixel width of your file
     height: 2000,  // the real pixel height of your file
     caption: 'Optional — shown in the lightbox',
   }
   ```
3. Delete the `placehold.co` placeholder entries once a category has real photos.
4. To move a photo between categories, just change its `category` value.
5. To add a whole new category (beyond Portraits / Family / Events / Coming Soon), add it to the `categories` array in the same file — the tabs and gallery pick it up automatically.

Write real, descriptive `alt` text for every photo — it's what screen readers announce and what search engines index.

## 5. Changing photographer information

Edit **`src/data/site.ts`**: name, tagline, bio, email, phone, location, and social links all live there and flow through to the header, footer, homepage, and Contact page automatically.

## 6. Changing pricing

Edit **`src/data/pricing.ts`**. Each package is one object — name, price, description, and a list of included features. Add, remove, or reorder packages freely; the Pricing page renders whatever is in that array. The current prices are placeholders based on typical Virginia photography rates, flagged as such on the Pricing page itself.

## 7. Adding FAQ content

Edit **`src/data/faq.ts`**. It starts as an empty array, which is why the FAQ page currently shows a "coming soon" message. The moment you add one or more `{ id, question, answer }` entries, the page automatically switches to a real accordion — no other code changes needed.

## 8. Deploying to GitHub Pages

This repo includes a ready-to-use workflow at `.github/workflows/deploy.yml`.

1. Push this project to a GitHub repository.
2. In the repo, go to **Settings → Pages** and set **Source** to "GitHub Actions."
3. In **Settings → Secrets and variables → Actions → Variables**, add:
   - `NEXT_PUBLIC_FORMSPREE_FORM_ID`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://yourusername.github.io/your-repo-name`)
4. Push to `main`. The workflow builds the site and publishes it automatically. Re-runs happen on every push, or manually from the Actions tab.

The workflow also sets the Next.js `basePath` for you automatically, so links and assets resolve correctly whether you're on a project page (`/your-repo-name/`) or a user/org page (`/`). If you later attach a custom domain, add a `CNAME` file to `public/` with your domain name in it, and update `NEXT_PUBLIC_SITE_URL` to match.

### Security notes

Because GitHub Pages serves static files only, there is no server to keep secrets on — **anything in this codebase ships to the visitor's browser.** That shapes a few decisions worth understanding rather than working around:

- **The Formspree form ID is not a secret.** It's closer to a form's URL than a password — Formspree is explicitly designed to have this ID embedded in public client-side code, and filters spam/abuse on their end rather than through secrecy of the ID. It's stored as a `NEXT_PUBLIC_` variable on purpose.
- **There is no database, and no server-side validation in the traditional sense**, because there's no server. The Contact form uses the official [`@formspree/react`](https://github.com/formspree/formspree-js) SDK and does its own validation in the browser (required fields, email format) before submitting, plus a hidden `_gotcha` field — Formspree's honeypot convention — to deter basic bots on their end. That's an appropriate level of protection for a static site; it is not equivalent to a backend that verifies input server-side.
- **If you later want a true backend** — server-verified validation, a database, or hidden API keys for something like a transactional email provider — you'd move off GitHub Pages to a host that runs server code (e.g. Vercel or Netlify) and add API routes or serverless functions. That's a meaningful architecture change, not a config toggle, so it's worth deciding intentionally rather than half-adopting it.
- Dependencies are pinned to specific versions in `package.json`; run `npm audit` periodically and update as needed.
- All user input in the contact form is escaped by React by default (no `dangerouslySetInnerHTML` is used anywhere in this codebase), which is the main defense against XSS in a React app.

## 9. Project structure

```
src/
  app/                Pages (App Router) — one folder per route
  components/
    layout/            Navbar, Footer, Container, PageHero
    ui/                Button, Eyebrow, CornerFrame, FadeIn
    home/, portfolio/, pricing/, contact/, faq/   Page-specific components
  data/                Edit these files to customize the site
    site.ts            Photographer info + primary nav
    portfolio.ts        Portfolio images and categories
    pricing.ts          Packages and prices
    faq.ts               FAQ questions and answers
  lib/                 Small shared utilities
public/
  images/portfolio/    Drop your own photos here (see section 4)
.github/workflows/     Deploy automation
```

## 10. Accessibility & performance notes

- Keyboard: full site navigation, the portfolio lightbox (arrow keys + Escape), and the FAQ accordion (native `<details>`) all work without a mouse, with visible focus states throughout.
- Motion: all animation respects `prefers-reduced-motion` (see `src/app/globals.css`) — the site is fully usable and legible with animations off.
- Images: `next/image` is used throughout for lazy-loading and layout stability; the hero image loads eagerly since it's above the fold, everything else lazy-loads as you scroll.
- Fonts are self-hosted via `@fontsource` packages — no third-party font requests at runtime.

## 11. Known limitation to be aware of

`next/image`'s optimization server doesn't run on GitHub Pages, so images are served at their original file size (`images.unoptimized: true` in `next.config.mjs`). In practice, this means it's worth compressing and appropriately sizing your photos yourself before adding them to `public/images/` — tools like [Squoosh](https://squoosh.app) or an export preset from Lightroom/Capture One work well. Aim for photos no wider than ~2400px on their longest edge for web use.
