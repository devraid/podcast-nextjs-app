'use client'
/**
 * @author Miguel Chumillas.
 * @description Episode.
 */

/** Dependencies. */
import PodcastDetailsEpisode from '@/app/components/podcasts/episode'
import { fetchPodcast } from '@/app/lib/api/models/podcast'
import { useState, useEffect } from 'react'
import { FullPodcast } from '@/app/types'

/**
 * Component responsible for client-side fetching and rendering the episode details.
 *
 * @param {Readonly<{ params: Promise<{ id: string; episodeId: string }> }>} - Parameters.
 * @returns {JSX.Element} - Layout structure populated with episode details.
 */
const PodcastEpisodePage = ({ params }: { params: Promise<{ id: string; episodeId: string }> }): JSX.Element => {
  const [podcast, setPodcast] = useState<FullPodcast>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [id, setId] = useState<string>('')
  const [episodeId, setEpisodeId] = useState<string>('')

  useEffect(() => {
    const fetchParams = async () => {
      const { id, episodeId } = await params
      setId(id) // Set the id from params to state
      setEpisodeId(episodeId) // Set the id from params to state
    }
    fetchParams()
  }, [params])

  useEffect(() => {
    const getPodcastData = async () => {
      try {
        setError(null)
        const podcastData = await fetchPodcast(id)
        setPodcast(podcastData)
      } catch {
        setError('Error loading episode details')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      getPodcastData()
    }
  }, [id, episodeId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!podcast) {
    return <div>Podcast not found</div>
  }

  return (
    <PodcastDetailsEpisode
      podcast={podcast}
      episodeId={episodeId}
    />
  )
}

export default PodcastEpisodePage
