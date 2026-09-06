import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Phone } from 'lucide-react'
import { useSiteSettings } from '../lib/wp-context'
import { themeParkLogos } from '../components/PartnerLogos'

gsap.registerPlugin(ScrollTrigger)


const tips = [
  'Book your pickup at least 15 minutes after your flight lands — gives you time for deplaning and baggage claim',
  'If you\'re checking bags, Terminal B at MCO is usually faster than Terminal A for ground transportation pickups',
  'We track every flight. If your plane is delayed, we know before you land and adjust automatically. No extra charge, no phone call needed',
  'Rope drop at Magic Kingdom is 8:30 AM most days. We recommend pickup at 6:45 AM from most resort hotels to get there in time',
  'Car seats are free with us. Just tell us ages and weights when you book — we have every size',
]

const comparisonData = [
  { feature: 'Meet & greet at baggage claim', us: true, rideshare: false, taxi: false },
  { feature: 'Flight tracking + delay adjustments', us: true, rideshare: false, taxi: false },
  { feature: 'Flat rate — no surge pricing', us: true, rideshare: false, taxi: true },
  { feature: 'Car seats available', us: true, rideshare: false, taxi: false },
  { feature: 'Luggage assistance', us: true, rideshare: false, taxi: 'sometimes' as const },
  { feature: '24/7 customer support', us: true, rideshare: false, taxi: false },
]

export default function ThemeParks() {
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
            src="/images/hero-castle.jpg"
            alt="Cinderella Castle at Magic Kingdom"
            className="w-full h-full object-cover opacity-30 lg:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#050505]/80 to-[#050505]" />
        </div>
        <div className="absolute inset-0 lg:inset-auto z-10 max-w-[1400px] mx-auto px-6 lg:px-16 w-full flex items-center">
          <div className="max-w-2xl">
            <p className="reveal font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
              Theme Park Transfers
            </p>
            <h1 className="reveal font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]">
              Orlando Theme Parks<br />Transportation Service
            </h1>
            <p className="reveal font-body text-[#A0A0A0] text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              At Orlando Blackline Transportation, we specialize in luxury black car service and private transportation to Walt Disney World®, Universal Studios Orlando ™, SeaWorld Orlando, and LEGOLAND® and the majority of Central Florida theme parks & Orlando Resorts. Relax in one of our premium black vehicles and enjoy a first-class travel experience. Our professional uniformed chauffeurs are committed to delivering punctual, courteous service, ensuring a smooth and stress-free ride to and from Orlando's most popular theme parks.
            </p>
            


            <div className="reveal flex items-center gap-4">
              <button
                onClick={openBooking}
                className="bg-white text-[#050505] px-8 py-3.5 font-body text-sm uppercase tracking-[0.1em] font-semibold hover:bg-[#D4AF37] transition-colors duration-300"
              >
                Book Theme Park Transfer
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

      {/* Comparison — why not Uber/Taxi */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 bg-[#050505] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
                Honest Comparison
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                Uber vs Us.<br />There&apos;s No Contest.
              </h2>
              <p className="font-body text-[#A0A0A0] text-base leading-relaxed">
                Let&apos;s be real — you can get an Uber from MCO to your resort 
                for $45. But you know what that gets you? A driver who&apos;s 
                following GPS to a resort they&apos;ve never been to. 
                No car seat. Surge pricing if it&apos;s raining. 
                And good luck fitting a week&apos;s worth of Disney 
                souvenirs in a Toyota Corolla.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="font-body text-left text-[#A0A0A0] text-xs uppercase tracking-wider py-4 pr-4">Feature</th>
                    <th className="font-body text-center text-[#D4AF37] text-xs uppercase tracking-wider py-4 px-4">Orlando Blackline</th>
                    <th className="font-body text-center text-[#555555] text-xs uppercase tracking-wider py-4 px-4">Rideshare</th>
                    <th className="font-body text-center text-[#555555] text-xs uppercase tracking-wider py-4 pl-4">Taxi</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr key={row.feature} className="border-b border-white/5">
                      <td className="font-body text-white py-4 pr-4">{row.feature}</td>
                      <td className="text-center py-4 px-4">
                        {row.us === true ? <Check size={16} className="text-[#D4AF37] inline" /> : null}
                      </td>
                      <td className="text-center py-4 px-4">
                        {row.rideshare === true ? <Check size={16} className="text-[#555] inline" /> : <span className="text-[#555]">—</span>}
                      </td>
                      <td className="text-center py-4 pl-4">
                        {row.taxi === true ? <Check size={16} className="text-[#555] inline" /> : row.taxi === 'sometimes' ? <span className="text-[#555] text-xs">~</span> : <span className="text-[#555]">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              All Orlando Theme Parks
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
              {themeParkLogos.slice(0, 4).map((logo, i) => (
                <img 
                  key={`first-${i}`} 
                  src={logo.src} 
                  alt={logo.name} 
                  className="h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 max-w-none" 
                  title={logo.name} 
                />
              ))}
            </div>
            {/* Second set of logos for seamless loop */}
            <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
              {themeParkLogos.slice(0, 4).map((logo, i) => (
                <img 
                  key={`second-${i}`} 
                  src={logo.src} 
                  alt={logo.name} 
                  className="h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 max-w-none" 
                  title={logo.name} 
                />
              ))}
            </div>
            {/* Third set of logos to ensure it fills wide screens properly */}
            <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
              {themeParkLogos.slice(0, 4).map((logo, i) => (
                <img 
                  key={`third-${i}`} 
                  src={logo.src} 
                  alt={logo.name} 
                  className="h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 max-w-none" 
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
                Things We Wish<br />Every Guest Knew
              </h2>
              <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">
                After 20+ years of doing this, our drivers have picked up 
                a few things. Some of these will save you time. Some will 
                save you money. All of them come from experience.
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
              { label: 'Flat Rate Pricing', desc: 'What you see is what you pay. No surge, no hidden fees, no "the price changed because it\'s raining."' },
              { label: 'Flight Tracking', desc: 'We monitor your flight from departure to arrival. Delayed? We adjust. Early? We\'re already there.' },
              { label: '24/7 Availability', desc: 'Theme parks open early and stay open late. So do we. 6 AM flight? 2 AM park close? We\'re there.' },
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
            Ready to Start Your Vacation?
          </h2>
          <p className="font-body text-[#A0A0A0] text-base max-w-lg mx-auto mb-8">
            One ride and you&apos;ll never go back to rental cars or rideshares. 
            Book your Theme Park transfer today.
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
