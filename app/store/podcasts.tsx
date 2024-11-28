'use client'
/**
 * @author Miguel Chumillas.
 * @description Store for podcasts.
 */

/** Dependencies. */
import React, { createContext, useContext, useState, ReactNode } from 'react'

/** Podcast Interface. */
interface Podcast {
  id: string
  title: string
  author: string
  imageUrl: string
  summary: string
  link: string
}

/** PodcastsContextType Interface. */
interface PodcastsContextType {
  podcasts: Podcast[]
  setPodcasts: (podcasts: Podcast[]) => void
  filter: string
  setFilter: (filter: string) => void
}

/** PodcastsProviderProps Interface. */
interface PodcastsProviderProps {
  children: ReactNode
}

/** PodcastsContext Context. */
const PodcastsContext = createContext<PodcastsContextType | undefined>(undefined)

/**
 * The context provider component that manages the state of podcasts and the filter input.
 * It provides the podcast list and filter state to child components.
 *
 * @param {PodcastsProviderProps} props - The properties passed to the component, including `children`.
 * @returns {JSX.Element} - The PodcastsContext provider wrapping the children components.
 */
export const PodcastsProvider: React.FC<PodcastsProviderProps> = ({ children }) => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [filter, setFilter] = useState<string>('') // Add filter state

  return (
    <PodcastsContext.Provider value={{ podcasts, setPodcasts, filter, setFilter }}>{children}</PodcastsContext.Provider>
  )
}

/**
 * Custom hook to access the Podcasts context.
 * This hook allows components to access the podcast list, set podcasts, and the filter state.
 *
 * @throws {Error} - Throws an error if used outside of a PodcastsProvider.
 * @returns {PodcastsContextType} - The value from the PodcastsContext, including podcasts, setPodcasts, filter, and setFilter.
 */
export const usePodcasts = (): PodcastsContextType => {
  const context = useContext(PodcastsContext)
  if (!context) {
    throw new Error('usePodcasts must be used within a PodcastsProvider')
  }
  return context
}
