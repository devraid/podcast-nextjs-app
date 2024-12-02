'use server'
/**
 * @author Miguel Chumillas.
 * @description Episode.
 */

/** Dependencies. */
import PodcastDetailsEpisode from '@/app/components/podcasts/episode'
import { fetchPodcast } from '@/app/api/models/podcast'

/**
 * PodcastPage component responsible for server-side fetching and rendering the podcast details.
 *
 * @param {Readonly<{ params: { id: string } }>} context - Context object containing route parameters.
 * @returns {Promise<JSX.Element>} - The page layout structure populated with podcast details.
 */
const PodcastEpisodePage = async ({ params }: { params: { id: string; episodeId: string } }): Promise<JSX.Element> => {
  const { id, episodeId } = await params
  const podcast = await fetchPodcast(id)

  // Pass data to the client-side component
  return (
    <PodcastDetailsEpisode
      podcast={podcast}
      episodeId={episodeId}
    />
  )
}

export default PodcastEpisodePage
