import { useEffect, useState, useCallback } from 'react'
import { Phone, X } from 'lucide-react'

export default function BookingPanel() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-booking', handler)
    return () => window.removeEventListener('open-booking', handler)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      // Fix iOS Safari bug where opening fixed modal while scrolled down causes black screen
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])



  const close = useCallback(() => {
    setOpen(false)
    window.dispatchEvent(new CustomEvent('close-booking'))
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <div
        className={`fixed inset-0 z-50 h-[100dvh] w-full bg-[#111111] transition-all duration-300 ease-out overflow-y-auto ${
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* X button - absolutely positioned above everything */}
        <button
          onClick={close}
          className="absolute top-5 right-5 z-[9999] rounded-full text-white bg-white/10 hover:bg-white/20 p-2 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="relative min-h-[100dvh] flex flex-col max-w-4xl mx-auto pt-0">
          {/* Header */}
          <div className="px-6 pt-14 pb-4 bg-[#111111] flex-shrink-0">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.png"
                alt="Orlando Blackline"
                className="h-8 w-auto brightness-0 invert"
              />
              <span className="font-display text-white text-lg tracking-wide">Orlando Blackline</span>
            </div>
            <div className="border-b border-[#D4AF37]/40 mb-4" />
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-[#D4AF37]" />
              <a
                href="tel:+14075161645"
                className="text-[#D4AF37] font-display text-lg tracking-wider hover:text-white transition-colors"
              >
                407-516-1645
              </a>
            </div>
          </div>

          {/* Iframe */}
          <div className="flex-1 relative w-full overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
            <iframe
              id="hero-booking-form-1782848404810"
              className="w-full h-full min-h-[1800px] border-0"
              src="https://manage.worldlimobiz.com/orlando-blackline-transportation/reservation/hero"
              style={{ backgroundColor: 'transparent' }}
              title="Hero Booking Form"
              allow="payment"
              data-theme-primary="#D4AF37"
              data-theme-secondary="#050505"
              data-theme-accent="#ffffff"
            />
          </div>
        </div>
      </div>
    </>
  )
}
