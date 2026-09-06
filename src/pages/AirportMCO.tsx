import { useEffect, useRef } from 'react'
import { Phone } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSiteSettings } from '../lib/wp-context'


gsap.registerPlugin(ScrollTrigger)


const howItWorks = [
  { step: 'Book', desc: 'Tell us your flight number and destination. That\'s it.', detail: 'No app download required. No account needed.' },
  { step: 'We Watch', desc: 'We track your flight from departure. Any delay, we adjust.', detail: 'Average adjustment time: 0 seconds. We just know.' },
  { step: 'You Land', desc: 'Open your phone. Your driver is waiting with a sign.', detail: 'Domestic: 60 min complimentary wait. International: 90 min.' },
  { step: 'You Go', desc: 'We handle the bags. You start your vacation.', detail: 'Door-to-door. No stops. No detours.' },
]

const airportLogos = [
  {
    name: "Orlando International Airport (MCO)",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/MCO_airport_logo.svg/500px-MCO_airport_logo.svg.png",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  },
  {
    name: "Orlando Sanford International Airport (SFB)",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/de/Orlando_Sanford_International_Airport_logo.svg",
    className: "h-10 md:h-14 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  },
  {
    name: "Tampa International Airport (TPA)",
    src: "/images/tpa-logo.svg",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  },
  {
    name: "Melbourne Orlando International Airport (MLB)",
    src: "/images/mlb-logo.svg",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  },
  {
    name: "Daytona Beach International Airport (DAB)",
    src: "/images/dab-logo.png",
    className: "h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
  }
];

export default function AirportMCO() {
  const { settings } = useSiteSettings()
  const heroRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return
    gsap.fromTo(
      heroRef.current.querySelectorAll('.r'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.3 }
    )
  }, [])

  useEffect(() => {
    if (!stepsRef.current) return
    const items = stepsRef.current.querySelectorAll('.step-card')
    const trigger = ScrollTrigger.create({
      trigger: stepsRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          items,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.15 }
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
            src="/images/airport-mco.jpg"
            alt="Orlando International Airport"
            className="w-full h-full object-cover opacity-30 lg:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#050505]/60 to-[#050505]" />
        </div>
        <div className="absolute inset-0 lg:inset-auto flex flex-col justify-center lg:block z-10 max-w-[1400px] mx-auto px-6 lg:px-16 w-full">
          <div className="max-w-xl">
            <p className="r font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
              Airport Transfers Service
            </p>
            <h1 className="r font-display text-5xl md:text-7xl text-white mb-6 leading-[1.1]">
              Get off the plane.<br />Get in the car.<br />Get on with it.
            </h1>
            <p className="r font-body text-[#A0A0A0] text-lg leading-relaxed mb-8 max-w-lg">
              Traveling for business, leisure, or a special occasion, you can relax knowing your journey is in hands. Orlando Blackline Transportation provides premium airport transportation and luxury black car service in Central Florida. Whether you are landing at Orlando International Airport (MCO), Orlando Sanford International Airport (SFB) or nearby Airports including FBOs. Our professional chauffeurs ensure a smooth, stress-free, comfortable, and reliable transfer to your destination.
            </p>
            <div className="r flex items-center gap-4">
              <button
                onClick={openBooking}
                className="bg-white text-[#050505] px-8 py-3.5 font-body text-sm uppercase tracking-[0.1em] font-semibold hover:bg-[#D4AF37] transition-colors duration-300"
              >
                Book Airport Transfer
              </button>
              <a
                href={`tel:${settings.phoneLink || '+14075161645'}`}
                className="inline-flex items-center gap-2 font-mono text-[#D4AF37] text-sm tracking-wider hover:text-black hover:bg-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 rounded-md transition-colors"
              >
                <Phone size={18} />
                {settings.phoneNumber || '407-516-1645'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — vertical steps, no icons */}
      <section ref={stepsRef} className="py-24 lg:py-32 px-6 lg:px-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
                How It Works
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                Four Steps.<br />No Surprises.
              </h2>
              <p className="font-body text-[#A0A0A0] text-sm leading-relaxed mb-8">
                Our airport process is deliberately simple. We&apos;ve been doing 
                this long enough to know what matters: showing up on time, 
                tracking your flight, and not hitting you with hidden fees.
              </p>
            </div>
            <div className="space-y-6">
              {howItWorks.map((item, i) => (
                <div key={i} className="step-card border border-white/10 p-8 hover:border-[#D4AF37]/30 transition-colors duration-300">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-mono text-[#D4AF37] text-sm">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display text-white text-xl">{item.step}</h3>
                  </div>
                  <p className="font-body text-[#A0A0A0] text-sm leading-relaxed mb-2">{item.desc}</p>
                  <p className="font-body text-[#555555] text-xs">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Airports we serve - Dynamic Marquee */}
      <section className="py-20 lg:py-24 bg-[#111111] border-y border-white/10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 mb-12">
          <div className="text-center">
            <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
              Coverage
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              Airports We Serve
            </h2>
          </div>
        </div>
        
        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden group">
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />
          
          {/* Animated Track */}
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max">
            {/* First set of logos */}
            <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
              {airportLogos.map((logo, i) => (
                <img key={`first-${i}`} src={logo.src} alt={logo.name} className={`${logo.className} max-w-none`} title={logo.name} />
              ))}
            </div>
            {/* Second set of logos for seamless loop */}
            <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
              {airportLogos.map((logo, i) => (
                <img key={`second-${i}`} src={logo.src} alt={logo.name} className={`${logo.className} max-w-none`} title={logo.name} />
              ))}
            </div>
            {/* Third set of logos to ensure it fills wide screens properly */}
            <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
              {airportLogos.map((logo, i) => (
                <img key={`third-${i}`} src={logo.src} alt={logo.name} className={`${logo.className} max-w-none`} title={logo.name} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Driver's Notes — real MCO tips */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 bg-[#111111]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
                Driver&apos;s Notes
              </p>
              <h2 className="font-display text-4xl text-white mb-4">
                Things Only<br />Local Drivers<br />Know
              </h2>
              <p className="font-body text-[#555555] text-xs">
                We asked our drivers to share their honest tips<br />
                for navigating MCO. Not sponsored. Just real.
              </p>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="border-l-2 border-[#D4AF37]/50 pl-6">
                <p className="font-body text-white text-sm mb-1">If you land at Terminal B, the wait for rideshare is longer than Terminal A.</p>
                <p className="font-mono text-[#555555] text-xs">Terminal B rideshare lot has less shelter and tighter pickup lanes.</p>
              </div>
              <div className="border-l-2 border-[#D4AF37]/50 pl-6">
                <p className="font-body text-white text-sm mb-1">The Cell Phone Lot is free and has a flight tracker board.</p>
                <p className="font-mono text-[#555555] text-xs">Your driver is already there waiting. You don&apos;t need to ask them to &quot;start the meter.&quot;</p>
              </div>
              <div className="border-l-2 border-[#D4AF37]/50 pl-6">
                <p className="font-body text-white text-sm mb-1">Brightline is great for Miami. Useless for Disney. That is all.</p>
                <p className="font-mono text-[#555555] text-xs">We pick up from Brightline station too, obviously.</p>
              </div>
              <div className="border-l-2 border-[#D4AF37]/50 pl-6">
                <p className="font-body text-white text-sm mb-1">If you&apos;re arriving after 10 PM, the rental car center is a 10-minute train ride.</p>
                <p className="font-mono text-[#555555] text-xs">Your driver will be waiting at baggage claim. No train needed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phone CTA */}
      <section className="py-24 px-6 lg:px-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-[#555555] text-xs tracking-[0.2em] uppercase mb-4">
            Need help booking?
          </p>
          <h2 className="font-display text-4xl text-white mb-4">
            Call Us. We&apos;re Actually Helpful.
          </h2>
          <p className="font-body text-[#A0A0A0] text-base max-w-lg mx-auto mb-8">
            Not a fan of online forms? Our team answers the phone — usually 
            by the second ring. Tell us your flight details and we&apos;ll 
            handle the rest.
          </p>
          <a
            href={`tel:${settings.phoneLink || '+14075161645'}`}
            className="inline-flex items-center gap-3 bg-[#111111] text-white px-8 py-4 font-display text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
          >
            Call {settings.phoneNumber || '407-516-1645'}
          </a>
        </div>
      </section>
    </main>
  )
}
