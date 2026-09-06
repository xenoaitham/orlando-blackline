import { useState, useEffect } from 'react'
import { MessageSquare, PhoneCall, X } from 'lucide-react'

// Authentic WhatsApp SVG
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
)

export default function ContactDock() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleOpen = () => setIsVisible(false)
    const handleClose = () => setIsVisible(true)
    window.addEventListener('open-booking', handleOpen)
    window.addEventListener('close-booking', handleClose)
    return () => {
      window.removeEventListener('open-booking', handleOpen)
      window.removeEventListener('close-booking', handleClose)
    }
  }, [])

  const phoneNumber = '+14075161645'
  
  const handlePhone = () => window.open(`tel:${phoneNumber}`, '_self')
  const handleSMS = () => window.open(`sms:${phoneNumber}`, '_self')
  const handleWhatsApp = () => window.open(`https://wa.me/${phoneNumber}`, '_blank')

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Expanded Actions */}
      <div className={`flex flex-col gap-3 transition-all duration-500 origin-bottom ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'}`}>
        
        {/* SMS */}
        <button onClick={handleSMS} className="group flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all duration-300 shadow-xl">
            <MessageSquare size={18} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/70 bg-[#050505]/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Text Us
          </span>
        </button>

        {/* WhatsApp */}
        <button onClick={handleWhatsApp} className="group flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-white/70 hover:text-[#25D366] hover:border-[#25D366]/50 hover:bg-[#25D366]/10 transition-all duration-300 shadow-xl">
            <WhatsAppIcon size={20} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/70 bg-[#050505]/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            WhatsApp
          </span>
        </button>

        {/* Call */}
        <button onClick={handlePhone} className="group flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all duration-300 shadow-xl">
            <PhoneCall size={18} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/70 bg-[#050505]/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Call Us
          </span>
        </button>
      </div>

      {/* Main Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#050505] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform duration-300 z-10"
      >
        <div className={`relative flex items-center justify-center w-full h-full transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <span className={`absolute transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
            <MessageSquare size={24} fill="currentColor" />
          </span>
          <span className={`absolute transition-all duration-300 ${isOpen ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-45'}`}>
            <X size={24} strokeWidth={2.5} />
          </span>
        </div>
      </button>
    </div>
  )
}
