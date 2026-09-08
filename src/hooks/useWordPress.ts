import { useState, useEffect } from 'react'
import {
  getHomePage, getVehicles, getServices, getTestimonials,
  getDestinations, getStats, getPage,
  type WPHomePageData, type WPVehicle, type WPService,
  type WPTestimonial, type WPDestination, type WPStat, type WPPage,
} from '../lib/wp-client'

interface UseWPResult<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}

function useWPQuery<T>(fetcher: () => Promise<T | null>): UseWPResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const result = await fetcher()
        if (!cancelled) {
          setData(result)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch')
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, isLoading, error }
}

export function useHomePage(): UseWPResult<WPHomePageData> {
  return useWPQuery(getHomePage)
}

export function useVehicles(): UseWPResult<WPVehicle[]> {
  return useWPQuery(getVehicles)
}

export function useServices(): UseWPResult<WPService[]> {
  return useWPQuery(getServices)
}

export function useTestimonials(): UseWPResult<WPTestimonial[]> {
  return useWPQuery(getTestimonials)
}

export function useDestinations(): UseWPResult<WPDestination[]> {
  return useWPQuery(getDestinations)
}

export function useStats(): UseWPResult<WPStat[]> {
  return useWPQuery(getStats)
}

export function useWPPage(slug: string): UseWPResult<WPPage> {
  return useWPQuery(() => getPage(slug))
}
