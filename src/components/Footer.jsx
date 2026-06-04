import { COMPANY } from '../data/constants'
import Logo from './Logo'
import WAIcon from './WAIcon'

const quickLinks = [
  { label: 'Beranda',        href: '#hero'     },
  { label: 'Keunggulan',     href: '#features' },
  { label: 'Paket Internet', href: '#internet' },
  { label: 'CCTV',           href: '#cctv'     },
  { label: 'Brosur',         href: '#brosur'   },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="footer" className="bg-slate-950 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Logo size="md" />
              <span className="text-white font-semibold text-lg">
                CV. Siroja <span className="text-purple-400">Network</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              Solusi internet cepat, stabil &amp; terpercaya untuk rumah dan bisnis Anda.
              Ditambah layanan instalasi CCTV profesional bergaransi.
            </p>
            <a
              href={COMPANY.waLink()}
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
              href={COMPANY.waLink()}
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
