'use server'
/**
 * @author Miguel Chumillas.
 * @description Main page for the application.
 */

/** Dependencies. */
import Podcasts from '@/app/components/podcasts'

/** Podcast Interface. */
interface Podcast {
  id: string
  title: string
  author: string
  imageUrl: string
  summary: string
  link: string
}

/** ApiEntry Interface. */
interface ApiEntry {
  id: {
    attributes: {
      'im:id': string
    }
  }
  'im:name': {
    label: string
  }
  'im:artist': {
    label: string
  }
  'im:image': Array<{
    label: string
    attributes: {
      height: string
    }
  }>
  summary: {
    label: string
  }
  link: {
    attributes: {
      href: string
    }
  }
}

/**
 * Fetches podcast data from the iTunes API.
 *
 * @returns {Promise<Podcast[]>} - A list of podcasts formatted according to the Podcast interface.
 */
const fetchPodcasts = async (): Promise<Podcast[]> => {
  const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json', {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()

  // Transform the API response to match the Podcast interface.
  return data.feed.entry.map((entry: ApiEntry) => ({
    id: entry.id.attributes['im:id'],
    title: entry['im:name'].label,
    author: entry['im:artist'].label,
    imageUrl: entry['im:image'].find((img) => img.attributes.height === '170')?.label || '',
    summary: entry.summary.label,
    link: entry.link.attributes.href,
  }))
}

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
