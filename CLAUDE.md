# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Company profile website for **CV. Siroja Network** — an ISP and CCTV installation service based in Indonesia. The site is a single-page React application (Bahasa Indonesia) that presents internet packages, CCTV installation services, and a WhatsApp contact channel.

## Tech Stack

- **React 19** (JSX only, no TypeScript)
- **Vite 8** (dev server + bundler)
- **Tailwind CSS v4** via `@tailwindcss/postcss` (NOT the legacy `tailwindcss` PostCSS plugin)
- **ESLint** with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`
- No test framework configured

Tailwind v4 specifics: CSS uses `@import "tailwindcss"` and custom theme tokens use `@theme { --color-*: value; }` in CSS — not the v3 `@tailwind base/components/utilities` directives or `theme.extend` in the config alone.

## Commands

```bash
npm install         # Install dependencies
npm run dev         # Vite dev server with HMR
npm run build       # Production build → dist/
npm run preview     # Preview the production build locally
npm run lint        # ESLint over JS/JSX files
```

No test runner is configured. `dist/` is gitignored and produced by `npm run build`.

## Architecture

Single-page application — all sections compose inside `src/App.jsx`. There is no router; navigation is anchor-based (`href="#section-id"`) with smooth scroll set globally in `src/index.css`.

**Entry & composition:**
- `index.html` — Indonesian-language SEO meta tags (title, description, keywords, OpenGraph)
- `src/main.jsx` — React 19 `createRoot` + `<StrictMode>` mount
- `src/App.jsx` — assembles the sections in order: `Navbar` → `Hero` → `WhyChooseUs` → `InternetPackages` → `CCTVSection` → `TargetAudience` → `Footer`, plus `FloatingWA` overlay
- `src/data/constants.js` — exports `COMPANY` (name, phone, `waLink` deep link). Import this anywhere a WhatsApp CTA is needed rather than hardcoding the URL

**Section behavior worth knowing:**
- `InternetPackages` is the only component with internal state — a `tab` toggle between "Retail" (4 tiers) and "Bisnis Dedicated" (single card)
- `Navbar` toggles `bg-slate-950/90 backdrop-blur` styling based on `window.scrollY > 20` via a scroll listener
- `FloatingWA` is `position: fixed bottom-6 right-6` with a CSS ping ring animation; it sits above all sections

**Styling:**
- `src/index.css` is the only CSS entry. It hosts `@import "tailwindcss"`, the `@theme` color tokens (purple-500/700/800, indigo-900), the dark base body style, and all custom keyframe animations (`float`, `pulse-glow`, `fadeInUp`, `wa-ping`, `shimmer`) + utility classes (`gradient-text`, `card-glow`, `bg-grid`, `section-divider`)
- `tailwind.config.js` mirrors the same color palette for IDE/IntelliSense
- `src/App.css` is essentially empty — Tailwind utility classes handle all component styling

**Branding & convention details** (also documented in `.github/copilot-instructions.md`):
- Brand colors: `purple-500 #8B5CF6` (accent), `purple-700 #6D28D9` (secondary), `purple-800 #5B21B6` (primary), `indigo-900 #1E1B4B` (dark bg)
- Mobile-first responsive design using `sm:` / `md:` / `lg:` breakpoints
- Inline SVG icons only — no icon library, no raster UI icons
- External WhatsApp links use `target="_blank" rel="noopener noreferrer"`
- Currency formatted as Indonesian Rupiah: `Rp X.XXX.XXX` (dot thousands separator)
- Section IDs that the navbar anchors to: `#hero`, `#features`, `#internet`, `#cctv`, `#footer`

## Unused Assets

`documents/` contains five JPEG marketing materials (CCTV brochures, price lists, logo). They are not referenced by any component and not deployed — likely source material kept for reference rather than runtime assets. `public/assets/` is also empty.
