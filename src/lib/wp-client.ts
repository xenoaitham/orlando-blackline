/**
 * WordPress GraphQL Client
 * Fetches content from a headless WordPress instance via WPGraphQL.
 * Falls back gracefully when WordPress is unavailable.
 */

const GRAPHQL_URL = import.meta.env.VITE_WORDPRESS_GRAPHQL_URL || 'http://localhost:8080/graphql'
const WP_ENABLED = import.meta.env.VITE_WORDPRESS_ENABLED === 'true'

// Simple in-memory cache to avoid re-fetching on every render
const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = 60_000 // 1 minute

async function fetchGraphQL<T = unknown>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
  if (!WP_ENABLED) return null

  const cacheKey = JSON.stringify({ query, variables })
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T
  }

  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      console.warn(`[WP] GraphQL request failed: ${response.status}`)
      return null
    }

    const json = await response.json()

    if (json.errors) {
      console.warn('[WP] GraphQL errors:', json.errors)
      return null
    }

    cache.set(cacheKey, { data: json.data, timestamp: Date.now() })
    return json.data as T
  } catch (err) {
    console.warn('[WP] Could not reach WordPress:', err)
    return null
  }
}

// Clear cache (useful after content updates)
export function clearWPCache() {
  cache.clear()
}

// ============================================================
// QUERIES
// ============================================================

export interface WPSiteSettings {
  phoneNumber: string
  phoneLink: string
  emailAddress: string
  footerDescription: string
  primaryColor: string
  backgroundColor: string
  secondaryBgColor: string
  textColor: string
  mutedTextColor: string
  contactAddress: string | null
  contactHours: string
  bookingUrl: string | null
  googleMapsEmbed: string | null
  siteLogo: { sourceUrl: string } | null
}

export async function getSiteSettings(): Promise<WPSiteSettings | null> {
  const data = await fetchGraphQL<{ siteOptions: WPSiteSettings }>(`
    query GetSiteSettings {
      siteOptions {
        phoneNumber
        phoneLink
        emailAddress
        footerDescription
        primaryColor
        backgroundColor
        secondaryBgColor
        textColor
        mutedTextColor
        contactAddress
        contactHours
        bookingUrl
        googleMapsEmbed
        siteLogo {
          sourceUrl
        }
      }
    }
  `)
  return data?.siteOptions ?? null
}

export interface WPHomePageData {
  heroTitleLine1: string
  heroTitleLine2: string
  heroRightLine1: string
  heroRightLine2: string
  heroSubtitle: string
  heroDescription: string
  featuresLabel: string
  featuresTitle: string
  features: Array<{ iconName: string; title: string; description: string }>
  destinationsLabel: string
  destinationsTitle: string
  destinationBullets: Array<{ text: string }>
  fleetLabel: string
  fleetTitle: string
  ctaLabel: string
  ctaTitle: string
  ctaDescription: string
  testimonialsLabel: string
  testimonialsTitle: string
}

export async function getHomePage(): Promise<WPHomePageData | null> {
  const data = await fetchGraphQL<{ page: { homePageContent: WPHomePageData } | null }>(`
    query GetHomePage {
      page(id: "home", idType: URI) {
        homePageContent {
          heroTitleLine1
          heroTitleLine2
          heroRightLine1
          heroRightLine2
          heroSubtitle
          heroDescription
          featuresLabel
          featuresTitle
          features {
            iconName
            title
            description
          }
          destinationsLabel
          destinationsTitle
          destinationBullets {
            text
          }
          fleetLabel
          fleetTitle
          ctaLabel
          ctaTitle
          ctaDescription
          testimonialsLabel
          testimonialsTitle
        }
      }
    }
  `)
  return data?.page?.homePageContent ?? null
}

export interface WPVehicle {
  title: string
  vehicleDetails: {
    vehicleType: string
    passengerCount: string
    bagCount: string
    vehicleImage: { sourceUrl: string } | null
    displayOrder: number
    vehicleCategory: string
    vehicleFeatures: Array<{ featureText: string }> | null
    vehicleDescription?: string
    vehiclePrice?: string
    vehicleRating?: number
  }
}

