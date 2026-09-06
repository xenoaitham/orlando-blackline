import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Check, Phone } from 'lucide-react'
import { useVehicles } from '../hooks/useWordPress'

gsap.registerPlugin(ScrollTrigger)

const DEFAULT_VEHICLES = [
  {
    id: 1,
    name: 'Cadillac Escalade',
    category: 'SUV',
    passengers: 5,
    luggage: 6,
    image: '/images/Cadillac escalade.png',
    description: '5 passengers and 6 bags',
    features: [],
    price: 'Call for pricing',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mercedes-Benz Sprinter',
    category: 'Van',
    passengers: 14,
    luggage: 16,
    image: '/images/Mercedes Benz Sprinter.png',
    description: '14 passengers and 16 bags',
    features: [],
    price: '',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ford Transit Van',
    category: 'Van',
    passengers: 8,
    luggage: 14,
    image: '/images/Ford Transit Van.png',
    description: '8 passengers and 14 bags',
    features: [],
    price: '',
    rating: 5,
  },
  {
    id: 4,
    name: 'Chevrolet Suburban',
    category: 'SUV',
    passengers: 5,
    luggage: 6,
    image: '/images/chevy suburban.png',
    description: '5 passengers and 6 bags',
    features: [],
    price: '',
    rating: 5,
  },
  {
    id: 5,
    name: 'Ford Expedition',
    category: 'SUV',
    passengers: 5,
    luggage: 6,
    image: '/images/Ford Expedition.png',
    description: '5 passengers and 6 bags',
    features: [],
    price: '',
    rating: 5,
  },
  {
    id: 6,
    name: 'Mercedes Benz S Class',
    category: 'Sedan',
    passengers: 3,
    luggage: 3,
    image: '/images/Mercedes Benz S Class.png',
    description: '3 passengers and 3 bags',
    features: [],
    price: 'Call for pricing',
    rating: 5,
  },
  {
    id: 7,
    name: 'Tesla Model 3',
    category: 'Sedan',
    passengers: 3,
    luggage: 3,
    image: '/images/Tesla Model 3,.png',
    description: '3 passengers and 3 bags',
    features: [],
    price: 'Coming soon',
    rating: 5,
  },
]

const categories = ['All', 'Sedan', 'SUV', 'Van']

export default function Fleet() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const [activeCategory, setActiveCategory] = useState(() => {
    const cat = searchParams.get('category')
    return cat && categories.includes(cat) ? cat : 'All'
  })
  const { data: wpVehicles } = useVehicles()

  const allVehicles = wpVehicles?.length
    ? wpVehicles
        .sort((a, b) => (a.vehicleDetails.displayOrder || 0) - (b.vehicleDetails.displayOrder || 0))
        .map(v => ({
          id: v.title.toLowerCase().replace(/\s+/g, '-'),
          name: v.title,
          category: v.vehicleDetails.vehicleCategory,
          passengers: v.vehicleDetails.passengerCount,
          luggage: v.vehicleDetails.bagCount,
          image: v.vehicleDetails.vehicleImage?.sourceUrl || '',
          description: v.vehicleDetails.vehicleDescription || '',
          features: v.vehicleDetails.vehicleFeatures?.map(f => f.featureText) || [],
          price: v.vehicleDetails.vehiclePrice || '',
          rating: v.vehicleDetails.vehicleRating || 5,
        }))
    : DEFAULT_VEHICLES

  // Sync filter when navigating from dropdown with a different category
  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam)
    } else if (!categoryParam) {
      setActiveCategory('All')
    }
  }, [categoryParam])
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const initialMount = useRef(true)

  const filtered = activeCategory === 'All'
    ? allVehicles
    : allVehicles.filter((v) => v.category === activeCategory)

  useEffect(() => {
    if (!heroRef.current) return

    const tl = gsap.timeline()
    tl.fromTo(
      heroRef.current.querySelectorAll('.hero-anim'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 }
    )

    return () => { tl.kill() }
  }, [])

  useEffect(() => {
    if (!gridRef.current) return

    const cards = gridRef.current.querySelectorAll('.fleet-card')
    gsap.set(cards, { y: 40, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        })
      },
    })

    return () => trigger.kill()
  }, [activeCategory])

  useEffect(() => {
    if (filterRef.current && !initialMount.current) {
      const top = filterRef.current.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: 'smooth' })
    }
    initialMount.current = false
  }, [activeCategory])

  const openBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking'))
  }

  return (
    <main ref={pageRef} className="pt-20 bg-[#050505]">
      {/* Hero */}
      <section ref={heroRef} className="relative py-32 lg:py-48 px-6 lg:px-16 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0">
          <img
            src="/images/Cadillac escalade.png"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-[#050505]" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
          <p className="hero-anim font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
            Our Collection
          </p>
          <h1 className="hero-anim font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Premium Fleet
          </h1>
          <p className="hero-anim font-body text-[#A0A0A0] text-lg max-w-2xl mx-auto leading-relaxed">
            Every vehicle in our fleet is hand-selected, meticulously maintained,
            and equipped to deliver an unparalleled transportation experience.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section ref={filterRef} className="sticky top-20 z-30 bg-[#050505] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4">
          <div className="flex items-center gap-4 overflow-x-auto hide-scrollbar">
            <span className="font-body text-[#555555] text-xs uppercase tracking-wider whitespace-nowrap mr-2">
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-xs uppercase tracking-wider whitespace-nowrap px-4 py-2 border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-white/10 text-[#A0A0A0] hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section ref={gridRef} className="py-16 lg:py-24 px-6 lg:px-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filtered.map((vehicle) => (
              <div
                key={vehicle.id}
                className="fleet-card border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500 group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[0.98]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="glass-panel px-3 py-1.5 font-mono text-[#D4AF37] text-xs uppercase tracking-wider">
                      {vehicle.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1">
                    {Array.from({ length: vehicle.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-white text-xl lg:text-2xl mb-1">
                        {vehicle.name}
                      </h3>
                      <p className="font-body text-[#A0A0A0] text-sm">{vehicle.description}</p>
                    </div>
                    <span className="font-display text-[#D4AF37] text-lg whitespace-nowrap ml-4">
                      {vehicle.price}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {vehicle.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check size={12} className="text-[#D4AF37]" />
                        <span className="font-body text-[#A0A0A0] text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={openBooking}
                    className="w-full bg-white/5 border border-white/10 py-3 font-body text-sm uppercase tracking-[0.1em] text-white hover:bg-[#D4AF37] hover:text-[#050505] hover:border-[#D4AF37] transition-all duration-300"
                  >
                    Reserve This Vehicle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rate Match Guarantee + CTA */}
      <section className="py-24 px-6 lg:px-16 bg-[#111111] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-[#D4AF37]/30 px-4 py-2 mb-6">
            <span className="font-mono text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase">Best Rate Guarantee</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Found a Lower Rate? We&apos;ll Beat It.
          </h2>
          <p className="font-body text-[#A0A0A0] text-base max-w-lg mx-auto mb-2">
            Show us a valid quote from any licensed Orlando car service 
            and we&apos;ll match it — and take 5% off.
          </p>
          <p className="font-body text-[#555555] text-xs mb-8">
            Same vehicle. Same route. Less money.
          </p>
          <a
            href="tel:+14075161645"
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-display text-sm uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-colors duration-300"
          >
            <Phone size={18} />
            Call 407-516-1645
          </a>
        </div>
      </section>
    </main>
  )
}
