# Siroja Redesign — Design Spec

**Date:** 2026-06-04
**Status:** Draft, awaiting user review
**Scope:** Polish existing React 19 + Vite + Tailwind v4 SPA, integrate the 5 brochure JPEGs in `documents/`, add comprehensive SEO infrastructure.

---

## 1. Goals & Non-Goals

**Goals**
- Polish the existing dark-purple visual language; do not introduce a new design system.
- Move the 3 CV. Siroja–owned brochures and the logo from `documents/` into `public/`, where Vite serves them as static assets.
- Add a new "Brosur" section between `CCTVSection` and `TargetAudience` that displays the 3 brochures in a 3-column grid with click-to-zoom lightbox.
- Add comprehensive SEO: full meta tag suite, Schema.org `LocalBusiness` JSON-LD, `sitemap.xml`, `robots.txt`, semantic HTML audit, descriptive Indonesian `alt` text.

**Non-Goals (deferred)**
- Real domain setup. Spec uses `https://cvsiroja.id` as a placeholder; one-line change in 2 places when the real domain lands.
- Custom-landscape OG image. We use the existing portrait brochure and accept center-crop in social previews.
- Multilingual support. Site stays Bahasa Indonesia only.
- Analytics / conversion tracking.
- Service worker / PWA.
- CMS for brochures. Static files are fine at this scale.
- Contact form. WhatsApp-only by design.

---

## 2. Asset Pipeline

### File moves (from `documents/` to `public/`)

```
documents/                                public/
├── logo.jpeg                  ──>      brand/logo.jpeg
├── brosur_paket_bisnis.jpeg   ──>      brochures/paket-bisnis.jpeg
├── brosur_pilihan_harga.jpeg  ──>      brochures/pilihan-harga.jpeg
└── jasa_instalasi_cctv.jpeg   ──>      brochures/instalasi-cctv.jpeg

(unchanged in public/): favicon.svg
(new in public/):       robots.txt
(new in public/):       sitemap.xml
```

The `documents/paket cctv.jpeg` (Warner & Spencer English template) is **excluded** — it is not CV. Siroja's own marketing. `documents/` becomes reference-only.

### Image optimization notes

- Brochures are 200–300 KB each at full resolution. For the gallery we do **not** resize at build time; the browser downsamples with `srcset` via Tailwind. Full-size lightbox image loads the same file.
- All `<img>` elements get `loading="lazy"` and `decoding="async"` (except the hero/eager LCP candidates).
- LCP candidate (the above-the-fold image) gets `loading="eager"` and `fetchpriority="high"`. For the current site this means nothing — the Hero is purely decorative CSS gradients. The first brochure card becomes LCP-relevant only on the Brosur section, which is below the fold.

---

## 3. New & Modified Constants

Extend `src/data/constants.js`:

```js
export const COMPANY = {
  name: 'CV. Siroja Network',
  phone: '081337239974',
  phoneFormatted: '+62 813-3723-9974',
  waLink: 'https://wa.me/6281337239974?text=Halo%20CV%20Siroja%20Network,%20saya%20tertarik%20dengan%20layanan%20Anda',
  // new fields:
  url: 'https://cvsiroja.id',           // canonical base — update when real domain lands
  tagline: 'Solusi Internet Cepat, Stabil & Aman',
  address: { region: 'Indonesia', country: 'ID' },
  logo: '/brand/logo.jpeg',
  brochures: [
    {
      id:    'paket-bisnis',
      src:   '/brochures/paket-bisnis.jpeg',
      title: 'Paket Bisnis 50 Mbps',
      desc:  'Koneksi dedicated untuk toko, ruko, kafe, dan usaha Anda.',
    },
    {
      id:    'pilihan-harga',
      src:   '/brochures/pilihan-harga.jpeg',
      title: 'Paket Internet Retail',
      desc:  'Pilihan paket rumahan dengan promo gratis instalasi Rp 500.000.',
    },
    {
      id:    'instalasi-cctv',
      src:   '/brochures/instalasi-cctv.jpeg',
      title: 'Jasa Instalasi CCTV',
      desc:  'Paket CCTV 4 channel dengan kamera 2K+ dan NVR EZVIZ.',
    },
  ],
}
```

