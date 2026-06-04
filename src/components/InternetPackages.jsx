import { useState } from 'react'
import { COMPANY } from '../data/constants'
import { formatIDR } from '../utils/format'

const retailPackages = [
  { name: 'Super HEMAT', speed: '10 Mbps', price: 125000, popular: false },
  { name: 'Standar',     speed: '15 Mbps', price: 150000, popular: false },
  { name: 'Premium',     speed: '30 Mbps', price: 200000, popular: true  },
  { name: 'Ultra',       speed: '50 Mbps', price: 250000, popular: false },
]

const sharedFeatures = ['Koneksi Cepat & Stabil', 'Jaringan Aman', 'Dukungan 24/7', 'Gratis Biaya Instalasi']

const bisnisFeatures = [
  'Optimal untuk CCTV IP Cam',
  'Stream lancar & rekaman aman',
  'Real-time monitoring',
  'Cocok untuk Toko, Ruko, Minimarket',
  'Salon, Kafe, Kantor & lebih',
  'Dedicated bandwidth (tidak berbagi)',
  'Dukungan teknis prioritas',
]

export default function InternetPackages() {
  const [tab, setTab] = useState('retail')

  return (
    <section id="internet" className="py-28 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-purple-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-purple-400 text-sm font-medium">Layanan Internet</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pilih Paket <span className="gradient-text">Internet Anda</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-base">
            Paket terjangkau untuk semua kebutuhan — dari rumahan hingga bisnis skala besar.
          </p>

          {/* Tab toggle */}
          <div className="inline-flex bg-slate-800/80 rounded-xl p-1 gap-1 border border-slate-700/50">
            {[
              { id: 'retail', label: '🏠 Rumahan / Retail' },
              { id: 'bisnis', label: '🏢 Bisnis Dedicated' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tab === t.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Retail packages ──────────────────────────────── */}
        {tab === 'retail' && (
          <>
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-medium px-5 py-2 rounded-full">
                🎁 Promo: Gratis Biaya Instalasi untuk Semua Paket Retail!
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {retailPackages.map(pkg => (
                <div
                  key={pkg.name}
                  className={`card-glow relative flex flex-col rounded-2xl p-6 border transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-purple-600/10 border-purple-500/50 shadow-xl shadow-purple-900/20'
                      : 'bg-slate-900/70 border-slate-800'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        ⭐ Terpopuler
                      </span>
                    </div>
                  )}

                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Paket</p>
                  <h3 className={`font-bold text-xl mb-4 ${pkg.popular ? 'text-purple-300' : 'text-white'}`}>
                    {pkg.name}
                  </h3>

                  <div className="mb-1">
                    <span className={`text-4xl font-black ${pkg.popular ? 'gradient-text' : 'text-white'}`}>
                      {pkg.speed}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mb-5">Kecepatan maksimal</p>

                  <div className="mb-6">
                    <span className={`text-2xl font-bold ${pkg.popular ? 'text-purple-300' : 'text-white'}`}>
                      {formatIDR(pkg.price)}
                    </span>
                    <span className="text-slate-500 text-sm"> / Bulan</span>
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {sharedFeatures.map(f => (
                      <li key={f} className="text-slate-400 text-sm flex items-center gap-2">
                        <span className="text-purple-400 font-bold">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={COMPANY.waRetail(pkg.speed)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      pkg.popular
                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30'
                        : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white'
                    }`}
                  >
                    Pilih Paket
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Bisnis package ────────────────────────────────── */}
        {tab === 'bisnis' && (
          <div className="max-w-2xl mx-auto">
            <div className="card-glow relative bg-gradient-to-br from-purple-900/25 via-slate-900/80 to-indigo-900/20 border border-purple-500/40 rounded-3xl p-8 shadow-2xl shadow-purple-900/20">
              <div className="absolute top-5 right-5">
                <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  🏆 Dedicated
                </span>
              </div>

              <p className="text-purple-400 text-sm font-semibold uppercase tracking-wider mb-1">Paket Unggulan</p>
              <h3 className="text-2xl font-bold text-white mb-6">Paket Bisnis Utama</h3>

              <div className="flex items-end gap-3 mb-2">
                <span className="text-5xl font-black gradient-text">50 Mbps</span>
                <span className="text-slate-400 mb-1 text-sm">Dedicated Bandwidth</span>
              </div>

              <div className="mb-8">
                <span className="text-3xl font-bold text-white">{formatIDR(400000)}</span>
                <span className="text-slate-500 ml-1 text-sm">/ Bulan</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {bisnisFeatures.map(f => (
                  <div key={f} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-purple-400 font-bold flex-shrink-0 mt-0.5">✓</span>
                    {f}
                  </div>
                ))}
              </div>

              <a
                href={COMPANY.waBisnis()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-xl shadow-purple-900/40"
              >
                Hubungi Kami untuk Paket Bisnis
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
