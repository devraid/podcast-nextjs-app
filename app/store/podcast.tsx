'use client'
/**
 * @author Miguel Chumillas.
 * @description Podcast context store with API integration.
 */

/** Dependencies. */
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'

/** Podcast Interface (simplified from JSON structure). */
interface Podcast {
  id: string
  title: string
  author: string
  imageUrl: string
  summary: string
  link: string
}

/** PodcastContextType Interface. */
interface PodcastContextType {
  podcasts: Podcast[]
  setPodcasts: React.Dispatch<React.SetStateAction<Podcast[]>>
}

/** PodcastContext Initial State. */
const PodcastContext = createContext<PodcastContextType | undefined>(undefined)

/** Export PodcastProvider with API integration. */
export const PodcastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        // Transform the API response to match the Podcast interface
        const formattedPodcasts = data.feed.entry.map((entry: any) => ({
          id: entry.id.attributes['im:id'],
          title: entry['im:name'].label,
          author: entry['im:artist'].label,
          imageUrl: entry['im:image'].find((img: any) => img.attributes.height === '170')?.label || '',
          summary: entry.summary.label,
          link: entry.link.attributes.href,
        }))

        setPodcasts(formattedPodcasts)
      } catch (error) {
        console.error('Failed to fetch podcasts:', error)
      }
    }

    fetchPodcasts()
  }, []) // Runs only on component mount

  return <PodcastContext.Provider value={{ podcasts, setPodcasts }}>{children}</PodcastContext.Provider>
}

/** Custom hook for context. */
export const usePodcastContext = (): PodcastContextType => {
  const context = useContext(PodcastContext)
  if (!context) {
    throw new Error('usePodcastContext must be used within a PodcastProvider')
  }
  return context
}
