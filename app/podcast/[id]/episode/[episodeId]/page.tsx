'use client'
/**
 * @author Miguel Chumillas.
 * @description Episode.
 */

/** Dependencies. */
import PodcastDetailsEpisode from '@/app/components/podcasts/episode'
import { fetchPodcast } from '@/app/api/models/podcast'
import { useState, useEffect, use } from 'react'
import { FullPodcast } from '@/app/types'

/**
 * Component responsible for client-side fetching and rendering the episode details.
 *
 * @param {Readonly<{ params: Promise<{ id: string; episodeId: string }> }>} - Parameters.
 * @returns {JSX.Element} - Layout structure populated with episode details.
 */
const PodcastEpisodePage = ({ params }: { params: Promise<{ id: string; episodeId: string }> }): JSX.Element => {
  const [podcast, setPodcast] = useState<FullPodcast>()
  const { id, episodeId } = use(params)

  useEffect(() => {
    const getPodcastData = async () => {
      const podcastData = await fetchPodcast(id)
      setPodcast(podcastData)
    }

    getPodcastData()
  }, [id, episodeId])

  if (!podcast) {
    return <div>Loading...</div>
  }

  return (
    <PodcastDetailsEpisode
      podcast={podcast}
      episodeId={episodeId}
    />
  )
}

export default PodcastEpisodePage
