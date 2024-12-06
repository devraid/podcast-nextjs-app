'use client'
/**
 * @author Miguel Chumillas.
 * @description Podcasts Hook.
 */

/** Dependencies. */
import { useState, useEffect } from 'react'
import { Podcast } from '@/app/types'
import { fetchPodcasts } from '@/app/lib/api/models/podcasts'

/**
 * Custom hook for fetching podcasts.
 *
 * @returns {object} - The hook returns an object containing:
 *   - `podcasts` (Podcast[] | undefined): A list of podcast data fetched from the API.
 *   - `loading` (boolean): A flag indicating if the data is still being loaded.
 *   - `error` (string | null): An error message if the fetch operation fails.
 */
const usePodcasts = (): { podcasts: Podcast[] | undefined; loading: boolean; error: string | null } => {
  const [podcasts, setPodcasts] = useState<Podcast[]>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getPodcasts = async () => {
      try {
        const data = await fetchPodcasts()
        setPodcasts(data)
      } catch {
        setError('Error loading data')
      } finally {
        setLoading(false)
      }
    }
    getPodcasts()
  })

  return { podcasts, loading, error }
}

export default usePodcasts
