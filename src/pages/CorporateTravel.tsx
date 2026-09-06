import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone } from 'lucide-react'
import { useSiteSettings } from '../lib/wp-context'

gsap.registerPlugin(ScrollTrigger)



const tips = [
  'We offer corporate accounts with streamlined billing for frequent travelers.',
  'Need multiple vehicles for a convention? We can coordinate an entire fleet for your team.',
  'Our chauffeurs are trained in discretion and executive privacy.',
  'Vehicles are equipped with Wi-Fi so you can work on the go.',
  'Real-time flight tracking ensures we are always there when your executives land.'
]

export default function CorporateTravel() {
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
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 lg:static lg:w-1/2 lg:ml-auto lg:h-[70vh] overflow-hidden">
          <img src="/images/corporate_travel_hero.png" alt="Corporate Travel" className="w-full h-full object-cover opacity-50 lg:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#050505]/80 to-[#050505]" />
        </div>
        <div className="absolute inset-0 lg:inset-auto flex flex-col justify-center lg:block z-10 max-w-[1400px] mx-auto px-6 lg:px-16 w-full">
          <div className="max-w-xl">
            <p className="reveal font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
              Corporate Transportation Service
            </p>
            <h1 className="reveal font-display text-5xl md:text-7xl text-white mb-6 leading-[1.1]">
              Business-Class<br />Transportation
            </h1>
            <p className="reveal font-body text-[#A0A0A0] text-lg leading-relaxed mb-8 max-w-lg">
              For business travelers who value professionalism and reliability, Orlando Blackline Transportation provides premium corporate transportation in Orlando. Whether you’re traveling to a meeting, conference, or corporate event, our experienced chauffeurs & luxury fleet  will deliver punctual, comfortable, and discreet service, allowing you to focus on what matters most
            </p>
            <div className="reveal flex items-center gap-4">
              <button
                onClick={openBooking}
                className="bg-white text-[#050505] px-8 py-3.5 font-body text-sm uppercase tracking-[0.1em] font-semibold hover:bg-[#D4AF37] transition-colors duration-300"
              >
                Book Corporate Transfer
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

      {/* Destinations */}
      <section ref={contentRef} className="py-20 lg:py-28 px-6 lg:px-16 bg-[#050505] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <p className="fade-up font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
            Where We Go
          </p>
          <h2 className="fade-up font-display text-4xl md:text-5xl text-white mb-12">
            Key Business Hubs
          </h2>
          <div className="flex justify-center items-center mt-8">
            <img 
              src="/images/occ-logo.png" 
              alt="Orange County Convention Center"
              className="h-20 md:h-28 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={tipsRef} className="py-20 lg:py-28 px-6 lg:px-16 bg-[#111111] border-y border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
                Corporate Benefits
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                Designed for<br />Executives
              </h2>
              <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">
                We understand that in business, time is money and reliability is everything.
                Our corporate services are structured around the demanding schedules of modern executives.
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

      {/* CTA */}
      <section className="py-24 px-6 lg:px-16 bg-[#050505] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="font-display text-4xl text-white mb-4">
            Open a Corporate Account Today
          </h2>
          <p className="font-body text-[#A0A0A0] text-base max-w-lg mx-auto mb-8">
            Experience reliable, professional, and discreet executive transportation tailored to your business needs.
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
