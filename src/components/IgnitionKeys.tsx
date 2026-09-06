import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { KeyRound, type LucideIcon } from 'lucide-react'

export interface ServiceData {
  id: string
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
  features: string[]
  image: string
  price: string
}

interface IgnitionKeysProps {
  services: ServiceData[]
  onIgnite: (service: ServiceData) => void
}

export default function IgnitionKeys({ services, onIgnite }: IgnitionKeysProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const keyRefs = useRef<(HTMLDivElement | null)[]>([])
  const [ignitingKey, setIgnitingKey] = useState<string | null>(null)

  // Idle animation (sway)
  useEffect(() => {
    keyRefs.current.forEach((ref) => {
      if (!ref) return
      
      // Randomize the sway a bit so they don't all swing identically
      const delay = Math.random() * -2
      const duration = 2.5 + Math.random() * 1
      
      gsap.to(ref, {
        rotationZ: () => Math.random() * 4 - 2, // -2 to 2 degrees
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay
      })
    })

    return () => {
      keyRefs.current.forEach((ref) => {
        if (ref) gsap.killTweensOf(ref)
      })
    }
  }, [])

  const handleKeyClick = (service: ServiceData, index: number) => {
    if (ignitingKey) return // Block clicks during ignition
    
    const keyEl = keyRefs.current[index]
    if (!keyEl) return

    // Ignition!
    setIgnitingKey(service.id)
    
    // Get exact screen center
    const rect = keyEl.getBoundingClientRect()
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    
    const xOffset = centerX - (rect.left + rect.width / 2)
    const yOffset = centerY - (rect.top + rect.height / 2)

    const tl = gsap.timeline({
      onComplete: () => {
        onIgnite(service)
        // Reset after ignition transition
        setTimeout(() => {
          setIgnitingKey(null)
          gsap.set(keyEl, { clearProps: 'all' })
        }, 1000)
      }
    })

    // Fly to center and rotate like a key in an ignition
    tl.to(keyEl, {
      x: xOffset,
      y: yOffset,
      scale: 1.5,
      rotationZ: 90,
      rotationY: 180, // Keep it flipped
      duration: 0.8,
      ease: 'power3.inOut',
      zIndex: 50
    })
    .to('#ignition-flash', {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.in'
    }, '-=0.2')
  }

  const handleMouseEnter = (index: number) => {
    if (ignitingKey) return
    const el = keyRefs.current[index]
    if (el) {
      gsap.to(el, { 
        y: -15, 
        scale: 1.05, 
        rotationY: 180, 
        duration: 0.6, 
        ease: 'back.out(1.5)', 
        overwrite: 'auto' 
      })
    }
  }

  const handleMouseLeave = (index: number) => {
    if (ignitingKey) return
    const el = keyRefs.current[index]
    if (el) {
      gsap.to(el, { 
        y: 0, 
        scale: 1, 
        rotationY: 0, 
        duration: 0.6, 
        ease: 'power2.out', 
        overwrite: 'auto',
        onComplete: () => {
          if (ignitingKey) return;
          // Restore idle sway
          gsap.to(el, {
            rotationZ: () => Math.random() * 4 - 2,
            duration: 2.5 + Math.random() * 1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          })
        }
      })
    }
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full min-h-[80vh] flex flex-col items-center justify-center py-20 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #111 0%, #050505 100%)',
        backgroundImage: 'radial-gradient(circle at center, rgba(30,30,30,0.8) 0%, rgba(5,5,5,1) 100%), url("/images/metal-texture.png")', // Fallback if no texture
      }}
    >
      <div 
        id="ignition-flash" 
        className="fixed inset-0 bg-white z-[100] pointer-events-none opacity-0"
      />

      <div className="text-center mb-16 z-10 relative">
        <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Select Your Experience</h2>
        <p className="font-body text-[#A0A0A0] text-lg max-w-xl mx-auto">
          Hover a key to view details. Click to select and begin your journey.
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-8 md:gap-12 max-w-[1400px] px-6" style={{ perspective: '1500px' }}>
        {services.map((service, index) => {
          return (
            <div 
              key={service.id}
              className="relative flex flex-col items-center"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* The Peg */}
              <div className="w-4 h-4 rounded-full bg-[#333] border border-[#111] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.8)] absolute -top-2 z-0" />
              
              {/* The Key */}
              <div
                ref={el => { keyRefs.current[index] = el }}
                onClick={() => handleKeyClick(service, index)}
                className="relative w-64 h-64 cursor-pointer origin-top"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front Face */}
                <div 
                  className="absolute inset-0 rounded-md border border-[#333] shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', transform: 'translateZ(1px)' }}
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-black/60" />

                  {/* Hook Hole Container - to make it look like a physical hole */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border border-white/20 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] bg-[#050505] flex items-center justify-center z-10" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-4 z-10">
                    <h3 className="font-display text-white text-2xl text-center leading-tight mb-1 drop-shadow-lg">
                      {service.title.startsWith('Port Canaveral') ? 'Port Canaveral' : service.title.split(' ')[0]}
                    </h3>
                    <p className="font-mono text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase drop-shadow-md font-bold">
                      {service.title.startsWith('Port Canaveral') ? service.title.replace('Port Canaveral', '').trim() : service.title.split(' ').slice(1).join(' ')}
                    </p>
                  </div>
                </div>

                {/* Back Face */}
                <div 
                  className="absolute inset-0 bg-[#0a0a0a] rounded-md border border-[#D4AF37]/50 flex flex-col items-center pt-8 pb-6 px-5 shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(1px)' }}
                >
                  {/* Hook Hole */}
                  <div className="w-6 h-6 rounded-full border border-[#333] shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] bg-[#050505] absolute top-4" />
                  
                  <div className="flex-1 flex flex-col items-center justify-center w-full mt-4">
                    <h4 className="font-display text-[#D4AF37] text-lg text-center mb-2 border-b border-[#D4AF37]/20 pb-2 w-full">
                      {service.title}
                    </h4>
                    <p className="font-body text-[#A0A0A0] text-xs text-center leading-relaxed">
                      {service.subtitle}
                    </p>
                  </div>
                  
                  <div className="w-full mt-auto">
                    <div className="w-full flex items-center justify-center gap-2 py-3 bg-[#D4AF37] text-[#050505] rounded border border-[#D4AF37] hover:bg-white hover:border-white transition-colors cursor-pointer">
                      <KeyRound size={16} />
                      <span className="font-mono text-[11px] font-bold tracking-widest uppercase">
                        Select
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
