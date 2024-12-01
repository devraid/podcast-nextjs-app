'use server'
/**
 * @author Miguel Chumillas.
 * @description Main page for the application.
 */

/** Dependencies. */
import Podcasts from '@/app/components/podcasts'
import { fetchPodcasts } from '@/app/api/models/podcasts'

/**
 * HomePage component responsible for server-side fetching and rendering the podcasts list.
 *
 * @returns {Promise<JSX.Element>} - The page layout structure populated with podcasts.
 */
const HomePage = async (): Promise<JSX.Element> => {
  const podcasts = await fetchPodcasts()

  // Pass data to the client-side component
  return <Podcasts podcasts={podcasts} />
}

export default HomePage
