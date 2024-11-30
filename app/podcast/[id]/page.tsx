'use server'
/**
 * @author Miguel Chumillas.
 * @description Podcast and Episodes.
 */

/** Dependencies. */
import PodcastDetails from '@/app/components/podcast'
import { fetchPodcast } from '@/app/api/models/podcast'

/**
 * PodcastPage component responsible for server-side fetching and rendering the podcast details.
 *
 * @param {Readonly<{ params: { id: string } }>} context - Context object containing route parameters.
 * @returns {Promise<JSX.Element>} - The page layout structure populated with podcast details.
 */
const PodcastPage = async ({ params }: { params: { id: string } }): Promise<JSX.Element> => {
  const { id } = await params
  const podcast = await fetchPodcast(id)

  // Pass data to the client-side component
  return <PodcastDetails podcast={podcast} />
}

export default PodcastPage
