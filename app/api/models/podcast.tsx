/**
 * @author Miguel Chumillas.
 * @description Fetching logic for a single podcast and its episodes.
 */

/** Dependencies. */
import { PodcastItem, FullPodcast } from '@/app/types'

/**
 * Fetches a single podcast data from the iTunes API.
 *
 * @param {string} id - The podcast ID.
 * @returns {Promise<FullPodcast>} - The podcast data formatted according to the Podcast interface.
 */
export const fetchPodcast = async (id: string): Promise<FullPodcast> => {
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`,
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
