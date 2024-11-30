'use server'
/**
 * @author Miguel Chumillas.
 * @description Podcast page.
 */

/** Dependencies. */
import PodcastDetails from '@/app/components/podcast'
import { PodcastItem, FullPodcast } from '@/app/types'

/**
 * Fetches a single podcast data from the iTunes API.
 *
 * @param {string} id - The podcast ID.
 * @returns {Promise<FullPodcast>} - The podcast data formatted according to the Podcast interface.
 */
const fetchPodcast = async (id: string): Promise<FullPodcast> => {
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${id}&media=podcast
 &entity=podcastEpisode&limit=20`,
    {
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data: { results: PodcastItem[] } = await response.json()
  const podcastData = data.results[0]
  const episodes = data.results
    .filter((item) => item.wrapperType === 'podcastEpisode')
    .map((episode) => ({
      id: episode.trackId!.toString(),
      title: episode.trackName || 'Untitled Episode',
      releaseDate: new Date(episode.releaseDate!).toLocaleDateString(),
      duration: episode.trackTimeMillis ? new Date(episode.trackTimeMillis).toISOString().substr(11, 8) : '00:00:00',
    }))

  return {
    id: podcastData.collectionId!.toString(),
    title: podcastData.collectionName || 'Unknown Title',
    author: podcastData.artistName || 'Unknown Author',
    imageUrl: podcastData.artworkUrl600 || '',
    summary: podcastData.collectionCensoredName || 'No summary available',
    link: podcastData.collectionViewUrl || '',
    episodes,
  }
}

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
