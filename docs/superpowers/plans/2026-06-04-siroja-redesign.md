# Siroja Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the existing CV. Siroja Network SPA, integrate the 3 CV. Siroja–owned brochures from `documents/` as a new click-to-zoom "Brosur" section, and add comprehensive SEO infrastructure (meta tags, JSON-LD, sitemap, robots).

**Architecture:** Single-page React 19 + Vite + Tailwind v4 SPA. The change is additive: move 4 JPEGs into `public/`, add 3 components (Logo, BrosurGallery, Lightbox), and modify 7 existing files. `BrosurGallery` owns the only new state (`selectedIndex`); no global state, no context, no router. The lightbox is built from scratch with React hooks; no new dependencies.

**Tech Stack:** React 19 (JSX), Vite 8, Tailwind v4 (PostCSS via `@tailwindcss/postcss`), vanilla CSS in `src/index.css`. No test framework — verification is `npm run lint` + `npm run build` + manual browser smoke test.

**Verification approach:** This project has no test runner. Each task ends with the appropriate check from this set:
- `npm run lint` — for code that touches JS/JSX
- `npm run build` — for tasks that change `index.html` or `public/` contents (verifies static assets land at the right paths in `dist/`)
- `npm run dev` + manual inspection — for the gallery, lightbox, and any visually-rendered component

**Source files referenced:**
- Spec: `docs/superpowers/specs/2026-06-04-siroja-redesign-design.md`
- Existing constants: `src/data/constants.js`
- Existing CSS: `src/index.css` (uses `@import "tailwindcss"` and `@theme {}` block — Tailwind v4 syntax, not v3)

---

## File Map

**New files (9):**
- `public/brand/logo.jpeg` — moved from `documents/logo.jpeg`
- `public/brochures/paket-bisnis.jpeg` — moved from `documents/brosur_paket_bisnis.jpeg`
- `public/brochures/pilihan-harga.jpeg` — moved from `documents/brosur_pilihan_harga.jpeg`
- `public/brochures/instalasi-cctv.jpeg` — moved from `documents/jasa_instalasi_cctv.jpeg`
- `public/robots.txt` — new
- `public/sitemap.xml` — new
- `src/components/Logo.jsx` — new (~20 lines)
- `src/components/BrosurGallery.jsx` — new (~80 lines)
- `src/components/Lightbox.jsx` — new (~90 lines)

**Modified files (7):**
- `index.html` — full head replacement with meta suite + inline JSON-LD
- `src/data/constants.js` — extend `COMPANY` object
- `src/App.jsx` — import + render `BrosurGallery`
- `src/index.css` — focus-ring global rule + `prefers-reduced-motion` block
- `src/components/Navbar.jsx` — swap monogram for `<Logo>`, add "Brosur" link, add `aria-expanded`
- `src/components/Footer.jsx` — swap monogram for `<Logo>`, add "Brosur" link
- `src/components/CCTVSection.jsx` — one `animate-pulse-glow` span inside the "Paket Unggulan" badge

**Unchanged but inherited:** the focus-ring and reduced-motion CSS in `index.css` apply globally, so the new components and existing components all benefit without per-file changes.

---

## Task 1: Move 4 JPEGs from `documents/` to `public/`

**Files:**
- Move: `documents/logo.jpeg` → `public/brand/logo.jpeg`
- Move: `documents/brosur_paket_bisnis.jpeg` → `public/brochures/paket-bisnis.jpeg`
- Move: `documents/brosur_pilihan_harga.jpeg` → `public/brochures/pilihan-harga.jpeg`
- Move: `documents/jasa_instalasi_cctv.jpeg` → `public/brochures/instalasi-cctv.jpeg`

- [ ] **Step 1: Create the destination directories**

Run:
```bash
mkdir -p /home/surya/projects/cv-siroja/public/brand /home/surya/projects/cv-siroja/public/brochures
```

- [ ] **Step 2: Copy the 4 JPEGs to their new locations**

