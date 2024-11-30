'use client'
/**
 * @author Miguel Chumillas.
 * @description Store for podcasts.
 */

/** Dependencies. */
import React, { createContext, useContext, useState, ReactNode } from 'react'

/** FilterContextType Interface. */
interface FilterContextType {
  filter: string
  setFilter: (filter: string) => void
}

/** PodcastsProviderProps Interface. */
interface PodcastsProviderProps {
  children: ReactNode
}

/** FilterContext Context. */
const FilterContext = createContext<FilterContextType | undefined>(undefined)

/**
 * The context provider component that manages the filter input.
 * It provides the filter state to child components.
 *
 * @param {PodcastsProviderProps} props - The properties passed to the component, including `children`.
 * @returns {JSX.Element} - The FilterContext provider wrapping the children components.
 */
export const PodcastsProvider: React.FC<PodcastsProviderProps> = ({ children }) => {
  const [filter, setFilter] = useState<string>('') // Add filter state

  return <FilterContext.Provider value={{ filter, setFilter }}>{children}</FilterContext.Provider>
}

/**
 * Custom hook to access the filter context.
 * This hook allows components to access the filter state and set it.
 *
 * @throws {Error} - Throws an error if used outside of a PodcastsProvider.
 * @returns {FilterContextType} - The value from the FilterContext, including filter and setFilter.
 */
export const usePodcasts = (): FilterContextType => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('usePodcasts must be used within a PodcastsProvider.')
  }
  return context
}
