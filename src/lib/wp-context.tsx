import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getSiteSettings, type WPSiteSettings } from './wp-client'

// Default values matching the current hardcoded site design
const DEFAULT_SETTINGS: WPSiteSettings = {
  phoneNumber: '407-516-1645',
  phoneLink: '+14075161645',
  emailAddress: 'info@orlandoblacklinetransportation.com',
  footerDescription: "Luxury chauffeured black car service proudly serving Central Florida since 2016. We provide professional, reliable, and personalized transportation to Orlando’s premier destinations, including Walt Disney World, Universal Orlando theme parks, resorts, Orlando International Airport (MCO), SFB airport and other destinations throughout Central Florida.",
  primaryColor: '#D4AF37',
  backgroundColor: '#050505',
  secondaryBgColor: '#111111',
  textColor: '#FFFFFF',
  mutedTextColor: '#A0A0A0',
  contactAddress: null,
  contactHours: '24/7 — 365 Days a Year',
  bookingUrl: null,
  googleMapsEmbed: null,
  siteLogo: null,
}

interface WordPressContextValue {
  settings: WPSiteSettings
  isLoading: boolean
  isConnected: boolean
}

const WordPressContext = createContext<WordPressContextValue>({
  settings: DEFAULT_SETTINGS,
  isLoading: true,
  isConnected: false,
})

export function WordPressProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<WPSiteSettings>(DEFAULT_SETTINGS)
  const [isLoading, setIsLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadSettings() {
      try {
        const wpSettings = await getSiteSettings()
        if (!cancelled && wpSettings) {
          setSettings(wpSettings)
          setIsConnected(true)
        }
      } catch {
        // WordPress not available, use defaults
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    loadSettings()
    return () => { cancelled = true }
  }, [])

  // Apply dynamic CSS custom properties from WordPress colors
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', settings.primaryColor)
    root.style.setProperty('--color-bg', settings.backgroundColor)
    root.style.setProperty('--color-bg-secondary', settings.secondaryBgColor)
    root.style.setProperty('--color-text', settings.textColor)
    root.style.setProperty('--color-text-muted', settings.mutedTextColor)
  }, [settings])

  return (
    <WordPressContext.Provider value={{ settings, isLoading, isConnected }}>
      {children}
    </WordPressContext.Provider>
  )
}

export function useSiteSettings() {
  return useContext(WordPressContext)
}

export { DEFAULT_SETTINGS }
