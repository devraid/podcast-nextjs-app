'use server'
/**
 * @author Miguel Chumillas.
 * @description Episode.
 */

/** Dependencies. */
import PodcastDetailsEpisode from '@/app/components/episode'
import { fetchPodcast } from '@/app/api/models/podcast'

/**
 * PodcastPage component responsible for server-side fetching and rendering the podcast details.
 *
 * @param {Readonly<{ params: { id: string } }>} context - Context object containing route parameters.
 * @returns {Promise<JSX.Element>} - The page layout structure populated with podcast details.
 */
const PodcastEpisodePage = async ({ params }: { params: { id: string } }): Promise<JSX.Element> => {
  const { id } = await params
  const podcast = await fetchPodcast(id)

  // Pass data to the client-side component
  return (
    <PodcastDetailsEpisode
      podcast={podcast}
      id={id}
    />
  )
}

export default PodcastEpisodePage
