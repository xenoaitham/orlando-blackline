import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useSiteSettings } from '../lib/wp-context'

interface DropdownItem {
  label: string
  path: string
  description?: string
}

interface NavLink {
  label: string
  path?: string
  dropdown?: DropdownItem[]
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  {
    label: 'Fleet',
    path: '/fleet',
    dropdown: [
      { label: 'SUVs', path: '/fleet?category=SUV', description: 'Escalade, Suburban & Expedition' },
      { label: 'Executive Vans', path: '/fleet?category=Van', description: 'Sprinter & Transit' },
      { label: 'Luxury Sedans', path: '/fleet?category=Sedan', description: 'S Class & Model 3' },
      { label: 'View All Vehicles', path: '/fleet', description: 'Complete fleet overview' },
    ],
  },
  {
    label: 'Services',
    path: '/services',
    dropdown: [
      { label: 'Theme Park Transfers', path: '/theme-parks', description: 'Disney, Universal, Sea World, Lego Land' },
      { label: 'Port Canaveral Cruises', path: '/port-canaveral', description: 'Terminal transfers' },
      { label: 'Airport Transportation', path: '/airport-mco', description: 'MCO & Sanford' },
      { label: 'Corporate Travel', path: '/corporate-travel', description: 'Business class' },
      { label: 'Weddings & Events', path: '/weddings-events', description: 'Special occasions' },
      { label: 'Travel Agents', path: '/travel-agents', description: 'Partner resources' },
      { label: 'By the Hour', path: '/services#hourly', description: 'Hourly car service' },
    ],
  },
  {
    label: 'About',
    dropdown: [
      { label: 'Our Story', path: '/about', description: 'Since 2016' },
      { label: 'Contact Us', path: '/contact', description: 'Get in touch' },
    ],
  },
]


export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()
  const { settings } = useSiteSettings()

  const isHomePage = location.pathname === '/'

  useEffect(() => {
    if (!isHomePage) {
      // On non-home pages, navbar is always opaque
      setScrolled(true)
      return
    }
    // On home page: transparent during the 300vh hero, opaque after
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 2.8)
    }
    // Reset to transparent when entering home page at the top
    setScrolled(window.scrollY > window.innerHeight * 2.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHomePage])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    setActiveDropdown(null)
  }, [location.pathname])

  const openBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking'))
  }

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex flex-col ${
          scrolled
            ? 'bg-[#050505] border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full bg-[#D4AF37] text-[#050505] text-center py-1.5 px-4 font-mono text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold border-b border-[#050505]/10">
          Fully Licensed & Insured Transportation Service
        </div>
        <div className="max-w-[1600px] w-full mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-24 px-6 max-w-[1600px] mx-auto">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3">
                <img
                  src={settings.siteLogo?.sourceUrl || '/images/logo.png'}
                  alt="Orlando Blackline"
                  className="h-16 sm:h-20 w-auto brightness-0 invert"
                />
              </Link>
              
              {/* Desktop Links */}
              <div className="hidden lg:flex items-center gap-6">
                {NAV_LINKS.map((link) =>
                  link.dropdown ? (
                      <div 
                      key={link.label} 
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(link.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        to={link.path || '#'}
                        className="group relative px-5 py-2 overflow-hidden rounded-full font-display font-semibold text-sm text-white flex items-center gap-1"
                      >
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-md translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full"></div>
                        <div className="relative overflow-hidden flex items-center gap-1">
                          <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                            {link.label}
                          </span>
                          <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
                            {link.label}
                          </span>
                          <ChevronDown size={12} className={`transition-transform duration-200 z-10 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                        </div>
                      </Link>

                      {activeDropdown === link.label && (
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                          onMouseEnter={() => handleMouseEnter(link.label)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 shadow-2xl min-w-[220px] rounded-2xl overflow-hidden p-2">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => setActiveDropdown(null)}
                                className="block px-5 py-3.5 hover:bg-white/10 rounded-xl transition-colors duration-200 group/item"
                              >
                                <span className="block font-display text-white text-sm group-hover/item:text-white transition-colors duration-200">
                                  {item.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.path}
                      to={link.path!}
                      className="group relative px-5 py-2 overflow-hidden rounded-full font-display font-semibold text-sm text-white"
                    >
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-md translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full"></div>
                      <div className="relative overflow-hidden h-5 block">
                         <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">{link.label}</span>
                         <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">{link.label}</span>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Right Side: Contact Info */}
            <div className="hidden lg:flex items-center gap-4">
              <a href={`tel:${settings.phoneLink}`} className="group relative px-4 py-2 overflow-hidden rounded-full font-display font-semibold text-sm text-[#D4AF37]">
                <div className="absolute inset-0 bg-[#D4AF37]/10 backdrop-blur-md translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full"></div>
                <div className="relative overflow-hidden h-5 block">
                   <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">+1 {settings.phoneNumber}</span>
                   <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">+1 {settings.phoneNumber}</span>
                </div>
              </a>
              <button 
                onClick={openBooking}
                className="bg-[#D4AF37] text-[#050505] px-6 py-2.5 rounded-full font-body text-sm uppercase tracking-[0.1em] font-semibold hover:bg-white transition-colors duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              >
                Book A Ride
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-start sm:justify-center min-h-full pt-24 pb-12 gap-6 sm:gap-8 px-6 overflow-y-auto">
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="text-center">
                <span className="block font-display text-2xl tracking-wider text-[#D4AF37] mb-4">
                  {link.label}
                </span>
                <div className="flex flex-col gap-3">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className="font-body text-white/70 hover:text-[#D4AF37] text-sm tracking-wide transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path!}
                className={`font-display text-2xl tracking-wider transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-[#D4AF37]'
                    : 'text-white hover:text-[#D4AF37]'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <button
            onClick={() => {
              openBooking()
              setMobileOpen(false)
            }}
            className="mt-4 bg-white text-[#050505] px-8 py-3 font-body text-sm uppercase tracking-[0.1em] font-semibold"
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  )
}
