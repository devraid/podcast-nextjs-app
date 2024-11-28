'use client'
/**
 * @author Miguel Chumillas.
 * @description Podcast Detail Page using context.
 */

/** Dependencies. */
import { useEffect } from 'react'
import { usePodcastDetailContext } from '@/app//store/detail/podcast'
import Image from '@/app/components/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * Podcast Detail Page.
 *
 * @returns {JSX.Element} - The podcast detail layout structure.
 */
const PodcastDetailPage = (): JSX.Element => {
  const pathname = usePathname()
  const id = pathname.split('/').pop() // Get the 'id' from URL params
  const { podcast, setPodcast } = usePodcastDetailContext() // Get podcast data from context

  useEffect(() => {
    if (id) {
      // Fetch the podcast detail by ID
      setPodcast(null) // Reset podcast data before fetching new one
      const fetchPodcastDetail = async (id: string) => {
        try {
          const response = await fetch(`https://itunes.apple.com/lookup?id=${id}`)
          const data = await response.json()

          if (data.results && data.results[0]) {
            const podcastData = data.results[0]
            const formattedPodcast = {
              id: podcastData.collectionId,
              title: podcastData.collectionName,
              author: podcastData.artistName,
              imageUrl: podcastData.artworkUrl100,
              summary: podcastData.collectionCensoredName,
              link: podcastData.collectionViewUrl,
            }

            setPodcast(formattedPodcast)
          }
        } catch (error) {
          console.error('Error fetching podcast detail:', error)
        }
      }

      fetchPodcastDetail(id)
    }
  }, [id, setPodcast])

  // Show loading state while fetching
  if (!podcast) {
    return <div>Loading...</div>
  }

  // Show error if no podcast is found
  if (!podcast) {
    return <div>Podcast not found.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <Link href="/">
          <h1 className="text-sm font-bold text-blue-500 cursor-pointer flex-shrink-0">Podcaster</h1>
        </Link>
      </div>

      {/* Podcast Details */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center">
        <div className="w-32 h-32 overflow-hidden rounded-full">
          <Image
            src={podcast.imageUrl}
            alt={podcast.title}
            width={128}
            height={128}
            unoptimized
            priority
            className="object-cover w-full h-full"
          />
        </div>
        <div className="text-center mt-2">
          <h2 className="text-xl font-bold text-gray-600 mb-2">{podcast.title}</h2>
          <p className="text-sm font-semibold text-gray-400">Author: {podcast.author}</p>
          <p className="mt-4 text-sm text-gray-600">{podcast.summary}</p>
        </div>
        <div className="mt-4">
          <a
            href={podcast.link}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Listen to Podcast
          </a>
        </div>
      </div>
    </div>
  )
}

export default PodcastDetailPage
