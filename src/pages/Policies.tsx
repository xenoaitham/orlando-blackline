import { useEffect } from 'react'

export default function Policies() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="pt-32 pb-24 px-6 lg:px-16 min-h-screen bg-[#050505]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
            Terms & Conditions
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white">Policies</h1>
        </div>
        
        <div className="space-y-16">
          {/* Cancellation Policy */}
          <section>
            <h2 className="font-display text-2xl text-white mb-6 border-b border-white/10 pb-4">Cancellation Policy</h2>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span className="text-[#D4AF37] mt-1">—</span>
                <p className="font-body text-[#A0A0A0] text-base leading-relaxed">
                  Cancellations made more than 24 hours before the scheduled pickup time will not incur a cancellation charge.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="text-[#D4AF37] mt-1">—</span>
                <p className="font-body text-[#A0A0A0] text-base leading-relaxed">
                  Cancellations made between 12 and 24 hours before pickup will be charged 50% of the total reservation amount.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="text-[#D4AF37] mt-1">—</span>
                <p className="font-body text-[#A0A0A0] text-base leading-relaxed">
                  Cancellations made less than 12 hours before pickup will be charged 100% of the total reservation amount.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="text-[#D4AF37] mt-1">—</span>
                <p className="font-body text-[#A0A0A0] text-base leading-relaxed">
                  All cancellations and reservation changes must be submitted by email and are not effective until confirmed in writing by Orlando Blackline Transportation.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="text-[#D4AF37] mt-1">—</span>
                <p className="font-body text-[#A0A0A0] text-base leading-relaxed">
                  All cancellation requests must be submitted in writing by email to:{' '}
                  <a href="mailto:info@orlandoblacklinetransportation.com" className="text-white hover:text-[#D4AF37] transition-colors">
                    info@orlandoblacklinetransportation.com
                  </a>
                </p>
              </li>
            </ul>
          </section>

          {/* No-Show Policy */}
          <section>
            <h2 className="font-display text-2xl text-white mb-6 border-b border-white/10 pb-4">No-Show Policy</h2>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span className="text-[#D4AF37] mt-1">—</span>
                <p className="font-body text-[#A0A0A0] text-base leading-relaxed">
                  All no-shows will be charged 100% of the total reservation amount.
                </p>
              </li>
            </ul>
            <div className="mt-6 bg-[#111111] border border-white/10 p-6 rounded-sm">
              <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">
                A passenger will be considered a no-show if the passenger cannot be located or contacted within 15 minutes after the scheduled pickup time for a standard pickup, or within 60 minutes after the actual flight arrival time for an airport pickup.
              </p>
            </div>
          </section>

          {/* Extra Stops */}
          <section>
            <h2 className="font-display text-2xl text-white mb-6 border-b border-white/10 pb-4">Extra Stops</h2>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span className="text-[#D4AF37] mt-1">—</span>
                <p className="font-body text-[#A0A0A0] text-base leading-relaxed">
                  Extra “in-route stop” will result in a $35 additional charge up to 30 minutes.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="text-[#D4AF37] mt-1">—</span>
                <p className="font-body text-[#A0A0A0] text-base leading-relaxed">
                  If the stop lasts more than 30 minutes or there is more than one stop or the requested stop is “off-route”, then the trip will convert to an hourly rate with a minimum of 3 hours.
                </p>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
