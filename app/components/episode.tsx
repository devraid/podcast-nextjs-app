'use client'
/**
 * @author Miguel Chumillas.
 * @description Podcast Detail Component.
 */

/** Dependencies. */
import { usePodcasts } from '@/app/store/podcasts'
import Header from '@/app/components/layout/header'
import Image from '@/app/components/image'
import Link from 'next/link'
import { Podcast, PodcastEpisode } from '@/app/types'

/** PodcastDetailsProps Interface. */
interface PodcastProps {
  id: string
  podcast: Podcast & { episodes: PodcastEpisode[] }
}

/**
 * Podcasts component that displays a podcast.
 *
 * @param {PodcastProps} props - Component properties that include the podcast.
 * @returns {JSX.Element} - The rendered component displaying the podcast.
 */
const PodcastDetailsEpisode: React.FC<PodcastProps> = ({ podcast }) => {
  // Use the Podcasts context
  const { getSummary } = usePodcasts()

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <Header />

      {/* Left Column and Right Column */}
      <div className="flex flex-col md:flex-row gap-6 lg:gap-20">
        {/* Left Column: Podcast Details */}
        <div className="md:w-1/4 w-full">
          <div className="bg-white rounded-lg shadow-lg px-2 pt-2 pb-4">
            <div className="flex flex-col items-center">
              <Image
                className="rounded-md"
                src={podcast.imageUrl}
                alt={podcast.title}
                width={128}
                height={128}
                unoptimized
                priority
              />
            </div>
            <div className="p-2 mt-6 mb-6">
              <h1 className="text-sm font-bold">{podcast.title}</h1>
              <p className="text-xs italic">by {podcast.author}</p>
            </div>
            <p className="text-xs font-bold">Description:</p>
            <p className="text-xs">{getSummary(podcast.id)}</p>
          </div>
        </div>

        {/* Right Column: Episode List */}
        <div className="md:w-3/4 w-full">
          <div className="bg-white rounded-lg shadow-lg px-4 pb-2 mb-2">
            <h2 className="text-lg font-semibold">Episodes:</h2>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 mt-4">test</div>
        </div>
      </div>
    </div>
  )
}

export default PodcastDetailsEpisode
