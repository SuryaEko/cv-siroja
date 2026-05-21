import { COMPANY } from '../data/constants'

const WAIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const mainSpecs = [
  { icon: '📺', text: 'Resolusi 2K (2304×1296) – Gambar lebih tajam dan detail'            },
  { icon: '🔄', text: 'Pan & Tilt 360° – Pantau seluruh ruangan tanpa blind spot'          },
  { icon: '🌙', text: 'Night Vision hingga 10 meter (kondisi minim cahaya)'                },
  { icon: '🔔', text: 'Deteksi Gerak Cerdas + Notifikasi real-time ke smartphone'          },
  { icon: '🎙️', text: 'Two-Way Talk – Komunikasi dua arah melalui aplikasi EZVIZ'         },
  { icon: '🔒', text: 'Privacy Mode – Melindungi privasi dengan sekali sentuh'             },
  { icon: '💾', text: 'MicroSD hingga 256GB (opsional) & Kompatibel EZVIZ CloudPlay'       },
]

const mainAdvantages = [
  'Sistem 4 channel yang stabil & andal',
  'NVR EZVIZ – Mudah dioperasikan & kompatibel penuh',
  'HDD 500GB – Penyimpanan rekaman hingga ±10-15 hari',
  'Instalasi rapi, bergaransi, dan bisa diakses jarak jauh kapan saja',
]

const otherTiers = [
  {
    name: 'CCTV Basic',
    price: 'Rp 400.000',
    features: ['2 Kamera HD', 'DVR + Storage', 'Instalasi Standar', 'Monitoring Smartphone', 'Garansi Servis'],
  },
  {
    name: 'CCTV Premium',
    price: 'Rp 600.000',
    features: ['8 Kamera Full HD / 4K', 'DVR/NVR + HDD Besar', 'Instalasi Profesional', 'Remote Access', 'Smart Notifikasi & Garansi'],
  },
]

export default function CCTVSection() {
  return (
    <section id="cctv" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="absolute top-1/3 right-0   w-96 h-96 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0  w-96 h-96 bg-indigo-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-purple-400 text-sm font-medium">Jasa Instalasi CCTV</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pantau Usaha Anda <span className="gradient-text">24/7</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Paket CCTV profesional dengan teknologi terkini. Instalasi rapi, andal,
            dan bisa dimonitor dari mana saja kapan saja.
          </p>
        </div>

        {/* ── Main package card ─────────────────────────────── */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden mb-10 shadow-2xl">
          {/* Card header bar */}
          <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/10 border-b border-slate-800 px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="inline-block bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-2">
                ✨ Paket Unggulan
              </span>
              <h3 className="text-white font-bold text-xl leading-tight">
                Paket CCTV 4 Channel · 4 Camera 3MP 2K+
              </h3>
              <p className="text-slate-400 text-sm mt-0.5">EZVIZ C6N Pro 2K + NVR + HDD 500GB</p>
            </div>
            <div className="flex-shrink-0 sm:text-right">
              <p className="text-slate-500 text-xs mb-0.5">Harga Paket</p>
              <p className="text-3xl font-black gradient-text">Rp 4.580.000</p>
            </div>
          </div>

          {/* Card body */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Specs */}
            <div>
              <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-purple-500 rounded-full" />
                Spesifikasi Produk
              </h4>
              <ul className="space-y-3">
                {mainSpecs.map(s => (
                  <li key={s.text} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="text-lg flex-shrink-0 mt-0.5">{s.icon}</span>
                    <span>{s.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advantages + CTA */}
            <div className="flex flex-col">
              <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-purple-500 rounded-full" />
                Keunggulan Paket
              </h4>
              <ul className="space-y-3 mb-8 flex-1">
                {mainAdvantages.map(a => (
                  <li key={a} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="text-purple-400 font-bold flex-shrink-0 mt-0.5">✓</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
              <a
                href={COMPANY.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-xl shadow-purple-900/40 hover:-translate-y-0.5"
              >
                <WAIcon className="w-5 h-5 text-green-300" />
                Pesan via WhatsApp Sekarang
              </a>
            </div>
          </div>
        </div>

        {/* ── Other tiers ───────────────────────────────────── */}
        <h3 className="text-white font-semibold text-lg text-center mb-6 text-slate-400">
          Atau Pilih Paket Lainnya
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {otherTiers.map(tier => (
            <div key={tier.name} className="card-glow bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-white font-bold text-lg mb-1">{tier.name}</h4>
              <p className="text-purple-400 font-bold text-xl mb-4">{tier.price}</p>
              <ul className="space-y-2 mb-5">
                {tier.features.map(f => (
                  <li key={f} className="text-slate-400 text-sm flex items-center gap-2">
                    <span className="text-purple-400">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={COMPANY.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-medium py-2.5 rounded-xl transition-all duration-200"
              >
                Info Lebih Lanjut
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
