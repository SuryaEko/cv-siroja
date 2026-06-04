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
                  width={300}
                  height={400}
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