export async function getVehicles(): Promise<WPVehicle[]> {
  const data = await fetchGraphQL<{ vehicles: { nodes: WPVehicle[] } }>(`
    query GetVehicles {
      vehicles(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
        nodes {
          title
          vehicleDetails {
            vehicleType
            passengerCount
            bagCount
            vehicleImage {
              sourceUrl
            }
            displayOrder
            vehicleCategory
            vehicleFeatures {
              featureText
            }
          }
        }
      }
    }
  `)
  return data?.vehicles?.nodes ?? []
}

export interface WPService {
  title: string
  serviceDetails: {
    serviceSubtitle: string
    serviceDescription: string
    servicePrice: string
    serviceIcon: string
    serviceImage: { sourceUrl: string } | null
    serviceSlug: string
    displayOrder: number
    serviceFeatures: Array<{ featureText: string }> | null
  }
}

export async function getServices(): Promise<WPService[]> {
  const data = await fetchGraphQL<{ services: { nodes: WPService[] } }>(`
    query GetServices {
      services(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
        nodes {
          title
          serviceDetails {
            serviceSubtitle
            serviceDescription
            servicePrice
            serviceIcon
            serviceImage {
              sourceUrl
            }
            serviceSlug
            displayOrder
            serviceFeatures {
              featureText
            }
          }
        }
      }
    }
  `)
  return data?.services?.nodes ?? []
}

export interface WPTestimonial {
  title: string
  testimonialDetails: {
    quote: string
    authorName: string
    reviewSource: string
    rating: number
    displayOrder: number
  }
}

export async function getTestimonials(): Promise<WPTestimonial[]> {
  const data = await fetchGraphQL<{ testimonials: { nodes: WPTestimonial[] } }>(`
    query GetTestimonials {
      testimonials(first: 50) {
        nodes {
          title
          testimonialDetails {
            quote
            authorName
            reviewSource
            rating
            displayOrder
          }
        }
      }
    }
  `)
  return data?.testimonials?.nodes ?? []
}

export interface WPDestination {
  title: string
  destinationDetails: {
    destinationSubtitle: string
    destinationImage: { sourceUrl: string } | null
    displayOrder: number
  }
}

export async function getDestinations(): Promise<WPDestination[]> {
  const data = await fetchGraphQL<{ destinations: { nodes: WPDestination[] } }>(`
    query GetDestinations {
      destinations(first: 50) {
        nodes {
          title
          destinationDetails {
            destinationSubtitle
            destinationImage {
              sourceUrl
            }
            displayOrder
          }
        }
      }
    }
  `)
  return data?.destinations?.nodes ?? []
}

export interface WPStat {
  statDetails: {
    statValue: string
    statLabel: string
    displayOrder: number
  }
}

export async function getStats(): Promise<WPStat[]> {
  const data = await fetchGraphQL<{ stats: { nodes: WPStat[] } }>(`
    query GetStats {
      stats(first: 20) {
        nodes {
          statDetails {
            statValue
            statLabel
            displayOrder
          }
        }
      }
    }
  `)
  return data?.stats?.nodes ?? []
}

export interface WPPage {
  title: string
  content: string
  pageContent: {
    heroLabel: string
    heroTitle: string
    heroDescription: string
    heroImage: { sourceUrl: string } | null
    contentSections: Array<{
      sectionLabel: string
      sectionTitle: string
      sectionBody: string
      sectionImage: { sourceUrl: string } | null
    }> | null
  }
}

export async function getPage(slug: string): Promise<WPPage | null> {
  const data = await fetchGraphQL<{ page: WPPage | null }>(`
    query GetPage($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        content
        pageContent {
          heroLabel
          heroTitle
          heroDescription
          heroImage {
            sourceUrl
          }
          contentSections {
            sectionLabel
            sectionTitle
            sectionBody
            sectionImage {
              sourceUrl
            }
          }
        }
      }
    }
  `, { slug })
  return data?.page ?? null
}
