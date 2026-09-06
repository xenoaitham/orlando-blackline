import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plane, Castle, Briefcase, Heart, Sparkles, ChevronRight, Check, Ship, Train, Clock, type LucideIcon } from 'lucide-react'
import { useServices } from '../hooks/useWordPress'
import IgnitionKeys, { type ServiceData } from '../components/IgnitionKeys'


gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, LucideIcon> = { Castle, Sparkles, Ship, Plane, Briefcase, Heart, Check, Train, Clock }

const DEFAULT_SERVICES = [
  {
    id: 'theme-parks',
    icon: Castle,
    title: 'Theme Park Transfers',
    subtitle: 'Your Magical Journey Begins Here',
    description: 'Experience seamless transportation to all major Orlando theme parks including Walt Disney World, Universal Studios Orlando, Sea World Orlando, and Lego Land.',
    features: [
      'Door-to-door service from MCO Airport to all theme park resorts',
      'Child car seats available for families',
      'Flight tracking for delayed arrivals — we adjust automatically',
      'Spacious vehicles for luggage and souvenirs',
      'Professional chauffeurs with insider park tips',
      'No hidden fees or surge pricing — ever',
    ],
    image: '/images/hero-castle.jpg',
    price: 'From $145',
  },
  {
    id: 'port-canaveral',
    icon: Ship,
    title: 'Port Canaveral Transfers',
    subtitle: 'Set Sail With Luxury',
    description: 'Extend your luxury experience to the high seas. We provide seamless, direct transportation to Port Canaveral for all major cruise lines including Disney, Royal Caribbean, Carnival, and NCL.',
    features: [
      'Direct transfers to all Port Canaveral Cruise Terminals',
      'Spacious vehicles for all your cruise luggage',
      'Child car seats available for safe travel',
      'Flight tracking for seamless airport-to-port connections',
      'Professional chauffeurs with knowledge of port logistics',
      'No hidden fees — flat rate pricing',
    ],
    image: '/images/port-canaveral-hero.jpg',
    price: 'From $165',
  },
  {
    id: 'airport',
    icon: Plane,
    title: 'Airport Transportation',
    subtitle: 'Stress-Free Arrivals & Departures',
    description: 'Skip the taxi lines and rideshare uncertainty. Our professional chauffeurs monitor your flight in real-time, ensuring a smooth pickup regardless of delays or early arrivals.',
    features: [
      'Real-time flight tracking — we adjust for delays',
      'Meet and greet service inside the terminal',
      'Help with luggage and bags',
      'No surge pricing, ever',
      'Flat-rate pricing with no surprises',
      'Vehicles for 1-14+ passengers available 24/7',
    ],
    image: '/images/airport-mco.jpg',
    price: 'From $125',
  },
  {
    id: 'corporate',
    icon: Briefcase,
    title: 'Corporate Travel',
    subtitle: 'Business-Class Transportation',
    description: "Streamline your corporate travel with our premium executive fleet. Whether you're coordinating multi-vehicle roadshows, attending high-stakes association meetings, or moving teams to the Orange County Convention Center, we deliver punctual, professional, and discreet service tailored to your business needs.",
    features: [
      'Dedicated team for Roadshows and Corporate Meetings',
      'Online access to manage and track services in real-time',
      'Corporate account billing and detailed invoicing',
      'Wi-Fi equipped vehicles and discreet service',
      'Multiple vehicle coordination for executive groups',
      'Same-day booking for urgent meetings',
    ],
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=1080',
    price: 'Corporate Rates',
  },
  {
    id: 'fbo-car-service',
    icon: Plane,
    title: 'FBO Car Service',
    subtitle: 'Private Aviation Transportation',
    description: 'Exclusive tarmac-side pick-up and drop-off at all Central Florida FBOs. We offer seamless transitions from your private jet to our luxury vehicles.',
    features: [
      'Tarmac access at MCO, SFB, ORL, and KISM',
      'Direct communication with FBO desk and pilots',
      'Discreet, VIP transportation service',
      'Flight tracking for exact arrival times',
      'Luxury SUV and Executive Van options',
      'On-standby waiting service',
    ],
    image: '/images/fbo-v3.png',
    price: 'Custom Quote',
  },
  {
    id: 'leisure',
    icon: Heart,
    title: 'Weddings & Events',
    subtitle: 'Worry-Free Escapes',
    description: 'Focus on your escape while we handle the rest. We ensure seamless travel for family vacations, golf excursions, Florida Port cruises, ladies’ getaways, honeymoons, and FITs.',
    features: [
      'Specialized transportation for Golf groups',
      'Direct transfers to Port Canaveral cruise ships',
      'Honeymoon and anniversary packages',
      'Multi-vehicle coordination for family reunions',
      'Flexible timing for resort hopping and dining',
      'Premium comfort for worry-free getaways',
    ],
    image: 'https://plus.unsplash.com/premium_photo-1674235766400-b2642b8ffa43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 'Custom Quote',
  },
  {
    id: 'travel-agents',
    icon: Briefcase,
    title: 'Travel Agents',
    subtitle: 'Partner Program',
    description: 'Partner with Orlando Blackline for reliable, premium transportation for your clients. Enjoy priority dispatch, dedicated support, and competitive commissions.',
    features: [
      'Commission on every booking',
      'Preferred pricing for your clients',
      'Priority dispatch and vehicle upgrades',
      'Co-branded marketing materials',
      'Last-minute booking capability',
      'Seamless direct billing options',
    ],
    image: '/images/travel-agents-hero.png',
    price: 'Agent Rates',
  },
  {
    id: 'hourly',
    icon: Clock,
    title: 'Hourly Service',
    subtitle: 'By the Hour',
    description: 'Enjoy the Freedom of Luxury Black Car Transportation. Experience flexible hourly and full-day chauffeur services throughout Orlando and Central Florida. Set your own itinerary, save valuable time, and travel with peace of mind in our premium vehicles. With competitive rates, no hidden fees, and reliable personalized service, we make every journey comfortable, convenient, and stress-free.',
    features: [
      'Total flexibility for your schedule',
      'Unlimited stops and wait time',
      'Keep your belongings secure in the car',
      'Professional chauffeur at your disposal',
      'Ideal for financial roadshows and shopping trips',
      'Change your destination on the fly',
    ],
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1080',
    price: 'Hourly Rates',
  },
]

