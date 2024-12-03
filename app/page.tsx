'use client'
/**
 * @author Miguel Chumillas.
 * @description Main page for the application.
 */

/** Dependencies. */
import Podcasts from '@/app/components/podcasts'
import { fetchPodcasts } from '@/app/api/models/podcasts'
import { useState, useEffect } from 'react'
import { Podcast } from './types'

/**
 * HomePage component responsible for client-side fetching and rendering the podcasts list.
 *
 * @returns {JSX.Element} - The page layout structure populated with podcasts.
 */
const HomePage = (): JSX.Element => {
  const [podcasts, setPodcasts] = useState<Podcast[] | null>(null) // State for storing podcasts data
  const [lastFetchTime, setLastFetchTime] = useState<number>(0) // State for storing the last fetch time

  useEffect(() => {
    const now = Date.now()
    const cacheDuration = 24 * 60 * 60 * 1000 // 24 hours.

    // If podcasts have not been fetched or the cache is expired.
    if (!podcasts || now - lastFetchTime > cacheDuration) {
      const fetchData = async () => {
        const fetchedPodcasts = await fetchPodcasts()
        setPodcasts(fetchedPodcasts)
        setLastFetchTime(now)
      }
      fetchData()
    }
  }, [podcasts, lastFetchTime])

  if (!podcasts) {
    return <div>Loading...</div>
  }
  return <Podcasts podcasts={podcasts} />
}

export default HomePage
