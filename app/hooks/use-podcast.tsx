'use client'
/**
 * @author Miguel Chumillas.
 * @description Podcast Hook.
 */

/** Dependencies. */
import { useState, useEffect } from 'react'
import { FullPodcast } from '@/app/types'
import { fetchPodcast } from '@/app/lib/api/models/podcast'

/**
 * Custom hook for fetching podcast details by ID.
 *
 * @param {string} id - The unique identifier for the podcast.
 * @returns {object} - The hook returns an object containing:
 *   - `podcast` (FullPodcast | undefined): The podcast data fetched from the API.
 *   - `loading` (boolean): A flag indicating if the data is still being loaded.
 *   - `error` (string | null): An error message if the fetch operation fails.
 */
const usePodcast = (id: string): { podcast: FullPodcast | undefined; loading: boolean; error: string | null } => {
  const [podcast, setPodcast] = useState<FullPodcast>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getPodcast = async () => {
      try {
        const data = await fetchPodcast(id)
        setPodcast(data)
      } catch {
        setError('Error loading data')
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      getPodcast()
    }
  }, [id])

  return { podcast, loading, error }
}

export default usePodcast
