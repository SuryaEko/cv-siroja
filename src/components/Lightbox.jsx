import { useEffect, useRef, useState } from 'react'

function LightboxImage({ brochure }) {
  const [imgFailed, setImgFailed] = useState(false)

  if (imgFailed) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 max-w-md text-center">
        <p className="text-white font-semibold text-lg mb-2">{brochure.title}</p>
        <p className="text-slate-400 text-sm">{brochure.desc}</p>
      </div>
    )
  }

  return (
    <img
      src={brochure.src}
      alt={brochure.title}
      width={1024}
      height={1536}
      loading="eager"
      onError={() => setImgFailed(true)}
      className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
    />
  )
}

export default function Lightbox({ brochures, selectedIndex, onClose, onPrev, onNext }) {
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (selectedIndex === null) return

    // Body scroll lock
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus the close button
    closeBtnRef.current?.focus()

    // Key handlers
    const onKey = (e) => {
      if (e.key === 'Escape')      onClose()
      else if (e.key === 'ArrowLeft')  onPrev()
      else if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [selectedIndex, onClose, onPrev, onNext])

  if (selectedIndex === null) return null

  const brochure = brochures[selectedIndex]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Brosur: ${brochure.title}`}
      tabIndex={-1}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Close button */}
      <button
        ref={closeBtnRef}
        onClick={onClose}
        aria-label="Tutup brosur"
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white text-2xl leading-none flex items-center justify-center transition-colors"
      >
        ×
      </button>

      {/* Prev / Next */}
      <button
        onClick={onPrev}
        aria-label="Brosur sebelumnya"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white text-xl flex items-center justify-center transition-colors"
      >
        ‹
      </button>
      <button
        onClick={onNext}
        aria-label="Brosur berikutnya"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white text-xl flex items-center justify-center transition-colors"
      >
        ›

      </button>

      {/* Image or fallback — keyed by brochure.id so internal state resets on navigation */}
      <LightboxImage key={brochure.id} brochure={brochure} />
    </div>
  )
}
