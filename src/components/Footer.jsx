import { COMPANY } from '../data/constants'

const quickLinks = [
  { label: 'Beranda',        href: '#hero'     },
  { label: 'Keunggulan',     href: '#features' },
  { label: 'Paket Internet', href: '#internet' },
  { label: 'CCTV',           href: '#cctv'     },
]

const WAIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="footer" className="bg-slate-950 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/40">
                <span className="text-white font-black text-xs">SN</span>
              </div>
              <span className="text-white font-semibold text-lg">
                CV. Siroja <span className="text-purple-400">Network</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              Solusi internet cepat, stabil &amp; terpercaya untuk rumah dan bisnis Anda.
              Ditambah layanan instalasi CCTV profesional bergaransi.
            </p>
            <a
              href={COMPANY.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
            >
              <WAIcon className="w-4 h-4" />
              {COMPANY.phoneFormatted}
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-500 hover:text-purple-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact card */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Hubungi Kami</h4>
            <a
              href={COMPANY.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-slate-900/60 border border-slate-800 hover:border-green-500/30 rounded-2xl p-4 transition-all duration-300 hover:bg-slate-900/80"
            >
              <div className="w-11 h-11 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-all">
                <WAIcon className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">WhatsApp</p>
                <p className="text-slate-500 text-xs">{COMPANY.phoneFormatted}</p>
              </div>
            </a>
          </div>
        </div>

        <div className="section-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-600 text-sm">
          <p>© {year} {COMPANY.name}. Semua hak dilindungi.</p>
          <p>Dibuat dengan ❤️ untuk kemajuan bisnis Anda.</p>
        </div>
      </div>
    </footer>
  )
}