Run:
```bash
cp /home/surya/projects/cv-siroja/documents/logo.jpeg                 /home/surya/projects/cv-siroja/public/brand/logo.jpeg
cp /home/surya/projects/cv-siroja/documents/brosur_paket_bisnis.jpeg  /home/surya/projects/cv-siroja/public/brochures/paket-bisnis.jpeg
cp /home/surya/projects/cv-siroja/documents/brosur_pilihan_harga.jpeg /home/surya/projects/cv-siroja/public/brochures/pilihan-harga.jpeg
cp /home/surya/projects/cv-siroja/documents/jasa_instalasi_cctv.jpeg  /home/surya/projects/cv-siroja/public/brochures/instalasi-cctv.jpeg
```

- [ ] **Step 3: Verify the copies**

Run:
```bash
ls -la /home/surya/projects/cv-siroja/public/brand/ /home/surya/projects/cv-siroja/public/brochures/
```

Expected output: 4 files total, 1 in `brand/` and 3 in `brochures/`, with sizes matching the originals (logo ~58 KB, each brochure ~200-290 KB).

- [ ] **Step 4: Verify originals still exist (do not delete yet — the spec keeps `documents/` as reference)**

Run:
```bash
ls /home/surya/projects/cv-siroja/documents/
```

Expected: the 5 original files are still present. Do not delete them.

---

## Task 2: Create `public/robots.txt`

**Files:**
- Create: `public/robots.txt`

- [ ] **Step 1: Write the file with the placeholder domain**

Write `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://cvsiroja.id/sitemap.xml
```

- [ ] **Step 2: Verify the file content**

Run:
```bash
cat /home/surya/projects/cv-siroja/public/robots.txt
```

Expected output matches the content above (3 lines: `User-agent: *`, `Allow: /`, blank line, `Sitemap: ...`).

---

## Task 3: Create `public/sitemap.xml`

**Files:**
- Create: `public/sitemap.xml`

- [ ] **Step 1: Write the file**

Write `public/sitemap.xml`:

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

- [ ] **Step 2: Validate XML is well-formed**

Run:
```bash
xmllint --noout /home/surya/projects/cv-siroja/public/sitemap.xml && echo "OK"
```

Expected: prints `OK` and exits 0.

