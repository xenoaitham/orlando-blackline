import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { WordPressProvider } from './lib/wp-context'
import Navigation from './components/Navigation'
import BookingPanel from './components/BookingPanel'
import ContactDock from './components/ContactDock'
import Footer from './components/Footer'
import Home from './pages/Home'
import Fleet from './pages/Fleet'
import Services from './pages/Services'
import About from './pages/About'
import ThemeParks from './pages/ThemeParks'
import PortCanaveral from './pages/PortCanaveral'
import AirportMCO from './pages/AirportMCO'
import TravelAgents from './pages/TravelAgents'
import Contact from './pages/Contact'
import CorporateTravel from './pages/CorporateTravel'
import WeddingsEvents from './pages/WeddingsEvents'
import AgentApplication from './pages/AgentApplication'
import Policies from './pages/Policies'

function AppContent() {
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()

  useEffect(() => {
    // Only initialize Lenis if we are on a non-touch device (desktop)
    // On mobile, native scrolling is perfectly tied to the thumb and changing directions doesn't lag.
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
    if (isTouch) return

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navigation />
      <BookingPanel />
      <Routes>
        <Route path="/" element={<Home lenis={lenisRef.current} />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/theme-parks" element={<ThemeParks />} />
        <Route path="/port-canaveral" element={<PortCanaveral />} />
        <Route path="/airport-mco" element={<AirportMCO />} />
        <Route path="/travel-agents" element={<TravelAgents />} />
        <Route path="/agent-application" element={<AgentApplication />} />
        <Route path="/corporate-travel" element={<CorporateTravel />} />
        <Route path="/weddings-events" element={<WeddingsEvents />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policies" element={<Policies />} />
      </Routes>
      <ContactDock />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <WordPressProvider>
      <AppContent />
    </WordPressProvider>
  )
}

export default App
