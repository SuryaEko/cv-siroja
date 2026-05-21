# Copilot Instructions — CV. Siroja Network Company Profile

## Tech Stack

- **React 19** (JSX, functional components with hooks)
- **Vite 8** (dev server, bundler)
- **Tailwind CSS 4** — PostCSS via `@tailwindcss/postcss` (NOT the `tailwindcss` plugin directly)
- **PostCSS** with Autoprefixer
- **ESLint** with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`

No TypeScript — JS/JSX only. No test framework configured.

> **Tailwind v4 CSS entry:** Use `@import "tailwindcss"` in CSS files, **not** `@tailwind base/components/utilities`. Custom theme tokens use `@theme { --color-*: value; }` in CSS.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # ESLint (JS/JSX files)
```

## Project Structure

This is a **single-page React app** — all page sections live in `src/App.jsx` (or decomposed into components under `src/`). Entry point is `src/main.jsx`. Global styles are in `src/index.css` (Tailwind directives) and component-level CSS in `src/App.css`.

## Branding & Business Info

This is the company profile site for **CV. Siroja Network** — an ISP and CCTV installation service.

| Detail | Value |
|---|---|
| Company | CV. Siroja Network |
| WhatsApp | `081337239974` / `+62 81337239974` |
| WA Deep Link | `https://wa.me/6281337239974?text=Halo%20CV%20Siroja%20Network,%20saya%20tertarik%20dengan%20layanan%20Anda` |
| Value Props | Internet Cepat & Stabil, Support Terbaik, Harga Terjangkau, Kualitas Terjamin, Jaringan Andal |

## Tailwind Custom Colors

Defined in `tailwind.config.js` — use these instead of default shades:

```js
purple-500  → #8B5CF6  // Accent
purple-700  → #6D28D9  // Secondary
purple-800  → #5B21B6  // Primary
indigo-900  → #1E1B4B  // Dark background
gray-50     → #F5F3FF  // Light background / text
```

## Page Sections (Target Architecture)

The site should be structured as these sections (scroll-based SPA):

1. **Hero** — Headline, sub-headline, two CTAs, promo badge
2. **Why Choose Us** — 5-feature icon grid (after-sales, technician, uptime, config, security)
3. **Internet Packages** — Toggle between Retail (4 tiers: 125K–250K/mo) and Bisnis Dedicated (400K/mo, 50 Mbps)
4. **CCTV Installation** — Main package (4CH 4cam 3MP 2K+, Rp 4.580.000) + optional basic/premium tiers
5. **Target Audience** — Card grid of ideal customer segments
6. **Footer** — Logo, short about, quick links, dynamic copyright year

**Floating WhatsApp button** fixed bottom-right on all sections.

## Conventions

- **Mobile-first** responsive design using Tailwind breakpoints (`sm:`, `md:`, `lg:`).
- Use **semantic HTML** (`<header>`, `<main>`, `<section>`, `<footer>`) for SEO.
- Prefer **inline SVG icons** over raster images for UI elements; use Heroicons or similar for feature icons.
- CTA buttons that trigger scroll use `href="#section-id"`; external WA links open in a new tab.
- The promo banner ("Gratis Biaya Instalasi Senilai Rp 500.000!") should be visually distinct (e.g., yellow/amber highlight or badge).
- Pricing cards should have clear hover states and visual distinction for the recommended/popular tier.
- Smooth scroll behavior is set globally via CSS (`scroll-behavior: smooth`).
- Currency formatting uses Indonesian Rupiah: `Rp X.XXX.XXX` (dot as thousands separator).
