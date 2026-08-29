// next.config.mjs
//
// This project is built as a fully static site (`output: "export"`) so it can be
// hosted for free on GitHub Pages. GitHub Pages has no server, so there are no
// API routes, no server actions, and no image optimization server — see the
// README for what that does and doesn't affect.
//
// BASE PATH
// If you deploy to a *project* page (https://<user>.github.io/<repo>/), the site
// is served from a sub-path, so every asset URL needs that sub-path prefixed.
// The included GitHub Actions workflow sets NEXT_PUBLIC_BASE_PATH automatically
// from the repository name at build time. If you deploy to a *user/org* page
// (https://<user>.github.io/) or a custom domain, leave it unset (empty string).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  // Keeps generated URLs consistent between local dev and the exported site.
  trailingSlash: true,
  images: {
    // GitHub Pages can't run Next's image optimization server, so images are
    // served as-is. next/image is still used throughout for lazy loading and
    // layout stability — see src/components/portfolio/GalleryImage.tsx.
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
