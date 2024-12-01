'use client'
/**
 * @author
 * @description Store for podcasts.
 */

/** Dependencies. */
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Podcast } from '@/app/types'

/** PodcastsContextType Interface. */
interface PodcastsContextType {
  podcasts: Podcast[]
  filter: string
  setFilter: (filter: string) => void
  setPodcasts: (podcasts: Podcast[]) => void
  getSummary: (id: string) => string | undefined
}

/** PodcastsProviderProps Interface. */
interface PodcastsProviderProps {
  children: ReactNode
}

/** PodcastsContext Context. */
const PodcastsContext = createContext<PodcastsContextType | undefined>(undefined)

/**
 * The context provider component that manages the podcasts and filter state.
 * It provides state and utility functions to child components.
 *
 * @param {PodcastsProviderProps} props - The properties passed to the component, including `children`.
 * @returns {JSX.Element} - The PodcastsContext provider wrapping the children components.
 */
export const PodcastsProvider: React.FC<PodcastsProviderProps> = ({ children }) => {
  const [filter, setFilter] = useState<string>('')
  const [podcasts, setPodcasts] = useState<Podcast[]>([])

  /**
   * Retrieves the summary of a podcast by its ID.
   *
   * @param {string} id - The podcast ID.
   * @returns {string | undefined} - The summary of the podcast, or undefined if not found.
   */
  const getSummary = (id: string): string | undefined => {
    const podcast = podcasts.find((pod) => pod.id === id)
    return podcast?.summary
  }

  return (
    <PodcastsContext.Provider value={{ podcasts, filter, setFilter, setPodcasts, getSummary }}>
      {children}
    </PodcastsContext.Provider>
  )
}

/**
 * Custom hook to access the podcasts context.
 * This hook allows components to access podcasts, filter state, and utility functions.
 *
 * @throws {Error} - Throws an error if used outside of a PodcastsProvider.
 * @returns {PodcastsContextType} - The value from the PodcastsContext.
 */
export const usePodcasts = (): PodcastsContextType => {
  const context = useContext(PodcastsContext)
  if (!context) {
    throw new Error('usePodcasts must be used within a PodcastsProvider.')
  }
  return context
}
