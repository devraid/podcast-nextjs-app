'use client'
/**
 * @author Miguel Chumillas.
 * @description Podcast Detail context store.
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

/** PodcastDetailContextType Interface. */
interface PodcastDetailContextType {
  podcast: Podcast | null
  setPodcast: React.Dispatch<React.SetStateAction<Podcast | null>>
}

/** PodcastDetailContext Initial State. */
const PodcastDetailContext = createContext<PodcastDetailContextType | undefined>(undefined)

/** Export PodcastDetailProvider for managing podcast data. */
export const PodcastDetailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [podcast, setPodcast] = useState<Podcast | null>(null)

  useEffect(() => {
    // Fetch podcast data based on the 'id' passed
    const fetchPodcastDetail = async (id: string) => {
      try {
        const response = await fetch(` https://itunes.apple.com/lookup?id=${id}&media=podcast
 &entity=podcastEpisode&limit=20`)
        const data = await response.json()

        if (data.results && data.results[0]) {
          const podcastData = data.results[0]
          const formattedPodcast = {
            id: podcastData.collectionId,
            title: podcastData.collectionName,
            author: podcastData.artistName,
            imageUrl: podcastData.artworkUrl100,
            summary: podcastData.collectionCensoredName,
            link: podcastData.collectionViewUrl,
          }

          setPodcast(formattedPodcast)
        }
      } catch (error) {
        console.error('Failed to fetch podcast details:', error)
      }
    }

    // You can pass the ID directly when calling `fetchPodcastDetail`
    // Here, I'm assuming you get the `id` from a route or state
    const podcastId = '1535809341' // Replace with dynamic ID from the URL or context
    fetchPodcastDetail(podcastId)
  }, []) // Runs on component mount

  return <PodcastDetailContext.Provider value={{ podcast, setPodcast }}>{children}</PodcastDetailContext.Provider>
}

/** Custom hook to use the podcast context. */
export const usePodcastDetailContext = (): PodcastDetailContextType => {
  const context = useContext(PodcastDetailContext)
  if (!context) {
    throw new Error('usePodcastDetailContext must be used within a PodcastDetailProvider')
  }
  return context
}
