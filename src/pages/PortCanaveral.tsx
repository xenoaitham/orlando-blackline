import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone } from 'lucide-react'
import { useSiteSettings } from '../lib/wp-context'

gsap.registerPlugin(ScrollTrigger)

const cruiseLogos = [
  {
    name: "Disney Cruise Line",
    src: "https://upload.wikimedia.org/wikipedia/en/6/6f/Disney_Cruise_Line_logo.svg",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 max-w-none"
  },
  {
    name: "Royal Caribbean",
    src: "https://upload.wikimedia.org/wikipedia/commons/1/15/Royal_Caribbean_logo_%282024%29.svg",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 max-w-none"
  },
  {
    name: "Carnival Cruise Line",
    src: "/images/carnival-logo.svg",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 max-w-none"
  },
  {
    name: "Norwegian Cruise Line",
    src: "/images/ncl-logo.svg",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 max-w-none"
  },
  {
    name: "MSC Cruises",
    src: "/images/msc-logo.png",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 max-w-none"
  },
  {
    name: "Princess Cruises",
    src: "/images/princess-logo.svg",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 max-w-none"
  }
]

const tips = [
  'Book your pickup with enough time to handle terminal security. We know the best drop-off times for each terminal.',
  'Terminals at Port Canaveral can be busy; our drivers communicate directly with you to find the perfect meeting spot.',
  'We track your inbound flight to MCO or Sanford. If your plane is delayed, we adjust automatically so you don\'t miss the boat.',
  'Traveling with a large group? Our Sprinter and Transit vans have plenty of room for all your cruise luggage.',
  'Car seats are free with us. Let us know the ages and weights of your kids when booking.',
]

