import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ChevronRight, ArrowRight, ChevronDown } from 'lucide-react'
import SplitType from 'split-type'
import type Lenis from '@studio-freight/lenis'
import PartnerLogos from '../components/PartnerLogos'
import SpotlightGarage from '../components/SpotlightGarage'

import { useHomePage, useVehicles, useTestimonials, useDestinations, useStats } from '../hooks/useWordPress'

gsap.registerPlugin(ScrollTrigger)

interface HomeProps {
  lenis: Lenis | null
}

const DEFAULT_DESTINATIONS = [
  {
    image: '/images/terminal-c-v2.png',
    title: 'Terminal C',
    subtitle: 'Orlando International Airport',
  },
  {
    image: '/images/fbo-v3.png',
    title: 'Private Aviation',
    subtitle: 'Signature Flight Support (FBO)',
  },
  {
    image: '/images/dest-magic-kingdom-real.jpg',
    title: 'Magic Kingdom',
    subtitle: 'Where Dreams Come True',
  },
  {
    image: '/images/dest-hollywood-tower-real.jpg',
    title: 'Hollywood Studios',
    subtitle: 'Tower of Terror',
  },
  {
    image: '/images/dest-grand-floridian-real.jpg',
    title: 'Grand Floridian',
    subtitle: 'Luxury Resort',
  },
  {
    image: '/images/dest-epic-universe-real.jpg',
    title: 'Epic Universe',
    subtitle: 'Universal Orlando',
  },
  {
    image: '/images/port-canaveral-hero-real.jpg',
    title: 'Disney Wish',
    subtitle: 'Disney Cruise Line',
  },
]

const DEFAULT_TESTIMONIALS = [
  {
    quote: "Ashraf and his crew consistently provide outstanding service. We have used them for years! They are always on time, professional, and incredibly friendly. The cars are clean and well maintained, and the added touches like snacks and water make every ride even more comfortable. It's always a pleasure riding with them. Highly recommend their service!",
    author: 'Valerie McCarthy',
    location: 'Google Review',
    rating: 5,
  },
  {
    quote: "Ashraf and his team have done an excellent job of driving me and my family around Orlando and to/from Port Canaveral the last few years. I would highly recommend his car service to anyone looking for a professional outfit to get their family to and from locations around Central Florida.",
    author: 'Chris Wood',
    location: 'Google Review',
    rating: 5,
  },
  {
    quote: "We have used their services several times for transportation for our whole family from the airport to our hotel in Disney. Every trip has been great! They have been prompt, communication was great, super clean and comfortable vehicles and they are very friendly and courteous.",
    author: 'Rebecca Meyer',
    location: 'Google Review',
    rating: 5,
  },
  {
    quote: "My wife and I go to Walt Disney World several times a year. Ashraf with Orlando Blackline Transportation always picks us up at Orlando MCO Airport and greets us with a smile. Ashraf is punctual and professional. The vehicles are always clean. He goes above and beyond. I highly recommend.",
    author: 'Steve Crisp',
    location: 'Google Review',
    rating: 5,
  },
  {
    quote: "We have used Ashraf and his team for many years. Always professional and most importantly on time. They have always been great with our kids (4 young children) and can accommodate with car seats. We highly recommended using them! We have truly appreciate their commitment to assisting us every time we come to Orlando.",
    author: 'Mark Buchholz',
    location: 'Google Review',
    rating: 5,
  },
]

const DEFAULT_VEHICLES = [
  { name: 'Cadillac Escalade', type: 'Premium SUV', seats: '5 Passengers', bags: '6 Bags', image: '/images/Cadillac escalade.png' },
  { name: 'Chevrolet Suburban', type: 'Full-Size SUV', seats: '5 Passengers', bags: '6 Bags', image: '/images/chevy suburban.png' },
  { name: 'Ford Expedition', type: 'Full-Size SUV', seats: '5 Passengers', bags: '6 Bags', image: '/images/Ford Expedition.png' },
  { name: 'Mercedes Benz S Class', type: 'Sedan', seats: '3 Passengers', bags: '3 Bags', image: '/images/Mercedes Benz S Class.png' },
  { name: 'Tesla Model 3', type: 'Coming Soon', seats: '3 Passengers', bags: '3 Bags', image: '/images/Tesla Model 3,.png' },
  { name: 'Mercedes-Benz Sprinter', type: 'Executive Van', seats: '14 Passengers', bags: '16 Bags', image: '/images/Mercedes Benz Sprinter.png' },
  { name: 'Ford Transit Van', type: 'Executive Van', seats: '8 Passengers', bags: '14 Bags', image: '/images/Ford Transit Van.png' },
]