const DEFAULT_PROCESS_STEPS = [
  { step: '01', title: 'Reserve Online', description: 'Book through our simple reservation form or call our concierge team at 407-516-1645.' },
  { step: '02', title: 'We Confirm', description: 'Receive instant confirmation with driver details and pickup instructions.' },
  { step: '03', title: 'Relax & Enjoy', description: 'Your chauffeur arrives on time and handles everything from there.' },
]

export default function Services() {
  const heroRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { data: wpServices } = useServices()

  const activeServices = wpServices?.length
    ? wpServices
        .sort((a, b) => (a.serviceDetails.displayOrder || 0) - (b.serviceDetails.displayOrder || 0))
        .map(s => {
          const id = s.serviceDetails.serviceSlug || s.title.toLowerCase().replace(/\s+/g, '-');
          let description = s.serviceDetails.serviceDescription;
          let image = s.serviceDetails.serviceImage?.sourceUrl || '/images/hero-castle.jpg';
          if (id === 'hourly') {
            description = 'Enjoy the Freedom of Luxury Black Car Transportation. Experience flexible hourly and full-day chauffeur services throughout Orlando and Central Florida. Set your own itinerary, save valuable time, and travel with peace of mind in our premium vehicles. With competitive rates, no hidden fees, and reliable personalized service, we make every journey comfortable, convenient, and stress-free.';
          } else if (id === 'airport' || id === 'airport-transportation' || id === 'airport-transfers') {
            description = 'Traveling for business, leisure, or a special occasion, you can relax knowing your journey is in hands. Orlando Blackline Transportation provides premium airport transportation and luxury black car service in Central Florida. Whether you are landing at Orlando International Airport (MCO), Orlando Sanford International Airport (SFB) or nearby Airports including FBOs. Our professional chauffeurs ensure a smooth, stress-free, comfortable, and reliable transfer to your destination.';
          } else if (id === 'port-canaveral' || id === 'port-canaveral-transportation' || id === 'cruise' || id === 'cruise-transfers') {
            description = 'Orlando Blackline Transportation, your trusted choice for luxury black car service and private transportation between anywhere in Florida and Port Canaveral. Whether you’re departing for a cruise or returning from your vacation, our professional chauffeurs provide a comfortable, reliable, safe and stress-free travel experience from start to finish.';
          } else if (id === 'leisure' || id === 'weddings-events' || id === 'special-occasions') {
            description = 'Orlando Blackline Transportation provides Luxury and reliable special event transportation in Orlando to impress, designed to make every occasion memorable, seamless and stress-free transportation experience. From weddings and Quinceañeras to proms, concerts, sporting events, and special celebrations, our luxury black car service offers exceptional service from pick-up to drop-off so you can relax and enjoy your special moments while our chauffeurs provide a smooth, worry-free transportation experience.';
          } else if (id.includes('fbo') || s.title.toLowerCase().includes('fbo')) {
            description = 'Designed for private aviation clients, our FBO, Luxury, black Car transportation, serving Orlando area, provides seamless, stress-free service from the aircraft to your destination. The ultimate in luxury and convenience with Whether arriving or departing, our professional chauffeurs manage every detail with precision and discretion, delivering a private, comfortable, and refined travel experience for clients who value exceptional service and reliability';
            image = '/images/fbo-v3.png';
          } else if (id.includes('corporate') || id.includes('business') || id.includes('executive') || s.title.toLowerCase().includes('corporate') || s.title.toLowerCase().includes('executive')) {
            description = 'For business travelers who value professionalism and reliability, Orlando Blackline Transportation provides premium corporate transportation in Orlando. Whether you’re traveling to a meeting, conference, or corporate event, our experienced chauffeurs & luxury fleet  will deliver punctual, comfortable, and discreet service, allowing you to focus on what matters most';
            image = '/images/corporate_travel_hero.png';
          } else if (id.includes('agent') || s.title.toLowerCase().includes('agent') || id.includes('travel')) {
            description = 'Generate Additional Revenue based on a simple commission-based structure without the Hassle and the need to manage day-to-day operations. Elevate your client experience & loyalty with our High-end luxury fleet, Signature Meet & Greet service and exceptional service quality that enhance your clients satisfaction and reflect your commitment to exceptional service';
            image = '/images/travel-agents-hero.png';
          }
          return {
            id,
            icon: iconMap[s.serviceDetails.serviceIcon] || Sparkles,
            title: s.title,
            subtitle: s.serviceDetails.serviceSubtitle,
            description,
            features: s.serviceDetails.serviceFeatures?.map(f => f.featureText) || [],
            image,
            price: s.serviceDetails.servicePrice,
          }
        })
    : DEFAULT_SERVICES

  const [selectedService, setSelectedService] = useState<ServiceData | null>(null)

  // Scroll to hash section when navigating from dropdown
  useEffect(() => {
    if (location.hash && !selectedService) {
      const id = location.hash.replace('#', '')
      const service = activeServices.find(s => s.id === id)
      if (service) {
        setSelectedService(service)
      }
    }
  }, [location.hash, activeServices])

  useEffect(() => {
    if (!heroRef.current || selectedService) return
    const tl = gsap.timeline()
    tl.fromTo(
      heroRef.current.querySelectorAll('.hero-anim'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 }
    )
    return () => { tl.kill() }
  }, [selectedService])

  useEffect(() => {
    if (!processRef.current) return
    gsap.fromTo(
      processRef.current.querySelectorAll('.process-step'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top 80%',
          once: true,
        }
      }
    )
  }, [selectedService])

  const openBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking'))
  }

  const handleIgnite = (service: ServiceData) => {
    if (service.id === 'theme-parks' || service.title.toLowerCase().includes('theme park')) {
      navigate('/theme-parks')
      return
    }
    if (service.id === 'airport' || service.title.toLowerCase().includes('airport')) {
      navigate('/airport-mco')
      return
    }
    if (service.id === 'port-canaveral' || service.title.toLowerCase().includes('port canaveral') || service.title.toLowerCase().includes('cruise')) {
      navigate('/port-canaveral')
      return
    }
    if (service.id === 'leisure' || service.id === 'weddings-events' || service.title.toLowerCase().includes('weddings') || service.title.toLowerCase().includes('special occasion') || service.title.toLowerCase().includes('special')) {
      navigate('/weddings-events')
      return
    }
    if (service.id === 'corporate' || service.title.toLowerCase().includes('corporate') || service.title.toLowerCase().includes('business') || service.title.toLowerCase().includes('executive')) {
      navigate('/corporate-travel')
      return
    }
    setSelectedService(service)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <main className="pt-20">
      {!selectedService ? (
        <>
          {/* Valet Cabinet Hero */}
          <section ref={heroRef} className="relative pt-24 pb-12 px-6 lg:px-16 overflow-hidden bg-[#050505]">
            <div className="relative z-10 max-w-[1400px] mx-auto text-center">
              <p className="hero-anim font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
                What We Offer
              </p>
              <h1 className="hero-anim font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                Our Services
              </h1>
            </div>
          </section>

          {/* Ignition Keys Cabinet */}
          <IgnitionKeys services={activeServices} onIgnite={handleIgnite} />
        </>
      ) : (
        /* Showroom View for Selected Service */
        <div className="animate-in fade-in duration-1000">
          <section className="relative min-h-[60vh] flex items-end pb-24 px-6 lg:px-16">
            <div className="absolute inset-0">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/30" />
            </div>
            
            <div className="relative z-10 max-w-[1400px] w-full mx-auto">
              <button 
                onClick={() => setSelectedService(null)}
                className="mb-8 inline-flex items-center gap-2 text-[#A0A0A0] hover:text-[#D4AF37] transition-colors font-mono text-xs uppercase tracking-widest"
              >
                <ChevronRight className="rotate-180" size={14} /> Back to Cabinet
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                <selectedService.icon size={32} className="text-[#D4AF37]" />
                <p className="font-mono text-[#D4AF37] text-sm tracking-[0.2em] uppercase">
                  {selectedService.subtitle}
                </p>
              </div>
              <h1 className="font-display text-5xl md:text-7xl text-white max-w-4xl">
                {selectedService.title}
              </h1>
            </div>
          </section>

          <section className="py-16 bg-[#050505]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7">
                <h2 className="font-display text-3xl text-white mb-6">Experience Overview</h2>
                <p className="font-body text-[#A0A0A0] text-lg leading-relaxed mb-12">
                  {selectedService.description}
                </p>
                
                <h3 className="font-mono text-white text-sm tracking-widest uppercase mb-6">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedService.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 p-4 border border-white/5 bg-white/[0.02]">
                      <Check size={16} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                      <span className="font-body text-[#ccc] text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-5">
                <div className="glass-panel p-8 md:p-12 sticky top-32">
                  <p className="font-mono text-[#A0A0A0] text-xs uppercase tracking-widest mb-2">Starting at</p>
                  <div className="font-display text-4xl text-[#D4AF37] mb-8">{selectedService.price}</div>
                                    {selectedService.id === 'travel-agents' ? (
                              <Link 
                                to="/agent-application"
                                className="w-full bg-[#D4AF37] text-black px-6 py-4 font-body text-sm uppercase tracking-[0.1em] font-semibold hover:bg-white transition-colors duration-300 flex items-center justify-center gap-3"
                              >
                                Become a Member <ChevronRight size={18} />
                              </Link>
                            ) : (
                              <button 
                                onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                                className="w-full bg-[#D4AF37] text-black px-6 py-4 font-body text-sm uppercase tracking-[0.1em] font-semibold hover:bg-white transition-colors duration-300 flex items-center justify-center gap-3"
                              >
                                Turn Key to Booking <ChevronRight size={18} />
                              </button>
                            )}         <p className="font-body text-[#777] text-xs text-center">
                    No hidden fees. Flat-rate transparent pricing.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Process Steps */}
      <section ref={processRef} className="py-24 lg:py-32 px-6 lg:px-16 bg-[#111111] border-y border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
              How It Works
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              Simple. Seamless. Magical.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {DEFAULT_PROCESS_STEPS.map((step) => (
              <div key={step.step} className="process-step text-center border border-white/10 p-8 lg:p-12 hover:border-[#D4AF37]/30 transition-colors duration-500">
                <span className="font-display text-6xl text-white/5 block mb-4">{step.step}</span>
                <h3 className="font-display text-white text-xl mb-4">{step.title}</h3>
                <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Area */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
                Coverage
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                Serving All of<br />Central Florida & Beyond
              </h2>
              <p className="font-body text-[#A0A0A0] text-base leading-relaxed mb-8">
                While we specialize in Walt Disney World transportation and Central Florida events, 
                our service extends across Florida and Central Florida. From Universal Studios 
                to Port Canaveral cruise terminals, we&apos;ve got you covered.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Walt Disney World',
                  'Universal Orlando',
                  'SeaWorld Orlando',
                  'Orlando International (MCO)',
                  'Sanford Airport (SFB)',
                  'Port Canaveral',
                  'Brightline Stations',
                  'FBO Airports',
                  'Convention Center',
                  'By the Hour',
                ].map((area) => (
                  <div key={area} className="flex items-center gap-2">
                    <Check size={14} className="text-[#D4AF37]" />
                    <span className="font-body text-[#A0A0A0] text-sm">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/dest-epcot-real.jpg"
                alt="Orlando destinations"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-16 bg-[#111111] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="font-body text-[#A0A0A0] text-base max-w-lg mx-auto mb-8">
            Join thousands of satisfied travelers who trust Orlando Blackline
            for their Disney World transportation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/fleet"
              className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 font-body text-sm uppercase tracking-[0.1em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
            >
              View Our Fleet <ChevronRight size={16} />
            </Link>
            <button
              onClick={openBooking}
              className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#050505] px-8 py-4 font-body text-sm uppercase tracking-[0.1em] font-semibold hover:bg-white transition-colors duration-300"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
