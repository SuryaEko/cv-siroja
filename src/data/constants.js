// Keep in sync with index.html JSON-LD and the og:image / og:url meta tags.
const WA_NUMBER = '6281337239974'

const buildWaLink = (text) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`

const DEFAULT_WA_TEXT = 'Halo CV. Siroja Network, saya tertarik dengan layanan Anda.'

export const COMPANY = {
  name: 'CV. Siroja Network',
  phone: '081337239974',
  phoneFormatted: '+62 813-3723-9974',
  waLink: (text = DEFAULT_WA_TEXT) => buildWaLink(text),
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

  // Context-specific WhatsApp pre-filled messages.
  // Use these instead of `waLink()` when a CTA is tied to a specific offer.
  waRetail:   (speed) => buildWaLink(`Halo CV. Siroja Network, saya tertarik dengan paket internet ${speed}. Mohon info lebih lanjut.`),
  waBisnis:   ()      => buildWaLink('Halo CV. Siroja Network, saya tertarik dengan Paket Bisnis Dedicated 50 Mbps. Mohon info lebih lanjut.'),
  waCctvMain: ()      => buildWaLink('Halo CV. Siroja Network, saya tertarik dengan Paket CCTV 4 Channel · 4 Camera 3MP 2K+. Mohon info lebih lanjut.'),
  waCctvTier: (name)  => buildWaLink(`Halo CV. Siroja Network, saya ingin info lebih lanjut tentang ${name}.`),
}
