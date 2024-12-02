'use server'
/**
 * @author Miguel Chumillas.
 * @description Main page for the application.
 */

/** Dependencies. */
import Podcasts from '@/app/components/podcasts'
import { fetchPodcasts } from '@/app/api/models/podcasts'

/** Cache storage. */
let cachedPodcasts: any = null
let lastFetchTime: number = 0

/**
 * HomePage component responsible for server-side fetching and rendering the podcasts list.
 *
 * @returns {Promise<JSX.Element>} - The page layout structure populated with podcasts.
 */
const HomePage = async (): Promise<JSX.Element> => {
  const now = Date.now()
  const cacheDuration = 24 * 60 * 60 * 1000 // 24 hours.

  if (!cachedPodcasts || now - lastFetchTime > cacheDuration) {
    cachedPodcasts = await fetchPodcasts()
    lastFetchTime = now
  }

  // Pasar los datos al componente del cliente
  return <Podcasts podcasts={cachedPodcasts} />
}

export default HomePage