If `xmllint` is not installed, use a non-parsing structural check instead — do **not** fall back to `python3 -c "import xml.etree.ElementTree ..."` (Python's stdlib XML parsers are vulnerable to XXE / billion-laughs attacks by default, even on trusted local files):

```bash
head -1 /home/surya/projects/cv-siroja/public/sitemap.xml | grep -q '<?xml' && \
grep -q '<urlset'   /home/surya/projects/cv-siroja/public/sitemap.xml && \
grep -q 'cvsiroja.id' /home/surya/projects/cv-siroja/public/sitemap.xml && \
echo "sitemap.xml looks valid"
```

Expected: prints `sitemap.xml looks valid`. If you need a real parser for any reason, install `defusedxml` (`pip install defusedxml`) and use `import defusedxml.ElementTree as ET`.

---

## Task 4: Extend `src/data/constants.js`

**Files:**
- Modify: `src/data/constants.js` (full rewrite — 8 lines → ~35 lines)

- [ ] **Step 1: Replace the file with the extended `COMPANY` object**

Write `src/data/constants.js`:

```js
// Keep in sync with index.html JSON-LD and the og:image / og:url meta tags.
export const COMPANY = {
  name: 'CV. Siroja Network',
  phone: '081337239974',
  phoneFormatted: '+62 813-3723-9974',
  waLink:
    'https://wa.me/6281337239974?text=Halo%20CV%20Siroja%20Network,%20saya%20tertarik%20dengan%20layanan%20Anda',
  url: 'https://cvsiroja.id',
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

- [ ] **Step 2: Verify with lint**

Run: `npm run lint`
Expected: passes with no errors. ESLint may warn on the destructured import shape; if so, no action needed (warnings are OK).

---

## Task 5: Replace `index.html` head with full meta suite + JSON-LD

**Files:**
- Modify: `index.html` (full rewrite)

- [ ] **Step 1: Replace `index.html` with the full version**

Write `index.html`:

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#020617" />

    <title>CV. Siroja Network – Internet Stabil, Bisnis Maju!</title>
    <meta name="description" content="Solusi Internet Cepat, Stabil & Aman untuk Toko, Ruko, Rumah & Usaha Anda. Jasa instalasi CCTV profesional bergaransi. Hubungi kami sekarang!" />
    <meta name="keywords" content="internet cepat, ISP, CCTV instalasi, CV Siroja Network, internet murah, paket internet bisnis, internet stabil, pasang wifi, jasa pasang CCTV" />
    <meta name="author" content="CV. Siroja Network" />
    <meta name="robots" content="index, follow" />

    <link rel="canonical" href="https://cvsiroja.id/" />
    <link rel="alternate" hreflang="id" href="https://cvsiroja.id/" />

    <meta property="og:type"        content="website" />
    <meta property="og:url"         content="https://cvsiroja.id/" />
    <meta property="og:site_name"   content="CV. Siroja Network" />
    <meta property="og:locale"      content="id_ID" />
    <meta property="og:title"       content="CV. Siroja Network – Internet Stabil, Bisnis Maju!" />
    <meta property="og:description" content="Paket internet retail & bisnis dedicated, plus jasa instalasi CCTV profesional. Konsultasi gratis via WhatsApp." />
    <meta property="og:image"       content="https://cvsiroja.id/brochures/paket-bisnis.jpeg" />
    <meta property="og:image:alt"   content="Brosur paket bisnis CV. Siroja Network – 50 Mbps dedicated Rp 400.000/bulan" />

    <meta name="twitter:card"        content="summary_large_image" />
    <meta name="twitter:title"       content="CV. Siroja Network – Internet Stabil, Bisnis Maju!" />
    <meta name="twitter:description" content="Paket internet retail & bisnis dedicated, plus jasa instalasi CCTV profesional." />
    <meta name="twitter:image"       content="https://cvsiroja.id/brochures/paket-bisnis.jpeg" />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "InternetServiceProvider", "SecuritySystemInstaller"],
      "@id": "https://cvsiroja.id/#business",
      "name": "CV. Siroja Network",
      "description": "Solusi Internet Cepat, Stabil & Aman untuk rumah dan bisnis, plus jasa instalasi CCTV profesional.",
      "url": "https://cvsiroja.id/",
      "logo": "https://cvsiroja.id/brand/logo.jpeg",
      "image": "https://cvsiroja.id/brochures/paket-bisnis.jpeg",
      "telephone": "+62-813-3723-9974",
      "priceRange": "Rp",
      "areaServed": { "@type": "Country", "name": "Indonesia" },
      "address": { "@type": "PostalAddress", "addressCountry": "ID" },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Layanan CV. Siroja Network",
        "itemListElement": [
          { "@type": "Offer", "name": "Paket Internet Retail",         "description": "10–50 Mbps, gratis biaya instalasi",  "priceCurrency": "IDR", "price": "125000" },
          { "@type": "Offer", "name": "Paket Bisnis Dedicated 50 Mbps","description": "Bandwidth dedicated, support prioritas", "priceCurrency": "IDR", "price": "400000" },
          { "@type": "Offer", "name": "Paket CCTV 4 Channel",          "description": "4 kamera 3MP 2K+, NVR + HDD 500GB",  "priceCurrency": "IDR", "price": "4580000" }
        ]
      }
    }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Build to confirm `index.html` is valid**

Run: `npm run build`
Expected: build succeeds, no parse errors. A new `dist/index.html` is created.

- [ ] **Step 3: Verify meta tags are in the built output**

Run:
```bash
grep -c 'application/ld+json' /home/surya/projects/cv-siroja/dist/index.html
grep -c 'og:image'         /home/surya/projects/cv-siroja/dist/index.html
grep -c 'rel="canonical"'  /home/surya/projects/cv-siroja/dist/index.html
```

Expected: each command prints `1` (the JSON-LD script tag, the og:image meta, and the canonical link are all present in the built HTML).

---

## Task 6: Create `src/components/Logo.jsx`

**Files:**
- Create: `src/components/Logo.jsx`

- [ ] **Step 1: Write the Logo component**

Write `src/components/Logo.jsx`:

```jsx
import { COMPANY } from '../data/constants'

const sizeMap = {
  sm: 'h-8 w-auto',   // 32 px tall — Navbar
  md: 'h-14 w-auto',  // 56 px tall — Footer
}

export default function Logo({ size = 'sm', eager = false, className = '' }) {
  return (
    <img
      src={COMPANY.logo}
      alt="Logo CV. Siroja Network"
      decoding="async"
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      className={`${sizeMap[size]} ${className}`.trim()}
    />
  )
}
```

> **React 19 note:** `fetchPriority` is the React 19 prop (camelCase). It maps to the `fetchpriority` HTML attribute in lowercase.

- [ ] **Step 2: Verify with lint**

Run: `npm run lint`
Expected: passes with no errors.

---

## Task 7: Create `src/components/Lightbox.jsx`

**Files:**
- Create: `src/components/Lightbox.jsx`

- [ ] **Step 1: Write the Lightbox component**

Write `src/components/Lightbox.jsx`:

```jsx
import { useEffect, useRef, useState } from 'react'

export default function Lightbox({ brochures, selectedIndex, onClose, onPrev, onNext }) {
  const closeBtnRef = useRef(null)
  const [imgFailed, setImgFailed] = useState(false)

  useEffect(() => {
    if (selectedIndex === null) return

    // Body scroll lock
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus the close button
    closeBtnRef.current?.focus()

    // Key handlers
    const onKey = (e) => {
      if (e.key === 'Escape')      onClose()
      else if (e.key === 'ArrowLeft')  onPrev()
      else if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [selectedIndex, onClose, onPrev, onNext])

  // Reset the failure flag whenever the index changes
  useEffect(() => { setImgFailed(false) }, [selectedIndex])

  if (selectedIndex === null) return null

  const brochure = brochures[selectedIndex]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Brosur: ${brochure.title}`}
      tabIndex={-1}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Close button */}
      <button
        ref={closeBtnRef}
        onClick={onClose}
        aria-label="Tutup brosur"
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white text-2xl leading-none flex items-center justify-center transition-colors"
      >
        ×
      </button>

      {/* Prev / Next */}
      <button
        onClick={onPrev}
        aria-label="Brosur sebelumnya"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white text-xl flex items-center justify-center transition-colors"
      >
        ‹
      </button>
      <button
        onClick={onNext}
        aria-label="Brosur berikutnya"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white text-xl flex items-center justify-center transition-colors"
      >
        ›
      </button>

      {/* Image or fallback */}
      {imgFailed ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 max-w-md text-center">
          <p className="text-white font-semibold text-lg mb-2">{brochure.title}</p>
          <p className="text-slate-400 text-sm">{brochure.desc}</p>
        </div>
      ) : (
        <img
          key={brochure.id}
          src={brochure.src}
          alt={brochure.title}
          loading="eager"
          onError={() => setImgFailed(true)}
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
        />
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify with lint**

Run: `npm run lint`
Expected: passes. If ESLint flags the `selectedIndex === null` early return, ignore the warning.

---

## Task 8: Create `src/components/BrosurGallery.jsx`

**Files:**
- Create: `src/components/BrosurGallery.jsx`

- [ ] **Step 1: Write the BrosurGallery component**

Write `src/components/BrosurGallery.jsx`:

```jsx
import { useState } from 'react'
import { COMPANY } from '../data/constants'
import Lightbox from './Lightbox'

export default function BrosurGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null)

  const open   = (i) => setSelectedIndex(i)
  const close  = () => setSelectedIndex(null)
  const prev   = () => setSelectedIndex((i) => (i - 1 + COMPANY.brochures.length) % COMPANY.brochures.length)
  const next   = () => setSelectedIndex((i) => (i + 1) % COMPANY.brochures.length)

  return (
    <section id="brosur" className="py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-purple-400 text-sm font-medium">Brosur &amp; Promosi</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Lihat <span className="gradient-text">Penawaran Lengkap</span> Kami
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Klik brosur untuk memperbesar dan melihat detail paket, harga, dan spesifikasi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COMPANY.brochures.map((b, i) => (
            <button
              key={b.id}
              onClick={() => open(i)}
              className="group text-left card-glow relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={b.src}
                  alt={b.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent p-5 pt-12">
                <p className="text-white font-semibold text-lg leading-tight mb-1">{b.title}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">{b.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-purple-300 text-sm font-medium group-hover:text-purple-200 transition-colors">
                  Lihat Brosur
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        brochures={COMPANY.brochures}
        selectedIndex={selectedIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </section>
  )
}
```

- [ ] **Step 2: Verify with lint**

Run: `npm run lint`
Expected: passes.

---

## Task 9: Update `src/App.jsx` to render `BrosurGallery`

**Files:**
- Modify: `src/App.jsx` (add 1 import + 1 JSX line)

- [ ] **Step 1: Add the import and JSX line**

Replace the contents of `src/App.jsx` with:

```jsx
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import WhyChooseUs     from './components/WhyChooseUs'
import InternetPackages from './components/InternetPackages'
import CCTVSection     from './components/CCTVSection'
import BrosurGallery   from './components/BrosurGallery'
import TargetAudience  from './components/TargetAudience'
import Footer          from './components/Footer'
import FloatingWA      from './components/FloatingWA'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyChooseUs />
        <InternetPackages />
        <CCTVSection />
        <BrosurGallery />
        <TargetAudience />
      </main>
      <Footer />
      <FloatingWA />
    </>
  )
}
```

- [ ] **Step 2: Verify with lint**

Run: `npm run lint`
Expected: passes.

---

## Task 10: Update `src/index.css` — focus rings + reduced motion

**Files:**
- Modify: `src/index.css` (append two blocks at the end of the file)

- [ ] **Step 1: Append the focus-ring global rule and reduced-motion block**

The file currently ends with the `.section-divider` rule. Append the following to the end of `src/index.css`:

```css
/* ─── Accessible focus rings (apply to all interactive elements) ─ */
a:focus-visible,
button:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px #020617,
    0 0 0 4px #8B5CF6;
  border-radius: 0.5rem;
}

/* ─── Respect users who prefer reduced motion ──────────────────── */
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-pulse-glow,
  .animate-fade-in-up,
  .animate-wa-ping {
    animation: none !important;
  }
  html {
    scroll-behavior: auto;
  }
}
```

> **Tailwind v4 caveat:** the existing `src/index.css` already declares `float`, `pulse-glow`, `fadeInUp`, `wa-ping` animations. The reduced-motion block disables them. The `shimmer` animation is also declared in the file but has no `.animate-shimmer` utility yet, so it's harmless to omit here.

- [ ] **Step 2: Verify with build (catches any CSS syntax error)**

Run: `npm run build`
Expected: build succeeds. Tailwind processes the CSS without errors.

- [ ] **Step 3: Verify the rules made it into the built CSS**

Run:
```bash
grep -c 'prefers-reduced-motion' /home/surya/projects/cv-siroja/dist/assets/index-*.css
grep -c 'focus-visible'           /home/surya/projects/cv-siroja/dist/assets/index-*.css
```

Expected: each command prints `1` (the `prefers-reduced-motion` block and at least one `focus-visible` rule appear in the built CSS bundle).

---

## Task 11: Update `src/components/Navbar.jsx`

**Files:**
- Modify: `src/components/Navbar.jsx` (4 surgical edits)

- [ ] **Step 1: Add the Logo import and extend `navLinks`**

In `src/components/Navbar.jsx`:

1. After the existing `import { COMPANY } from '../data/constants'` line (line 2), add:

```jsx
import Logo from './Logo'
```

2. Replace the `navLinks` array (lines 4-10) with:

```jsx
const navLinks = [
  { label: 'Beranda',       href: '#hero'     },
  { label: 'Keunggulan',    href: '#features' },
  { label: 'Paket Internet',href: '#internet' },
  { label: 'CCTV',          href: '#cctv'     },
  { label: 'Brosur',        href: '#brosur'   },
  { label: 'Kontak',        href: '#footer'   },
]
```

- [ ] **Step 2: Replace the monogram block with `<Logo size="sm" eager />`**

Find the block in the JSX (lines 33-41):

```jsx
{/* Logo */}
<a href="#hero" className="flex items-center gap-2.5 group">
  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/40">
    <span className="text-white font-black text-xs tracking-wide">SN</span>
  </div>
  <span className="text-white font-semibold text-base hidden sm:block">
    CV. Siroja <span className="text-purple-400">Network</span>
  </span>
</a>
```

Replace it with:

```jsx
{/* Logo */}
<a href="#hero" className="flex items-center gap-2.5 group">
  <Logo size="sm" eager />
  <span className="text-white font-semibold text-base hidden sm:block">
    CV. Siroja <span className="text-purple-400">Network</span>
  </span>
</a>
```

- [ ] **Step 3: Add `aria-expanded` to the mobile menu toggle button**

Find the mobile menu button (lines 66-77). Add `aria-expanded={mobileOpen}` as a new attribute on the `<button>` element. The button becomes:

```jsx
<button
  onClick={() => setMobileOpen(v => !v)}
  aria-expanded={mobileOpen}
  className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
  aria-label="Toggle menu"
>
```

(The existing `aria-label="Toggle menu"` is fine — change it to `"Buka menu"` / `"Tutup menu"` only if you want localized state; otherwise leave as is.)

- [ ] **Step 4: Verify with lint**

Run: `npm run lint`
Expected: passes.

---

## Task 12: Update `src/components/Footer.jsx`

**Files:**
- Modify: `src/components/Footer.jsx` (2 surgical edits)

- [ ] **Step 1: Add the Logo import and extend `quickLinks`**

In `src/components/Footer.jsx`:

1. After the existing `import { COMPANY } from '../data/constants'` line (line 1), add:

```jsx
import Logo from './Logo'
```

2. Replace the `quickLinks` array (lines 3-8) with:

```jsx
const quickLinks = [
  { label: 'Beranda',        href: '#hero'     },
  { label: 'Keunggulan',     href: '#features' },
  { label: 'Paket Internet', href: '#internet' },
  { label: 'CCTV',           href: '#cctv'     },
  { label: 'Brosur',         href: '#brosur'   },
]
```

- [ ] **Step 2: Replace the Footer brand monogram with `<Logo size="md" />`**

Find the block in the JSX (lines 25-33):

```jsx
<div className="flex items-center gap-2.5 mb-4">
  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/40">
    <span className="text-white font-black text-xs">SN</span>
  </div>
  <span className="text-white font-semibold text-lg">
    CV. Siroja <span className="text-purple-400">Network</span>
  </span>
</div>
```

Replace it with:

```jsx
<div className="flex items-center gap-2.5 mb-4">
  <Logo size="md" />
  <span className="text-white font-semibold text-lg">
    CV. Siroja <span className="text-purple-400">Network</span>
  </span>
</div>
```

- [ ] **Step 3: Verify with lint**

Run: `npm run lint`
Expected: passes.

---

## Task 13: Add `animate-pulse-glow` accent to `CCTVSection.jsx`

**Files:**
- Modify: `src/components/CCTVSection.jsx` (1 small edit)

- [ ] **Step 1: Add a pulsing dot inside the "Paket Unggulan" badge**

Find the badge (lines 67-69):

```jsx
<span className="inline-block bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-2">
  ✨ Paket Unggulan
</span>
```

Replace it with:

```jsx
<span className="inline-flex items-center gap-1.5 bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-2">
  <span className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-pulse-glow" />
  ✨ Paket Unggulan
</span>
```

- [ ] **Step 2: Verify with lint**

Run: `npm run lint`
Expected: passes.

---

## Task 14: Bump section spacing `py-24` → `py-28` across sections

**Files:**
- Modify (find-and-replace `py-24` → `py-28`): `src/components/Hero.jsx`, `src/components/WhyChooseUs.jsx`, `src/components/InternetPackages.jsx`, `src/components/CCTVSection.jsx`, `src/components/TargetAudience.jsx`
- Modify (already set to `py-28` in Task 8): `src/components/BrosurGallery.jsx` — no change needed

- [ ] **Step 1: Run a single search-replace across all the affected files**

Run:
```bash
cd /home/surya/projects/cv-siroja
for f in src/components/Hero.jsx src/components/WhyChooseUs.jsx src/components/InternetPackages.jsx src/components/CCTVSection.jsx src/components/TargetAudience.jsx; do
  sed -i 's/py-24/py-28/g' "$f"
done
```

- [ ] **Step 2: Verify the replacement worked**

Run:
```bash
grep -c 'py-24' /home/surya/projects/cv-siroja/src/components/*.jsx
```

Expected: prints `0` for every file (no `py-24` left in any component).

- [ ] **Step 3: Verify with lint**

Run: `npm run lint`
Expected: passes.

---

## Task 15: Final build + smoke verification

**Files:** none (read-only verification)

- [ ] **Step 1: Run lint and build back-to-back**

Run:
```bash
cd /home/surya/projects/cv-siroja
npm run lint
npm run build
```

Expected: both succeed with no errors.

- [ ] **Step 2: Verify all new public assets made it into `dist/`**

Run:
```bash
ls /home/surya/projects/cv-siroja/dist/brand/             && echo '---'
ls /home/surya/projects/cv-siroja/dist/brochures/         && echo '---'
test -f /home/surya/projects/cv-siroja/dist/robots.txt && echo 'robots.txt OK'
test -f /home/surya/projects/cv-siroja/dist/sitemap.xml && echo 'sitemap.xml OK'
test -f /home/surya/projects/cv-siroja/dist/favicon.svg && echo 'favicon.svg OK'
```

Expected: all checks pass, all assets present at the expected paths.

- [ ] **Step 3: Start the dev server for manual smoke test**

Run (in a separate terminal, or in the background):
```bash
cd /home/surya/projects/cv-siroja
npm run dev
```

Open the printed URL in a browser, then verify each item:

1. **Logo in Navbar and Footer** — the new logo image appears (not the "SN" monogram).
2. **Six nav links** including "Brosur" — clicking "Brosur" smooth-scrolls to the new section.
3. **Brosur section** — 3 brochure cards in a row (collapses to 2 then 1 on smaller widths). Each card has an image, title, desc, and "Lihat Brosur" CTA.
4. **Click a card** — lightbox opens full-screen. Image is centered, has rounded corners.
5. **Lightbox controls**:
   - ESC key closes.
   - Click outside the image (on the dark backdrop) closes.
   - ✕ button closes.
   - `←` / `→` keys cycle through brochures.
   - Prev/next arrow buttons (on the sides) cycle through brochures.
6. **Click outside the lightbox** — no console errors.
7. **FloatingWA** still works (always-visible green button, no regressions).
8. **Open the mobile view** (DevTools → toggle device toolbar) — hamburger menu works, nav links collapse into the dropdown, the "Brosur" link is present.
9. **Hover any link or button** — focus outline appears when tabbing through (or with a mouse, no outline; only on keyboard focus).
10. **DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`** — animations stop (no more pulsing dots, no more ping on the WA button).

- [ ] **Step 4: Verify SEO content in the built HTML**

Run:
```bash
grep -E 'canonical|og:image|twitter:card|application/ld\+json' /home/surya/projects/cv-siroja/dist/index.html
```

Expected: at least 4 lines returned — the canonical link, the og:image meta, the twitter:card meta, and the JSON-LD script tag. All URLs point to `https://cvsiroja.id/...`.

- [ ] **Step 5: Stop the dev server**

If you started the dev server in the foreground, press `Ctrl+C`. If background, kill it.

---

## Self-Review Notes

**Spec coverage:**
- §2 Asset pipeline → Task 1
- §3 Constants extension → Task 4
- §4 Logo component → Task 6
- §4 BrosurGallery → Task 8
- §4 Lightbox → Task 7
- §5 Navbar updates → Task 11
- §5 Footer updates → Task 12
- §5 CCTVSection pulse-glow dot → Task 13
- §5 Section spacing bump → Task 14
- §6 App composition → Task 9
- §7 index.html head replacement → Task 5
- §7 robots.txt → Task 2
- §7 sitemap.xml → Task 3
- §7 Focus rings + reduced motion CSS → Task 10
- §10 Verification → Task 15

All spec items are covered.

**Placeholder scan:** No "TBD", no "implement later", no vague steps. Every code step includes the full code. No "similar to Task N" shortcuts — each task repeats the relevant code in full.

**Type / name consistency:** The `COMPANY` object shape defined in Task 4 is referenced verbatim in Tasks 6, 8. The `Lightbox` props (`brochures`, `selectedIndex`, `onClose`, `onPrev`, `onNext`) defined in Task 7 are passed with matching names from `BrosurGallery` in Task 8. The `Logo` props (`size`, `eager`, `className`) in Task 6 are used consistently in Tasks 11 and 12. The `BrosurGallery` section id `brosur` (Task 8) is referenced by the Navbar link (`#brosur`, Task 11) and the Footer link (`#brosur`, Task 12) and the sitemap (Task 3). All names are consistent.