export default function Home({ lenis }: HomeProps) {
  const heroTextRef = useRef<HTMLDivElement>(null)
  const destSectionRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  const heroContainerRef = useRef<HTMLDivElement>(null)

  const { data: wpHome } = useHomePage()
  const { data: wpVehicles } = useVehicles()
  const { data: wpTestimonials } = useTestimonials()
  const { data: wpDestinations } = useDestinations()
  const { data: wpStats } = useStats()

  // Merge WordPress data with defaults
  const heroData = {
    titleLine1: wpHome?.heroTitleLine1 || 'Elevating',
    titleLine2: wpHome?.heroTitleLine2 || 'Your Journey',
    rightLine1: wpHome?.heroRightLine1 || 'Beyond',
    rightLine2: wpHome?.heroRightLine2 || 'Expectations',
    subtitle: wpHome?.heroSubtitle || 'The pinnacle of\nexecutive transport',
    description: wpHome?.heroDescription || 'Experience uncompromising luxury and meticulous attention to detail. We orchestrate flawless travel experiences for those who demand nothing but the absolute best.',
  }

  const activeDestinations = wpDestinations?.length
    ? wpDestinations
        .sort((a, b) => (a.destinationDetails.displayOrder || 0) - (b.destinationDetails.displayOrder || 0))
        .map(d => ({
          image: d.destinationDetails.destinationImage?.sourceUrl || '/images/dest-magic-kingdom-real.jpg',
          title: d.title,
          subtitle: d.destinationDetails.destinationSubtitle,
        }))
    : DEFAULT_DESTINATIONS

  const activeVehicles = wpVehicles?.length
    ? wpVehicles
        .sort((a, b) => (a.vehicleDetails.displayOrder || 0) - (b.vehicleDetails.displayOrder || 0))
        .map(v => ({
          name: v.title,
          type: v.vehicleDetails.vehicleType,
          seats: v.vehicleDetails.passengerCount,
          bags: v.vehicleDetails.bagCount,
          image: v.vehicleDetails.vehicleImage?.sourceUrl || '',
          price: v.vehicleDetails.vehiclePrice || '',
        }))
    : DEFAULT_VEHICLES

  const activeTestimonials = wpTestimonials?.length
    ? wpTestimonials
        .sort((a, b) => (a.testimonialDetails.displayOrder || 0) - (b.testimonialDetails.displayOrder || 0))
        .map(t => ({
          quote: t.testimonialDetails.quote,
          author: t.testimonialDetails.authorName,
          location: t.testimonialDetails.reviewSource,
          rating: t.testimonialDetails.rating,
        }))
    : DEFAULT_TESTIMONIALS

  const activeStats = wpStats?.length
    ? wpStats
        .sort((a, b) => (a.statDetails.displayOrder || 0) - (b.statDetails.displayOrder || 0))
        .map(s => ({ value: s.statDetails.statValue, label: s.statDetails.statLabel }))
    : [
        { value: '10+', label: 'Years of Experience' },
        { value: '10K+', label: 'Happy Travelers' },
        { value: '100%', label: 'On-Time Guarantee' },
        { value: '24/7', label: 'Live Support' },
      ]

  const destBullets = wpHome?.destinationBullets?.length
    ? wpHome.destinationBullets.map(b => b.text)
    : [
        'Door-to-door service from MCO Airport to all Disney resorts',
        'Flight tracking with complimentary wait time for delays',
        'Meet-and-greet at baggage claim with professional chauffeur',
        'Car seats and boosters available at no extra charge',
        'Knowledgeable drivers with insider Disney park tips',
      ]

  useEffect(() => {
    // Basic GSAP animations for text
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroContainerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: isTouch ? false : 1,
      }
    })

    if (heroTextRef.current) {
      tl.to('.hero-title', { y: -100, opacity: 0, duration: 1 }, 0)
        .to('.hero-title-right', { y: -150, opacity: 0, duration: 1 }, 0.1)
        .to('.hero-desc', { y: -50, opacity: 0, duration: 1 }, 0.2)
    }
    return () => { tl.kill() }
  }, [])

  useEffect(() => {
    // Wait a tiny bit for fonts to render, or just run
    const splitTitles = new SplitType('.hero-title, .hero-title-right', { types: 'chars' })
    
    gsap.fromTo(
      splitTitles.chars,
      { 
        filter: 'blur(12px)',
        opacity: 0,
        x: -15,
      },
      {
        filter: 'blur(0px)',
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.03,
        ease: 'power2.out',
        delay: 0.3
      }
    )

    gsap.fromTo(
      '.hero-desc',
      { opacity: 0, y: 20, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, delay: 0.8, ease: 'power2.out' }
    )

    return () => {
      splitTitles.revert()
    }
  }, [])



  useEffect(() => {
    if (!destSectionRef.current) return

    const items = destSectionRef.current.querySelectorAll('.unblur-item')
    const triggers: gsap.core.Timeline[] = []

    items.forEach((elem) => {
      const img = elem.querySelector('img')
      if (!img) return

      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: elem,
          start: 'top 80%',
          end: 'top 15%',
          scrub: isTouch ? false : 2.5,
        },
      })

      tl.fromTo(img, { scale: 1.25 }, { scale: 1, ease: 'power2.out' }, 0)
      tl.fromTo(elem, { filter: 'blur(16px)' }, { filter: 'blur(0px)', ease: 'power2.out' }, 0)
      tl.fromTo(elem, { opacity: 0.15 }, { opacity: 1, ease: 'power2.out' }, 0)
      tl.fromTo(img, { rotation: -2 }, { rotation: 0, ease: 'power2.out' }, 0)

      triggers.push(tl)
    })

    return () => {
      triggers.forEach((tl) => tl.kill())
    }
  }, [])

  useEffect(() => {
    if (!featuresRef.current) return

    const cards = featuresRef.current.querySelectorAll('.feature-card')
    const trigger = ScrollTrigger.create({
      trigger: featuresRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12 }
        )
      },
    })

    return () => trigger.kill()
  }, [])

  useEffect(() => {
    if (!testimonialsRef.current) return

    const cards = testimonialsRef.current.querySelectorAll('.testimonial-card')
    const trigger = ScrollTrigger.create({
      trigger: testimonialsRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.2 }
        )
      },
    })

    return () => trigger.kill()
  }, [])

  const openBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking'))
  }

  const skipHero = () => {
    if (lenis) {
      lenis.scrollTo(featuresRef.current as HTMLElement, { offset: 0, duration: 1.2 })
    } else {
      featuresRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main>
      {/* Hero Section */}
      <section ref={heroContainerRef} className="relative w-full h-[100svh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[center_50%] pointer-events-none"
          src="/videos/grok.mp4"
        />
        {/* Overlays to make it darker and fade upward/downward */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <div className="absolute inset-0 top-auto bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent h-1/2 pointer-events-none" />
        {/* Bottom-right corner darkener to hide watermark */}
        <div className="absolute bottom-0 right-0 w-48 h-24 bg-gradient-to-tl from-black/90 via-black/60 to-transparent pointer-events-none" />

        <div className="absolute inset-0 z-[2] flex flex-col p-6 lg:p-16 pointer-events-none">
          {/* Top spacer for navbar */}
          <div className="h-32" />
            
            <div className="flex-1 w-full relative">
              <div ref={heroTextRef} className="max-w-[800px]">
                <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[6.5rem] text-white leading-[0.95] tracking-tight hero-title whitespace-nowrap">
                  {heroData.titleLine1}<br />
                  <span className="ml-0 lg:ml-12">{heroData.titleLine2}</span>
                </h2>
                
                <h2 className="font-display text-4xl sm:text-5xl text-white leading-[0.95] tracking-tight hero-title-right whitespace-nowrap mt-3 md:hidden">
                  {heroData.rightLine1}<br />
                  <span>{heroData.rightLine2}</span>
                </h2>
                
                <div className="mt-6 lg:mt-16 max-w-sm pointer-events-auto hero-desc">
                  <h3 className="font-display text-xl text-white mb-4">
                    {heroData.subtitle.split('\n').map((line, i, arr) => (
                      <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                    ))}
                  </h3>
                  <div className="w-8 h-[1px] bg-white/50 mb-6" />
                  <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">
                    {heroData.description}
                  </p>
                </div>
              </div>

              <div className="text-right max-w-xl absolute right-0 top-1/2 -translate-y-[60%] hidden md:block">
                <h2 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-[6.5rem] text-white leading-[0.95] tracking-tight hero-title-right whitespace-nowrap">
                  {heroData.rightLine1}<br />
                  <span className="mr-0 lg:mr-12">{heroData.rightLine2}</span>
                </h2>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 lg:left-16 lg:right-28 flex flex-col md:flex-row items-center md:items-end justify-between pointer-events-auto pb-4 gap-6 md:gap-0">
              <div className="hidden lg:flex items-center gap-24">
                <div className="flex items-center gap-4 text-white/50 hover:text-white transition-colors cursor-pointer group">
                  <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
                  <span className="font-display text-xs tracking-[0.2em] uppercase font-bold">Scroll Down</span>
                </div>
                <span className="font-display text-xs tracking-[0.2em] uppercase text-white font-bold">To Start The Journey</span>
              </div>
              
              <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-2 w-full md:w-auto flex justify-center">
                <button
                  onClick={openBooking}
                  className="bg-white text-[#050505] px-8 py-4 md:px-6 md:py-3 w-full md:w-auto justify-center rounded-full font-display text-sm font-bold flex items-center gap-3 hover:bg-[#D4AF37] transition-colors duration-300"
                >
                  Book the Ride <ArrowRight size={16} />
                </button>
              </div>

              {/* Skip Button */}
              <button
                onClick={skipHero}
                className="text-white/50 hover:text-white flex items-center gap-2 font-display text-xs uppercase tracking-widest font-bold transition-colors"
              >
                Skip Intro <ChevronRight size={14} />
              </button>
            </div>
          </div>
      </section>

      {/* Partner Logos */}
      <PartnerLogos />

      {/* Introduction */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 bg-[#050505] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-5">
              <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-6">
                Welcome to Blackline
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
                A Premier<br />Chauffeured<br />Experience.
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6 pt-2 lg:pt-8">
              <p className="font-body text-[#A0A0A0] text-lg lg:text-xl leading-relaxed">
                <strong className="text-white font-normal">Orlando Blackline Transportation</strong> is a premier chauffeured luxury black car service proudly serving Orlando and Central Florida since 2016.
              </p>
              <p className="font-body text-[#A0A0A0] text-lg lg:text-xl leading-relaxed">
                Our highly trained, professional, background checked, uniformed chauffeurs and fully licensed and insured luxury fleet deliver safe, reliable, and first-class transportation for airport transfers to MCO, SFB, and private FBOs, as well as Disney World, Universal Studios Orlando, and other major attractions.
              </p>
              <p className="font-body text-[#A0A0A0] text-lg lg:text-xl leading-relaxed">
                We also provide luxury transportation for weddings, birthdays, sporting events, shopping and other special occasions.
              </p>
              <p className="font-body text-[#D4AF37] text-lg lg:text-xl leading-relaxed italic mt-4">
                We proudly serve leisure travelers, corporate clients, and travel agency partners with customized, dependable, and seamless luxury transportation services for every occasion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section ref={featuresRef} className="py-24 lg:py-40 px-6 lg:px-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
            <div className="lg:w-1/3 lg:sticky lg:top-40 h-fit">
              <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-6">
                {wpHome?.featuresLabel || 'The Blackline Standard'}
              </p>
              <h2 className="font-display text-5xl md:text-6xl lg:text-[5.5rem] text-white leading-[0.9] tracking-tight">
                Why<br />Choose<br />Us
              </h2>
              <div className="w-12 h-[1px] bg-[#D4AF37] mt-12 hidden lg:block" />
            </div>
            
            <div className="lg:w-2/3 flex flex-col mt-8 lg:mt-0">
              <div className="border-t border-white/5" />
              {[
                "Professional, highly trained, background checked & uniformed chauffeurs",
                "Licensed & insured luxury fleet",
                "Flight tracking",
                "Transparent, upfront pricing",
                "Meet & greet service",
                "24/7 availability",
                "Free car & booster seats per request",
                "Personalized customer service",
                "Safe, comfortable & stress-free travel",
                "Privacy & discretion"
              ].map((reason, i) => (
                <div 
                  key={i} 
                  className="flex items-start md:items-center gap-6 md:gap-12 py-8 lg:py-12 border-b border-white/5 group hover:border-[#D4AF37]/50 transition-colors duration-500 cursor-default"
                >
                  <span className="font-mono text-[#D4AF37] text-xl md:text-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-500 mt-1 md:mt-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-white/50 text-2xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight group-hover:text-white transition-all duration-700 md:group-hover:translate-x-8">
                    {reason}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Spotlight Garage */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-[#050505] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-10">
            <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-2">
              {wpHome?.fleetLabel || 'Our Collection'}
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-white">
              {wpHome?.fleetTitle || 'Luxury Fleet'}
            </h2>
          </div>
        </div>
        <SpotlightGarage vehicles={activeVehicles} />
      </section>

      {/* Destinations Section */}
      <section ref={destSectionRef} className="py-16 md:py-24 lg:py-40 px-6 lg:px-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
                {wpHome?.destinationsLabel || 'Destinations'}
              </p>
              <h2 className="font-display text-3xl md:text-5xl text-white mb-8">
                {wpHome?.destinationsTitle || <>The Magic<br />Unfolds</>}
              </h2>
              <div className="space-y-6">
                {destBullets.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="font-mono text-[#D4AF37] text-xs mt-1">0{i + 1}</span>
                    <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={openBooking}
                className="inline-flex items-center gap-2 mt-10 font-body text-white text-sm uppercase tracking-[0.1em] hover:text-[#D4AF37] transition-colors duration-300"
              >
                Book Your Transfer <ArrowRight size={16} />
              </button>
            </div>

            <div className="space-y-12">
              {activeDestinations.map((dest, i) => (
                <div key={i} className="unblur-item overflow-hidden">
                  <div className="overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[4/3] md:aspect-[3/4] object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <div>
                      <h3 className="font-display text-white text-xl md:text-2xl">{dest.title}</h3>
                      <p className="font-body text-[#A0A0A0] text-sm">{dest.subtitle}</p>
                    </div>
                    <span className="font-mono text-[#555555] text-xs">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 px-6 lg:px-16 bg-[#111111] border-y border-white/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
            {wpHome?.ctaLabel || 'Reserve Your Ride'}
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-white mb-4">
            {wpHome?.ctaTitle || 'Book Your Transfer'}
          </h2>
          <p className="font-body text-[#A0A0A0] text-base max-w-lg mx-auto mb-8 md:mb-10">
            {wpHome?.ctaDescription || 'Secure your luxury transportation through our trusted booking partner. Instant confirmation and flexible cancellation.'}
          </p>
          <button
            onClick={openBooking}
            className="bg-white text-[#050505] px-10 py-4 font-body text-sm uppercase tracking-[0.1em] font-semibold hover:bg-[#D4AF37] transition-colors duration-300 min-h-[44px]"
          >
            Book Now
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-16 md:py-24 lg:py-32 px-6 lg:px-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
              {wpHome?.testimonialsLabel || 'Testimonials'}
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-white">
              {wpHome?.testimonialsTitle || 'Client Experiences'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {activeTestimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-card border border-white/10 p-6 md:p-8 hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="font-body text-[#A0A0A0] text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-white/10 pt-6">
                  <p className="font-display text-white text-sm">{t.author}</p>
                  <p className="font-body text-[#555555] text-xs">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-16 md:py-20 px-6 lg:px-16 bg-[#111111] border-y border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
            {activeStats.map((stat, i) => (
              <div key={i}>
                <p className="font-display text-3xl md:text-5xl text-[#D4AF37] mb-2">{stat.value}</p>
                <p className="font-body text-[#A0A0A0] text-xs uppercase tracking-[0.15em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
