import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'
import { useSiteSettings } from '../lib/wp-context'

export default function Footer() {
  const { settings } = useSiteSettings()
  const openBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking'))
  }

  return (
    <footer className="bg-[#111111] border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={settings.siteLogo?.sourceUrl || '/images/logo.png'}
                alt="Orlando Blackline"
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="font-body text-[#A0A0A0] text-sm leading-relaxed max-w-md mb-6">
              {settings.footerDescription}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={`tel:${settings.phoneLink}`}
                className="flex items-center gap-2 font-mono text-[#D4AF37] text-sm tracking-wider hover:text-white transition-colors"
              >
                <Phone size={14} />
                {settings.phoneNumber}
              </a>
              <a
                href={`mailto:${settings.emailAddress}`}
                className="flex items-center gap-2 font-body text-[#A0A0A0] text-sm hover:text-white transition-colors"
              >
                <Mail size={14} />
                Email Us
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-white text-xs uppercase tracking-[0.15em] mb-6">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Our Fleet', path: '/fleet' },
                { label: 'Services', path: '/services' },
                { label: 'About Us', path: '/about' },
                { label: 'Book Now', action: true },
              ].map((link) =>
                link.action ? (
                  <button
                    key={link.label}
                    onClick={openBooking}
                    className="font-body text-[#A0A0A0] text-sm hover:text-[#D4AF37] transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path!}
                    className="font-body text-[#A0A0A0] text-sm hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-white text-xs uppercase tracking-[0.15em] mb-6">
              Services
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Disney World Transfers', path: '/disney-transfers' },
                { label: 'Port Canaveral Cruises', path: '/port-canaveral' },
                { label: 'MCO Airport', path: '/airport-mco' },
                { label: 'Universal Studios', path: '/services' },
                { label: 'Corporate Travel', path: '/services' },
                { label: 'Weddings & Events', path: '/services' },
                { label: 'Travel Agents', path: '/travel-agents' },
              ].map((service) => (
                <Link
                  key={service.label}
                  to={service.path}
                  className="font-body text-[#A0A0A0] text-sm hover:text-[#D4AF37] transition-colors duration-300"
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-[#555555] text-xs">
            &copy; {new Date().getFullYear()} Orlando Blackline Transportation. All Rights Reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <Link to="/policies" className="font-body text-[#555555] hover:text-[#D4AF37] transition-colors text-xs uppercase tracking-wider">
              Terms & Policies
            </Link>
            <span className="font-body text-[#555555] text-xs hidden md:inline">|</span>
            <span className="font-body text-[#555555] text-xs">
              Orlando, FL
            </span>
            <span className="font-body text-[#555555] text-xs hidden md:inline">|</span>
            <span className="font-body text-[#555555] text-xs">
              Serving Orlando &amp; Surrounding Areas
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
