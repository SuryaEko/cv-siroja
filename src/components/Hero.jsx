import { COMPANY } from '../data/constants'
import WAIcon from './WAIcon'

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 pt-36 w-full">
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
              href={COMPANY.waLink()}
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