> Note: the JSON-LD in `index.html` and the og:image meta duplicate this data. A short `// Keep in sync with index.html` comment will be added to `constants.js`.

---

## 4. New Components

### `src/components/Logo.jsx`

Reusable wrapper around `<img src="/brand/logo.jpeg">` so Navbar, Footer, and any future placement reference one component.

- Props: `size: 'sm' | 'md'` (32 px / 56 px), `className?: string`.
- Always renders `alt="Logo CV. Siroja Network"` and `decoding="async"`.
- `loading="eager"` and `fetchpriority="high"` on the Navbar instance (LCP candidate).

### `src/components/BrosurGallery.jsx`

The new section, placed between `CCTVSection` and `TargetAudience`.

- Section header in the existing visual language: purple/indigo gradient text, badge, sub-headline.
- 3-column responsive grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`.
- Each card:
  - 3:4 aspect ratio container with `overflow-hidden rounded-2xl border border-slate-800`.
  - `<img>` with `src` from `COMPANY.brochures[i].src`, `alt` from the title, `loading="lazy"`, `decoding="async"`, and `object-cover`.
  - Hover effect: `hover:scale-[1.02]` on the image, `hover:border-purple-500/40` on the card.
  - Title + desc overlay at the bottom (`bg-gradient-to-t from-slate-950/95 to-transparent`).
  - "Lihat Brosur" CTA button that opens the lightbox for that index.
- Section id: `id="brosur"` (matches the navbar anchor).
- Owns its own state: `const [selectedIndex, setSelectedIndex] = useState(null)`.
- Renders `<Lightbox>` conditionally when `selectedIndex !== null`.

### `src/components/Lightbox.jsx`

Accessible modal. Built from scratch (no library), ~70 lines.

- Fixed full-viewport overlay: `<div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center">`.
- Image: `max-h-[90vh] max-w-[90vw] object-contain`.
- Close on: ✕ button (top-right), `Escape` key, click on backdrop (not on the image or buttons).
- Navigate prev/next with arrow buttons and `←` / `→` keys. Wraps around at ends.
- Body scroll lock: set `document.body.style.overflow = 'hidden'` on mount, restore on unmount.
- A11y: `role="dialog"`, `aria-modal="true"`, `aria-label={\`Brosur: ${brochure.title}\`}`, `tabIndex={-1}` so it's programmatically focusable. Focus moves to the close button on open; previous focus is restored on close. Basic focus trap: Tab cycles within the modal.
- Image gets `alt` from the brochure title, `loading="eager"`.
- `onError` fallback: if the image fails to load, swap to a styled placeholder div with the title and description (defined inline in the component).

---

## 5. Modified Components

### `Navbar.jsx`
- Replace the "SN" monogram with `<Logo size="sm" />`. Logo link stays `href="#hero"`.
- Add the "Brosur" link: `{ label: 'Brosur', href: '#brosur' }` in `navLinks`.
- Add `aria-expanded={mobileOpen}` on the mobile menu toggle for screen readers.

### `Footer.jsx`
- Replace the "SN" monogram with `<Logo size="md" />`.
- Add "Brosur" to the `quickLinks` array.
- All other content unchanged.

### `Hero.jsx`
- No new images. The existing purple/indigo gradient blobs and grid background stay.
- No structural changes; only inherits the focus-ring CSS from `index.css`.

### `WhyChooseUs.jsx`, `InternetPackages.jsx`, `CCTVSection.jsx`, `TargetAudience.jsx`, `FloatingWA.jsx`
- Minimal changes:
  - `CCTVSection`: add a small `<span className="animate-pulse-glow">●</span>` inside the "Paket Unggulan" badge to draw the eye.
  - No cross-promotion callout from `TargetAudience` to the gallery — keeps scope tight and avoids a circular "Brosur" → "Brosur" navigation.
  - All sections: inherit focus-ring styling from the global `index.css` rule. No per-component class additions needed.
- `py-24` → `py-28` on Hero, WhyChooseUs, InternetPackages, CCTVSection, TargetAudience, and the new BrosurGallery — one-class per section, improves breathing room now that there is an extra section in the page.

