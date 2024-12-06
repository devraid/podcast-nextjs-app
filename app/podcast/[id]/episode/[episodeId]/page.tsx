'use client'
/**
 * @author Miguel Chumillas.
 * @description Episode.
 */

/** Dependencies. */
import PodcastDetailsEpisode from '@/app/components/podcasts/episode'
import { useState, useEffect } from 'react'
import usePodcast from '@/app/hooks/use-podcast'

/**
 * Component responsible for client-side fetching and rendering the episode details.
 *
 * @param {Readonly<{ params: Promise<{ id: string; episodeId: string }> }>} - Parameters.
 * @returns {JSX.Element} - Layout structure populated with episode details.
 */
const PodcastEpisodePage = ({ params }: { params: Promise<{ id: string; episodeId: string }> }): JSX.Element => {
  const [id, setId] = useState<string>('')
  const [episodeId, setEpisodeId] = useState<string>('')

  useEffect(() => {
    const fetchParams = async () => {
      const { id, episodeId } = await params
      setId(id)
      setEpisodeId(episodeId)
    }
    fetchParams()
  }, [params])

  const { podcast, loading, error } = usePodcast(id)

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