export default function PortCanaveral() {
  const { settings } = useSiteSettings()
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const tipsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return
    gsap.fromTo(
      heroRef.current.querySelectorAll('.reveal'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.3 }
    )
  }, [])

  useEffect(() => {
    if (!contentRef.current) return
    const trigger = ScrollTrigger.create({
      trigger: contentRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          contentRef.current!.querySelectorAll('.fade-up'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08 }
        )
      },
    })
    return () => trigger.kill()
  }, [])

  useEffect(() => {
    if (!tipsRef.current) return
    const trigger = ScrollTrigger.create({
      trigger: tipsRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          tipsRef.current!.querySelectorAll('.tip-card'),
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 }
        )
      },
    })
    return () => trigger.kill()
  }, [])

  const openBooking = () => window.dispatchEvent(new CustomEvent('open-booking'))

  return (
    <main className="pt-40 lg:pt-48">
      {/* Hero — asymmetric, image-right */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 lg:static lg:w-1/2 lg:ml-auto lg:h-[70vh] overflow-hidden">
          <img
            src="/images/port-canaveral-hero.jpg"
            alt="Port Canaveral Cruise Ships"
            className="w-full h-full object-cover opacity-30 lg:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#050505]/60 to-[#050505]" />
        </div>
        <div className="absolute inset-0 lg:inset-auto flex flex-col justify-center lg:block z-10 max-w-[1400px] mx-auto px-6 lg:px-16 w-full">
          <div className="max-w-xl">
            <p className="reveal font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
              Port Canaveral Transportation
            </p>
            <h1 className="reveal font-display text-5xl md:text-7xl text-white mb-6 leading-[1.1]">
              Start Your Cruise<br />in Absolute<br />Luxury
            </h1>
            <p className="reveal font-body text-[#A0A0A0] text-lg leading-relaxed mb-8 max-w-lg">
              Orlando Blackline Transportation, your trusted choice for luxury black car service and private transportation between anywhere in Florida and Port Canaveral. Whether you’re departing for a cruise or returning from your vacation, our professional chauffeurs provide a comfortable, reliable, safe and stress-free travel experience from start to finish.
            </p>
            <div className="reveal flex items-center gap-4">
              <button
                onClick={openBooking}
                className="bg-white text-[#050505] px-8 py-3.5 font-body text-sm uppercase tracking-[0.1em] font-semibold hover:bg-[#D4AF37] transition-colors duration-300"
              >
                Book Cruise Transfer
              </button>
              <a
                href={`tel:${settings.phoneLink || '+14075161645'}`}
                className="inline-flex items-center gap-2 font-mono text-[#D4AF37] text-sm tracking-wider hover:text-black hover:bg-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 rounded-md transition-colors"
              >
                <Phone size={18} />
                {settings.phoneNumber || '(407) 516-1645'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations - Dynamic Marquee */}
      <section ref={contentRef} className="py-20 lg:py-28 bg-[#050505] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 mb-12">
          <div className="text-center">
            <p className="fade-up font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
              Where We Go
            </p>
            <h2 className="fade-up font-display text-4xl md:text-5xl text-white">
              Servicing All Major Cruise Lines
            </h2>
          </div>
        </div>
        
        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden group">
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          
          {/* Animated Track */}
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max">
            {/* First set of logos */}
            <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
              {cruiseLogos.map((logo, i) => (
                <img 
                  key={`first-${i}`} 
                  src={logo.src} 
                  alt={logo.name} 
                  className={logo.className} 
                  title={logo.name} 
                />
              ))}
            </div>
            {/* Second set of logos for seamless loop */}
            <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
              {cruiseLogos.map((logo, i) => (
                <img 
                  key={`second-${i}`} 
                  src={logo.src} 
                  alt={logo.name} 
                  className={logo.className} 
                  title={logo.name} 
                />
              ))}
            </div>
            {/* Third set of logos to ensure it fills wide screens properly */}
            <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
              {cruiseLogos.map((logo, i) => (
                <img 
                  key={`third-${i}`} 
                  src={logo.src} 
                  alt={logo.name} 
                  className={logo.className} 
                  title={logo.name} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real tips section — human voice, not AI generic */}
      <section ref={tipsRef} className="py-20 lg:py-28 px-6 lg:px-16 bg-[#111111] border-y border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
                From Our Drivers
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                Things We Wish<br />Every Cruiser Knew
              </h2>
              <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">
                Getting to Port Canaveral from Orlando should be the easiest part of your trip. 
                Here's what decades of experience have taught us about making your transfer seamless.
              </p>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {tips.map((tip, i) => (
                <div key={i} className="tip-card border border-white/10 p-6 hover:border-[#D4AF37]/30 transition-colors duration-300">
                  <span className="font-mono text-[#D4AF37] text-xs">0{i + 1}</span>
                  <p className="font-body text-white text-sm mt-2 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Simple features — no icons, just text */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Flat Rate Pricing', desc: 'No surprises. The price you are quoted is the price you pay, even if traffic is heavy on the 528.' },
              { label: 'Group Accommodation', desc: 'Whether you\'re a couple or a multi-family group, our varied fleet can handle you and all your luggage.' },
              { label: 'Return Peace of Mind', desc: 'When you disembark, we\'ll be waiting for you. A quick, comfortable ride back to the airport or your hotel.' },
            ].map((item, i) => (
              <div key={i} className="border-t border-white/10 pt-6">
                <p className="font-mono text-[#555555] text-xs mb-2">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-white text-xl mb-3">{item.label}</h3>
                <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-16 bg-[#111111] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="font-display text-4xl text-white mb-4">
            Ready to Set Sail?
          </h2>
          <p className="font-body text-[#A0A0A0] text-base max-w-lg mx-auto mb-8">
            Start your cruise vacation early with a luxurious, stress-free ride to Port Canaveral.
          </p>
          <button
            onClick={openBooking}
            className="bg-white text-[#050505] px-10 py-4 font-body text-sm uppercase tracking-[0.1em] font-semibold hover:bg-[#D4AF37] transition-colors duration-300"
          >
            Book Now
          </button>
        </div>
      </section>
    </main>
  )
}
