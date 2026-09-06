import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSiteSettings } from '../lib/wp-context'
import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const perks = [
  'Commission on every booking you refer — standard industry rates, paid promptly',
  'Preferred pricing for your clients. They save money. You look like a hero',
  'Priority dispatch for your clients — they get the best vehicles, even on busy days',
  'Co-branded marketing materials you can use on your site or social media',
  'Last-minute booking capability. Your client forgot transportation? We fix it',
]

const faq = [
  { q: 'How do my clients book?', a: 'You can book on their behalf through our agent portal, or they can book directly and mention your agency. Either way, you get credit.' },
  { q: 'When do I get paid?', a: 'Commissions are processed within 15 days of the completed transfer. Paid via check or direct deposit.' },
  { q: 'What if my client needs to cancel?', a: 'Full refund up to 24 hours before pickup. After that, we work with you — we understand things happen.' },
  { q: 'Do you serve all Orlando hotels?', a: 'All Disney resorts, Universal hotels, and most major Orlando hotels. If we don\'t cover one, tell us and we\'ll figure it out.' },
]

export default function TravelAgents() {
  const { settings } = useSiteSettings()
  const heroRef = useRef<HTMLDivElement>(null)
  const perksRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return
    gsap.fromTo(
      heroRef.current.querySelectorAll('.a'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.2 }
    )
  }, [])

  useEffect(() => {
    if (!perksRef.current) return
    const items = perksRef.current.querySelectorAll('.perk')
    const trigger = ScrollTrigger.create({
      trigger: perksRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          items,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.06 }
        )
      },
    })
    return () => trigger.kill()
  }, [])

  useEffect(() => {
    if (!faqRef.current) return
    gsap.fromTo(
      faqRef.current.querySelectorAll('.faq-item'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1, scrollTrigger: { trigger: faqRef.current, start: 'top 80%', once: true } }
    )
  }, [])

  return (
    <main className="pt-20">
      {/* Hero — straightforward, professional */}
      <section ref={heroRef} className="relative py-32 lg:py-48 px-6 lg:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/travel-agents-hero.png"
            alt="Travel Agent Partnership"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/20" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="max-w-3xl">
            <p className="a font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
              Partner Travel Agency
            </p>
            <h1 className="a font-display text-5xl md:text-7xl text-white mb-6 leading-[1.1]">
              Travel Agencies
            </h1>
            <p className="a font-body text-[#A0A0A0] text-lg leading-relaxed mb-8 max-w-2xl">
              Generate Additional Revenue based on a simple commission-based structure without the Hassle and the need to manage day-to-day operations. Elevate your client experience & loyalty with our High-end luxury fleet, Signature Meet & Greet service and exceptional service quality that enhance your clients satisfaction and reflect your commitment to exceptional service
            </p>
            <Link
              to="/agent-application"
              className="a inline-flex items-center gap-2 bg-white text-[#050505] px-8 py-4 font-body text-sm uppercase tracking-[0.1em] font-semibold hover:bg-[#D4AF37] transition-colors duration-300"
            >
              Become a Partner <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 bg-[#050505] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
            Authorized Partner
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-12">
            Proud Partners
          </h2>
          <div className="flex justify-center items-center mt-8">
            <img 
              src="/images/travel-agencies.png" 
              alt="Disney Destinations"
              className="h-32 md:h-48 w-auto object-contain grayscale invert mix-blend-screen opacity-60 hover:opacity-100 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Why partner */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 bg-[#111111] border-y border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                Why Partner With Us?
              </h2>
              <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">
                We&apos;ve been doing this since 2016. We know Orlando. We know 
                the parks. We know what matters to travelers. Our drivers 
                don&apos;t just drive — they&apos;re the first person your 
                client meets on vacation. That first impression? 
                We make it count.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/10 p-6">
                <p className="font-display text-3xl text-[#D4AF37] mb-1">Since 2016</p>
                <p className="font-body text-[#A0A0A0] text-xs">Established</p>
              </div>
              <div className="border border-white/10 p-6">
                <p className="font-display text-3xl text-[#D4AF37] mb-1">10K+</p>
                <p className="font-body text-[#A0A0A0] text-xs">Transfers completed</p>
              </div>
              <div className="border border-white/10 p-6 flex flex-col justify-center h-full">
                <div className="flex gap-1 mb-2 items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-[#D4AF37] fill-[#D4AF37] h-6 w-6" />
                  ))}
                </div>
                <p className="font-body text-[#A0A0A0] text-xs mt-1">Average client rating</p>
              </div>
              <div className="border border-white/10 p-6">
                <p className="font-display text-3xl text-[#D4AF37] mb-1">10+</p>
                <p className="font-body text-[#A0A0A0] text-xs">Active agent partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section ref={perksRef} className="py-20 lg:py-28 px-6 lg:px-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
            What You Get
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-12">
            No Bluff. Just What Works.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, i) => (
              <div key={i} className="perk border border-white/10 p-6">
                <span className="font-mono text-[#D4AF37] text-xs block mb-3">{String(i + 1).padStart(2, '0')}</span>
                <p className="font-body text-white text-sm leading-relaxed">{perk}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — plain text, no accordion */}
      <section ref={faqRef} className="py-20 lg:py-28 px-6 lg:px-16 bg-[#111111] border-y border-white/10">
        <div className="max-w-[900px] mx-auto">
          <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
            Questions
          </p>
          <h2 className="font-display text-4xl text-white mb-12">
            The Practical Stuff
          </h2>
          <div className="space-y-8">
            {faq.map((item, i) => (
              <div key={i} className="faq-item border-b border-white/10 pb-6">
                <p className="font-display text-white text-lg mb-2">{item.q}</p>
                <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 border border-white/10 text-center">
            <p className="font-body text-[#A0A0A0] text-sm mb-4">
              Ready to start? Email us and we&apos;ll set you up today.
            </p>
            <a
              href={`mailto:${settings.emailAddress || 'info@orlandoblacklinetransportation.com'}`}
              className="font-body text-white text-sm uppercase tracking-[0.1em] hover:text-[#D4AF37] transition-colors"
            >
              {settings.emailAddress || 'info@orlandoblacklinetransportation.com'}
            </a>
          </div>
        </div>
      </section>

      {/* Divider — just a phone number */}
      <section className="py-16 px-6 lg:px-16 bg-[#050505] text-center">
        <p className="font-body text-[#555555] text-xs tracking-[0.2em] uppercase mb-2">
          Or call
        </p>
        <a href={`tel:${settings.phoneLink || '+14075161645'}`} className="inline-block mt-4 px-8 py-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-xl font-display text-4xl md:text-5xl hover:bg-[#D4AF37] hover:text-[#050505] transition-colors">
          {settings.phoneNumber || '407-516-1645'}
        </a>
      </section>
    </main>
  )
}
