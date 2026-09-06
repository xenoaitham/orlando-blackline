import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useSiteSettings } from '../lib/wp-context'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

export default function Contact() {
  const { settings } = useSiteSettings()
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [searchParams] = useSearchParams()
  const isSuccess = searchParams.get('success') === 'true'
  const nextUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?success=true` : ''

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
    if (!contentRef.current) return
    gsap.fromTo(
      contentRef.current.querySelectorAll('.content-anim'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.3 }
    )
  }, [])

  return (
    <main className="pt-20 bg-[#050505]">
      {/* Hero */}
      <section ref={heroRef} className="relative py-32 lg:py-48 px-6 lg:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/dest-magic-kingdom.jpg"
            alt="Orlando Contact"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-[#050505]" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
          <p className="hero-anim font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
            Get In Touch
          </p>
          <h1 className="hero-anim font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Contact Us
          </h1>
          <p className="hero-anim font-body text-[#A0A0A0] text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you have a question about our fleet, need a custom quote, 
            or want to arrange transportation for a special event, we are here for you 24/7.
          </p>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="py-16 lg:py-24 px-6 lg:px-16 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="content-anim">
                <h2 className="font-display text-3xl md:text-4xl text-white mb-6">
                  We're Here to Help
                </h2>
                <p className="font-body text-[#A0A0A0] text-base leading-relaxed mb-8">
                  Our concierge team is available around the clock to assist you with 
                  reservations, modifications, or any special requests to make your 
                  journey perfect.
                </p>
              </div>

              <div className="content-anim grid grid-cols-1 gap-6">
                <div className="border border-white/10 p-6 lg:p-8 hover:border-[#D4AF37]/30 transition-all duration-300 group bg-[#111111]">
                  <Phone size={24} className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <p className="font-display text-white text-xl mb-2">Phone</p>
                  <a href={`tel:${settings.phoneLink || '+14075161645'}`} className="inline-block px-4 py-2 mt-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-md font-body text-sm hover:bg-[#D4AF37] hover:text-[#050505] transition-colors">
                    {settings.phoneNumber || '407-516-1645'}
                  </a>
                </div>

                <div className="border border-white/10 p-6 lg:p-8 hover:border-[#D4AF37]/30 transition-all duration-300 group bg-[#111111]">
                  <Mail size={24} className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <p className="font-display text-white text-xl mb-2">Email</p>
                  <a href={`mailto:${settings.emailAddress || 'info@orlandoblacklinetransportation.com'}`} className="font-body text-[#A0A0A0] text-[13px] sm:text-sm hover:text-[#D4AF37] transition-colors">
                    {settings.emailAddress || 'info@orlandoblacklinetransportation.com'}
                  </a>
                </div>

                <div className="border border-white/10 p-6 lg:p-8 hover:border-[#D4AF37]/30 transition-all duration-300 group bg-[#111111]">
                  <MapPin size={24} className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <p className="font-display text-white text-xl mb-2">Headquarters</p>
                  <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">
                    Orlando, FL<br />
                    Serving Central Florida
                  </p>
                </div>

                <div className="border border-white/10 p-6 lg:p-8 hover:border-[#D4AF37]/30 transition-all duration-300 group bg-[#111111]">
                  <Clock size={24} className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <p className="font-display text-white text-xl mb-2">Hours</p>
                  <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">
                    Dispatch: 24/7/365<br />
                    Office: 9AM - 6PM EST
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="content-anim">
              {isSuccess ? (
                <div className="bg-[#111111] border border-white/10 p-12 text-center flex flex-col items-center">
                  <CheckCircle2 size={48} className="text-[#D4AF37] mb-6" />
                  <h3 className="font-display text-2xl text-white mb-4">Message Sent</h3>
                  <p className="font-body text-[#A0A0A0] text-sm max-w-md mx-auto">
                    Thank you for reaching out. We have received your message and will get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <div className="bg-[#111111] border border-white/10 p-8 md:p-12">
                  <h3 className="font-display text-2xl text-white mb-8">Send Us a Message</h3>
                  <form action="https://formsubmit.co/info@orlandoblacklinetransportation.com" method="POST" className="space-y-6">
                    {/* Formsubmit config */}
                    <input type="hidden" name="_subject" value="🌟 New Message from Contact Page" />
                    <input type="hidden" name="_template" value="box" />
                    {nextUrl && <input type="hidden" name="_next" value={nextUrl} />}
                    
                    {/* Honeypot for spam prevention */}
                    <input type="text" name="_honey" style={{ display: 'none' }} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-body text-white/50 text-xs uppercase tracking-wider">First Name</label>
                        <input 
                          type="text" 
                          name="First Name"
                          required
                          className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-body focus:outline-none focus:border-[#D4AF37] transition-colors"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-body text-white/50 text-xs uppercase tracking-wider">Last Name</label>
                        <input 
                          type="text" 
                          name="Last Name"
                          required
                          className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-body focus:outline-none focus:border-[#D4AF37] transition-colors"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-body text-white/50 text-xs uppercase tracking-wider">Email Address</label>
                        <input 
                          type="email" 
                          name="Email"
                          required
                          className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-body focus:outline-none focus:border-[#D4AF37] transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-body text-white/50 text-xs uppercase tracking-wider">Phone Number</label>
                        <input 
                          type="tel" 
                          name="Phone"
                          required
                          className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-body focus:outline-none focus:border-[#D4AF37] transition-colors"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <label className="font-body text-white/50 text-xs uppercase tracking-wider">Your Message</label>
                      <textarea 
                        name="Message"
                        required
                        rows={4}
                        className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-body focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full mt-8 bg-[#D4AF37] text-[#050505] px-8 py-4 font-body text-sm uppercase tracking-[0.1em] font-semibold hover:bg-white transition-colors duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
