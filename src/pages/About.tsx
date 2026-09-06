import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Award, Clock, Heart, ChevronRight, Star } from 'lucide-react'


gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Every vehicle undergoes rigorous daily inspections. Our chauffeurs are background-checked, drug-tested, and trained to the highest safety standards.',
  },
  {
    icon: Award,
    title: 'Uncompromising Quality',
    description: 'We maintain a fleet of late-model luxury vehicles, each cleaned and detailed before every ride. Nothing less than perfection leaves our garage.',
  },
  {
    icon: Clock,
    title: 'Reliability Guaranteed',
    description: 'On-time, every time. We track flights, monitor traffic, and build in buffer time so you never have to worry about being late.',
  },
  {
    icon: Heart,
    title: 'Genuine Care',
    description: 'We treat every guest like family. To ensure you feel perfectly at home, our professional chauffeurs are fluent in English, Spanish, Portuguese, Russian, Romanian, Arabic, French, and Greek.',
  },
]

const team = [
  {
    name: 'Ashraf El Dali',
    role: 'Founder, CEO & Operations Manager',
    bio: 'Ashraf founded Orlando Blackline with a commitment to redefining luxury travel. His meticulous attention to detail ensures every client experiences the highest standard of service.',
    initial: 'AD',
    image: '',
  },
  {
    name: 'Jeanine Bakry',
    role: 'Scheduling Manager',
    bio: 'Jeanine orchestrates our fleet and chauffeurs with precision, ensuring every pickup is perfectly timed and every itinerary goes flawlessly.',
    initial: 'JB',
    image: '/images/team-jeanine.png',
  },
  {
    name: 'Hatem El Dali',
    role: 'Financial Controller',
    bio: 'Hatem oversees our financial operations, ensuring the company\'s sustained growth and ability to continuously invest in our premium fleet.',
    initial: 'HD',
    image: '/images/team-hatem.png',
  },
]

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const milestonesRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

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
    if (!storyRef.current) return
    const trigger = ScrollTrigger.create({
      trigger: storyRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          storyRef.current!.querySelectorAll('.story-anim'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
        )
      },
    })
    return () => trigger.kill()
  }, [])

  useEffect(() => {
    if (!valuesRef.current) return
    const trigger = ScrollTrigger.create({
      trigger: valuesRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          valuesRef.current!.querySelectorAll('.value-card'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12 }
        )
      },
    })
    return () => trigger.kill()
  }, [])

  useEffect(() => {
    if (!milestonesRef.current) return
    const trigger = ScrollTrigger.create({
      trigger: milestonesRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          milestonesRef.current!.querySelectorAll('.milestone-item'),
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 }
        )
      },
    })
    return () => trigger.kill()
  }, [])

  useEffect(() => {
    if (!teamRef.current) return
    const trigger = ScrollTrigger.create({
      trigger: teamRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          teamRef.current!.querySelectorAll('.team-card'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15 }
        )
      },
    })
    return () => trigger.kill()
  }, [])

  const openBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking'))
  }

  return (
    <main className="pt-20">
      {/* Hero */}
      <section ref={heroRef} className="relative py-32 lg:py-48 px-6 lg:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/fleet-suv-interior.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-[#050505]" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <p className="hero-anim font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
                About Us
              </p>
              <h1 className="hero-anim font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                The Blackline<br />Standard
              </h1>
            </div>
            <div>
              <p className="hero-anim font-body text-[#A0A0A0] text-lg leading-relaxed">
                Orlando Blackline offers full-service chauffeured transportation, 
                setting the benchmark for luxury ground travel across Florida and 
                Central Florida. We don&apos;t just drive—we craft experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="py-24 lg:py-32 px-6 lg:px-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="story-anim overflow-hidden mb-8">
                <img
                  src="/images/about-us.jpg"
                  alt="Sleek black luxury car driving in sunny Florida"
                  className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="story-anim grid grid-cols-3 gap-4">
                <div className="text-center border border-white/10 p-4">
                  <p className="font-display text-2xl text-[#D4AF37]">10+</p>
                  <p className="font-body text-[#555555] text-xs uppercase tracking-wider">Years</p>
                </div>
                <div className="text-center border border-white/10 p-4">
                  <p className="font-display text-2xl text-[#D4AF37]">10K+</p>
                  <p className="font-body text-[#555555] text-xs uppercase tracking-wider">Rides</p>
                </div>
                <div className="text-center border border-white/10 p-4">
                  <p className="font-display text-2xl text-[#D4AF37]">99%</p>
                  <p className="font-body text-[#555555] text-xs uppercase tracking-wider">Satisfaction</p>
                </div>
              </div>
            </div>
            <div>
              <p className="story-anim font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
                Our Story
              </p>
              <h2 className="story-anim font-display text-3xl md:text-4xl text-white mb-6">
                Born from a Vision<br />of Excellence
              </h2>
              <div className="story-anim space-y-4 mb-8">
                <p className="font-body text-[#A0A0A0] text-base leading-relaxed">
                  Orlando Blackline Transportation was founded by Ashraf El Dali in 2016 with a single Ford Expedition SUV and a clear, ambitious mission: to elevate Orlando's black car industry into a true luxury experience. Serving Central Florida—and specifically Orlando, the theme park capital of the world—Ashraf recognized that travelers deserved a seamless, stress-free journey from the moment they landed in Orlando.
                </p>
                <p className="font-body text-[#A0A0A0] text-base leading-relaxed">
                  Over the years, our signature fleet has expanded significantly to accommodate the growing and diverse needs of our clientele. To maintain this premium standard at scale, we have selectively grown our network to include dedicated partner drivers who share our exact vision of uncompromising hospitality and excellence.
                </p>
                <p className="font-body text-[#A0A0A0] text-base leading-relaxed">
                  At Orlando Blackline, we do not just focus on the ride; we focus on the relationship. Our commitment to 100% customer satisfaction drives us to build lasting bonds with our clients that span years. We aim to deliver a flawless, memorable experience every single time, ensuring that the Orlando Blackline name becomes an essential, trusted part of every Orlando vacation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-24 lg:py-32 px-6 lg:px-16 bg-[#111111] border-y border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
              Our Principles
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div
                key={i}
                className="value-card border border-white/10 p-8 hover:border-[#D4AF37]/30 transition-all duration-500 group"
              >
                <value.icon
                  size={32}
                  className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="font-display text-white text-xl mb-4">{value.title}</h3>
                <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-24 lg:py-32 px-6 lg:px-16 bg-[#111111] border-y border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
              Leadership
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              Meet Our Team
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="team-card border border-white/10 p-8 hover:border-[#D4AF37]/30 transition-all duration-500 text-center"
              >
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 object-cover border border-[#D4AF37]" 
                  />
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 border border-[#D4AF37] flex items-center justify-center">
                    <span className="font-mono text-[#D4AF37] text-3xl font-medium">
                      {member.initial}
                    </span>
                  </div>
                )}
                <h3 className="font-display text-white text-xl mb-1">{member.name}</h3>
                <p className="font-mono text-[#D4AF37] text-xs tracking-[0.15em] uppercase mb-4">
                  {member.role}
                </p>
                <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-20 px-6 lg:px-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Completed Transfers' },
              { value: '10+', label: 'Years of Experience' },
              { value: '24/7', label: 'Customer Support' },
              { 
                value: (
                  <div className="flex gap-1 justify-center items-center h-[40px] md:h-[48px]">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="text-[#D4AF37] fill-[#D4AF37] h-8 w-8 md:h-10 md:w-10" />
                    ))}
                  </div>
                ), 
                label: 'Average Rating' 
              },
            ].map((stat, i) => (
              <div key={i} className="text-center border border-white/10 py-10">
                <div className="font-display text-4xl md:text-5xl text-[#D4AF37] mb-2">{stat.value}</div>
                <p className="font-body text-[#A0A0A0] text-xs uppercase tracking-[0.15em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-16 bg-[#050505] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Experience the Blackline Difference
          </h2>
          <p className="font-body text-[#A0A0A0] text-base max-w-lg mx-auto mb-8">
            Join the thousands of travelers who trust Orlando Blackline
            for their Disney World transportation. Your magical ride awaits.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/fleet"
              className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 font-body text-sm uppercase tracking-[0.1em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
            >
              View Fleet <ChevronRight size={16} />
            </Link>
            <button
              onClick={openBooking}
              className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#050505] px-8 py-4 font-body text-sm uppercase tracking-[0.1em] font-semibold hover:bg-white transition-colors duration-300"
            >
              Book Your Ride
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
