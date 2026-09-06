import { useState, useEffect } from 'react'
import { Briefcase, Building, Mail, ChevronRight, User, Hash, CheckCircle2 } from 'lucide-react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useSearchParams } from 'react-router-dom'

export default function AgentApplication() {
  const [phone, setPhone] = useState('')
  const [searchParams] = useSearchParams()
  const isSuccess = searchParams.get('success') === 'true'
  const [nextUrl, setNextUrl] = useState('')

  useEffect(() => {
    setNextUrl(window.location.origin + window.location.pathname + '?success=true')
  }, [])

  return (
    <main className="pt-32 pb-24 px-6 lg:px-16 min-h-screen bg-[#050505]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <img 
            src="/images/travel-agencies.png" 
            alt="Partner Travel Agency" 
            className="mx-auto h-28 mb-6 object-contain grayscale invert mix-blend-screen opacity-80" 
          />
          <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">Partner Travel Agency</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Travel Agencies</h1>
          <p className="font-body text-[#A0A0A0] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Generate Additional Revenue based on a simple commission-based structure without the Hassle and the need to manage day-to-day operations. Elevate your client experience & loyalty with our High-end luxury fleet, Signature Meet & Greet service and exceptional service quality that enhance your clients satisfaction and reflect your commitment to exceptional service
          </p>
        </div>

        {isSuccess ? (
          <div className="bg-[#111] border border-white/10 p-12 text-center flex flex-col items-center">
            <CheckCircle2 size={48} className="text-[#D4AF37] mb-6" />
            <h2 className="font-display text-3xl text-white mb-4">Application Received</h2>
            <p className="font-body text-[#A0A0A0] text-sm max-w-md mx-auto">
              Thank you for applying. Our partnership team will review your details and contact you within 24-48 business hours with your agent credentials.
            </p>
          </div>
        ) : (
          <form action="https://formsubmit.co/info@orlandoblacklinetransportation.com" method="POST" className="bg-[#111] border border-white/10 p-8 md:p-12 shadow-2xl">
            {/* Formsubmit config */}
            <input type="hidden" name="_subject" value="🌟 New Travel Agent Partnership Application" />
            <input type="hidden" name="_template" value="box" />
            {nextUrl && <input type="hidden" name="_next" value={nextUrl} />}
            
            {/* Honeypot for spam prevention */}
            <input type="text" name="_honey" style={{ display: 'none' }} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Agency Info */}
              <div className="space-y-6 md:col-span-2">
                <h3 className="font-display text-xl text-white border-b border-white/10 pb-4">Agency Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body text-[#A0A0A0] text-xs uppercase tracking-wider mb-2">Agency Name *</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" size={18} />
                      <input name="Agency Name" required type="text" className="w-full bg-black/50 border border-white/10 text-white font-body text-sm pl-12 pr-4 py-3 focus:border-[#D4AF37] outline-none transition-colors" placeholder="e.g. Elite Travel Group" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-[#A0A0A0] text-xs uppercase tracking-wider mb-2">IATA / CLIA / ARC Number</label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" size={18} />
                      <input name="Agency ID Number" type="text" className="w-full bg-black/50 border border-white/10 text-white font-body text-sm pl-12 pr-4 py-3 focus:border-[#D4AF37] outline-none transition-colors" placeholder="Optional" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6 md:col-span-2">
                <h3 className="font-display text-xl text-white border-b border-white/10 pb-4">Contact Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body text-[#A0A0A0] text-xs uppercase tracking-wider mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" size={18} />
                      <input name="Full Name" required type="text" className="w-full bg-black/50 border border-white/10 text-white font-body text-sm pl-12 pr-4 py-3 focus:border-[#D4AF37] outline-none transition-colors" placeholder="John Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-[#A0A0A0] text-xs uppercase tracking-wider mb-2">Title</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" size={18} />
                      <input name="Job Title" type="text" className="w-full bg-black/50 border border-white/10 text-white font-body text-sm pl-12 pr-4 py-3 focus:border-[#D4AF37] outline-none transition-colors" placeholder="Travel Advisor" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-[#A0A0A0] text-xs uppercase tracking-wider mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" size={18} />
                      <input name="Email" required type="email" className="w-full bg-black/50 border border-white/10 text-white font-body text-sm pl-12 pr-4 py-3 focus:border-[#D4AF37] outline-none transition-colors" placeholder="john@elitetravel.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-[#A0A0A0] text-xs uppercase tracking-wider mb-2">Phone Number *</label>
                    <div className="relative">
                      <PhoneInput
                        country={'us'}
                        value={phone}
                        onChange={setPhone}
                        inputProps={{
                          name: 'Phone',
                          required: true,
                        }}
                        containerClass="w-full"
                        inputStyle={{ width: '100%', background: 'rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '0', padding: '12px 16px 12px 48px', fontSize: '14px', height: '46px' }}
                        buttonStyle={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '0' }}
                        dropdownStyle={{ background: '#111', color: 'white' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-center">
              <button type="submit" className="bg-white text-black px-8 py-4 font-body text-sm uppercase tracking-wider font-bold hover:bg-[#D4AF37] transition-colors flex items-center gap-3 mx-auto w-full md:w-auto justify-center">
                Submit Application <ChevronRight size={18} />
              </button>
              <p className="font-body text-[#555] text-xs mt-4">
                By submitting, you agree to our partner terms and conditions.
              </p>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
