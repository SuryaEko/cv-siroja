import { COMPANY } from '../data/constants'
import WAIcon from './WAIcon'

export default function FloatingWA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">

      {/* Tooltip */}
      <div className="opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 bg-slate-800 border border-slate-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl pointer-events-none">
        Fast Response via WhatsApp
      </div>

      {/* Button */}
      <a
        href={COMPANY.waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat via WhatsApp"
        className="relative w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-xl shadow-green-900/50 transition-all duration-200 hover:scale-110"
      >
        {/* Ripple ring */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-wa-ping opacity-60 pointer-events-none" />

        {/* WA icon */}
        <WAIcon className="w-7 h-7 text-white relative z-10" />
      </a>
    </div>
  )
}