---

## 6. App Composition

`src/App.jsx`:

```jsx
<>
  <Navbar />
  <main>
    <Hero />
    <WhyChooseUs />
    <InternetPackages />
    <CCTVSection />
    <BrosurGallery />     {/* new */}
    <TargetAudience />
  </main>
  <Footer />
  <FloatingWA />
</>
```

`BrosurGallery` owns its own `selectedIndex` state and renders the `Lightbox` inline. No global state, no context, no router. Single-page discipline preserved.

---

## 7. SEO Infrastructure

### `index.html` head

The current `index.html` has partial meta tags. Replace with the full suite:

- Standard: `charset`, `viewport`, `theme-color` (#020617), `title`, `description` (extended copy), `keywords` (extended list), `author`, `robots`.
- Canonical: `<link rel="canonical" href="https://cvsiroja.id/" />`.
- `hreflang`: `<link rel="alternate" hreflang="id" href="https://cvsiroja.id/" />`.
- OpenGraph: `og:type=website`, `og:url`, `og:site_name`, `og:locale=id_ID`, `og:title`, `og:description`, `og:image` (uses `https://cvsiroja.id/brochures/paket-bisnis.jpeg`), `og:image:alt`.
- Twitter Card: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`.
- JSON-LD script tag with `LocalBusiness` + `InternetServiceProvider` + `SecuritySystemInstaller` @type array. Includes `name`, `description`, `url`, `logo`, `image`, `telephone`, `priceRange="Rp"`, `areaServed`, `address`, and `hasOfferCatalog` with 3 `Offer` entries (Retail, Bisnis, CCTV) with `priceCurrency="IDR"` and numeric `price` values matching the brochure data.

The JSON-LD lives inline in `index.html` (not rendered by React) so it appears in the initial HTML response and is readable by search engines that don't execute JS.

### `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://cvsiroja.id/</loc>           <changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://cvsiroja.id/#features</loc>  <changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://cvsiroja.id/#internet</loc>  <changefreq>weekly</changefreq> <priority>0.9</priority></url>
  <url><loc>https://cvsiroja.id/#cctv</loc>      <changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://cvsiroja.id/#brosur</loc>    <changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://cvsiroja.id/#footer</loc>    <changefreq>yearly</changefreq> <priority>0.4</priority></url>
</urlset>
```

### `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://cvsiroja.id/sitemap.xml
```

Both files are served at the site root by Vite's `public/` convention.

### Semantic HTML & accessibility

Audit pass over the existing codebase:

- `<html lang="id">` — already correct.
- Semantic regions (`<header>`, `<main>`, `<section>`, `<footer>`) — already correct.
- All `<img>` elements get Indonesian `alt` text:
  - Logo: `alt="Logo CV. Siroja Network"`.
  - Each brochure thumbnail: `alt={brochure.title}`.
  - Decorative-only images (none currently): empty `alt=""`.
- Icon-only buttons already have `aria-label` (Navbar hamburger, FloatingWA). Verified.
- Mobile nav menu: add `aria-expanded={mobileOpen}` on the toggle button.
- All interactive elements (`<a>`, `<button>`) inherit a global focus ring from `index.css`:
  ```css
  a:focus-visible,
  button:focus-visible {
    @apply outline-none ring-2 ring-purple-500 ring-offset-2 ring-offset-slate-950;
  }
  ```
- A `prefers-reduced-motion: reduce` media query in `index.css` disables `float`, `pulse-glow`, `fadeInUp`, `wa-ping`, `shimmer` animations. Accessibility win for users with vestibular sensitivity.

---

## 8. Data Flow

```
COMPANY (constants.js) ──┬──> Logo.jsx             (Navbar, Footer)
                         ├──> BrosurGallery.jsx    (reads .brochures)
                         │     └──> Lightbox.jsx   (props: brochure, onClose, onPrev, onNext)
                         ├──> index.html JSON-LD   (manually mirrored — comment in constants.js)
                         └──> og:image meta tag    (manually mirrored)
```

Single source of truth in `COMPANY`; everything else either imports it or duplicates it (the index.html duplication is intentional for SEO and documented).

---

## 9. Error Handling

- **Image load failure (brochure)**: `<img onError>` swaps to a styled fallback div with the brochure's `title` and `desc`. Card looks intentional instead of broken.
- **Image load failure (logo)**: silently fall back to the existing "SN" monogram (a small inline fallback in `Logo.jsx`).
- **JS disabled**: JSON-LD, meta tags, sitemap, robots.txt still work. The gallery cards would be non-interactive images — acceptable degradation for an SPA.
- **Lightbox overflow on small landscape screens**: image uses `max-h-[90vh] max-w-[90vw] object-contain`. Portrait brochures fit comfortably on phones in portrait; in landscape the image scales down to viewport height.
- **No new dependencies**: no image-processing library, no lightbox library, no `react-helmet` (Vite handles `<head>` via `index.html` + a constant). Bundle size impact: +3 image files (each ~280 KB, lazy-loaded) + ~1 KB of JS for the new components.

---

## 10. Verification

Before declaring complete, verify all of:

1. `npm run lint` passes with no errors.
2. `npm run build` produces a `dist/` with `brand/`, `brochures/`, `favicon.svg`, `robots.txt`, `sitemap.xml` all present at root.
3. `npm run preview` + manual smoke test in browser:
   - Nav scroll works for all 6 anchors (`#hero`, `#features`, `#internet`, `#cctv`, `#brosur`, `#footer`).
   - Lightbox opens, closes on ESC, closes on backdrop click, prev/next arrow keys cycle, focus is visible on every interactive element.
   - All images load (or fall back gracefully).
   - No console errors.
   - `prefers-reduced-motion: reduce` honored (test in DevTools rendering panel).
4. `view-source:` of the running site shows JSON-LD, canonical, OG/Twitter tags, and `lang="id"` in the head.
5. `curl http://localhost:4173/robots.txt` and `/sitemap.xml` return the expected text/XML.
6. After deployment: Facebook Sharing Debugger and Twitter Card Validator show the OG image preview (best-effort — local dev URLs won't validate).

---

## 11. Files Touched

**New:**
- `public/brand/logo.jpeg`
- `public/brochures/paket-bisnis.jpeg`
- `public/brochures/pilihan-harga.jpeg`
- `public/brochures/instalasi-cctv.jpeg`
- `public/robots.txt`
- `public/sitemap.xml`
- `src/components/Logo.jsx`
- `src/components/BrosurGallery.jsx`
- `src/components/Lightbox.jsx`

**Modified:**
- `index.html` (full meta tag suite + inline JSON-LD)
- `src/data/constants.js` (extend `COMPANY` with `url`, `tagline`, `address`, `logo`, `brochures`)
- `src/App.jsx` (import + render `BrosurGallery`)
- `src/index.css` (focus-ring global rule, `prefers-reduced-motion` block)
- `src/components/Navbar.jsx` (logo, Brosur link, aria-expanded)
- `src/components/Footer.jsx` (logo, Brosur link)
- `src/components/CCTVSection.jsx` (one inline `animate-pulse-glow` span)

**No-op references (left as-is):**
- `src/components/Hero.jsx`
- `src/components/WhyChooseUs.jsx`
- `src/components/InternetPackages.jsx`
- `src/components/TargetAudience.jsx`
- `src/components/FloatingWA.jsx`
- `src/main.jsx`
- `vite.config.js`, `postcss.config.js`, `tailwind.config.js`, `eslint.config.js`
- `package.json` (no new dependencies)

---

## 12. Out of Scope (recap)

These are explicitly deferred to keep this change focused:

- Real domain setup. Spec uses `https://cvsiroja.id` as a placeholder; one-line change in 3 places (`index.html`, `public/sitemap.xml`, `public/robots.txt`).
- Custom-landscape OG image. Use the portrait brochure; accept center-crop in previews.
- Multilingual support. Site stays Bahasa Indonesia only.
- Analytics / conversion tracking.
- Service worker / PWA / offline support.
- CMS for brochures. Static files are fine at this scale.
- Contact form. WhatsApp-only by design.
