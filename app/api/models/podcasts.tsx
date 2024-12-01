'use server'
/**
 * @author Miguel Chumillas.
 * @description Fetching logic for podcasts.
 */

/** Dependencies. */
import { Podcast, PodcastEntry } from '@/app/types'

/**
 * Fetches podcast data from the iTunes API.
 *
 * @returns {Promise<Podcast[]>} - A list of podcasts formatted according to the Podcast interface.
 */
export const fetchPodcasts = async (): Promise<Podcast[]> => {
  const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json', {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()

  // Transform the API response to match the Podcast interface.
  return data.feed.entry.map((entry: PodcastEntry) => ({
    id: entry.id.attributes['im:id'],
    title: entry['im:name'].label,
    author: entry['im:artist'].label,
    imageUrl: entry['im:image'].find((img) => img.attributes.height === '170')?.label || '',
    summary: entry.summary.label,
    link: entry.link.attributes.href,
  }))
}
