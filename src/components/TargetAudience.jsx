const audiences = [
  { icon: '🏪', label: 'Toko & Minimarket' },
  { icon: '🏢', label: 'Ruko & Kantor'     },
  { icon: '☕', label: 'Kafe & Restoran'   },
  { icon: '💈', label: 'Salon & Klinik'    },
  { icon: '🏠', label: 'Rumah Tinggal'     },
  { icon: '🏭', label: 'Semua Jenis Usaha' },
]

export default function TargetAudience() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-purple-700/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-purple-400 text-sm font-medium">Ideal Untuk</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Cocok untuk <span className="gradient-text">Semua</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-base">
            Layanan kami dirancang untuk memenuhi kebutuhan berbagai jenis usaha dan tempat tinggal.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {audiences.map(a => (
            <div
              key={a.label}
              className="card-glow group flex flex-col items-center gap-3 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 text-center hover:bg-slate-800/60 transition-all duration-300"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300 select-none">
                {a.icon}
              </span>
              <span className="text-slate-300 text-sm font-medium leading-tight">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
