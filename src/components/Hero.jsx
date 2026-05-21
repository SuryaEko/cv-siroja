import { COMPANY } from '../data/constants'

const WAIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const trustItems = [
  { icon: '⚡', label: 'Internet Cepat & Stabil' },
  { icon: '🛡️', label: 'Support Terbaik'         },
  { icon: '💎', label: 'Harga Terjangkau'        },
  { icon: '🌐', label: 'Jaringan Andal'          },
]

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-slate-950 overflow-hidden">

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid" />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4  w-80  h-80  bg-indigo-600/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none" style={{ animationDelay: '1.2s' }} />
      <div className="absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-36 w-full">
        <div className="max-w-4xl mx-auto text-center">

          {/* Promo badge */}
          <div
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up"
          >
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-sm font-medium">
              🎉 PROMO SUPER: Gratis Biaya Instalasi Senilai Rp 500.000!
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            INTERNET <span className="gradient-text">STABIL,</span>
            <br />
            BISNIS <span className="gradient-text">MAJU!</span>
          </h1>

          {/* Sub-headline */}
          <p
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Solusi Internet Cepat, Stabil &amp; Aman untuk Toko, Ruko,
            Rumah &amp; Usaha Anda.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <a
              href="#internet"
              className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-xl shadow-purple-900/40 hover:shadow-purple-500/25 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Lihat Paket Internet
            </a>

            <a
              href={COMPANY.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              <WAIcon className="w-5 h-5 text-green-400" />
              Hubungi Kami via WhatsApp
            </a>
          </div>

          {/* Trust indicators */}
          <div
            className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 animate-fade-in-up"
            style={{ animationDelay: '0.45s' }}
          >
            {trustItems.map(item => (
              <div key={item.label} className="flex items-center gap-2 text-slate-500 text-sm">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  )
}
