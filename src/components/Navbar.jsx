import { useState, useEffect } from 'react'
import { COMPANY } from '../data/constants'

const navLinks = [
  { label: 'Beranda',       href: '#hero'     },
  { label: 'Keunggulan',    href: '#features' },
  { label: 'Paket Internet',href: '#internet' },
  { label: 'CCTV',          href: '#cctv'     },
  { label: 'Kontak',        href: '#footer'   },
]

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/60 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/40">
              <span className="text-white font-black text-xs tracking-wide">SN</span>
            </div>
            <span className="text-white font-semibold text-base hidden sm:block">
              CV. Siroja <span className="text-purple-400">Network</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={COMPANY.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-purple-900/30"
            >
              Hubungi Kami
            </a>
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-slate-800/50 bg-slate-950/95 backdrop-blur-md">
            <nav className="flex flex-col gap-1">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-slate-300 hover:text-white text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-slate-800/60 transition-all"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={COMPANY.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-4 py-3 rounded-xl text-center transition-all"
              >
                Hubungi Kami via WhatsApp
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
