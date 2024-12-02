'use client'
/**
 * @author Miguel Chumillas.
 * @description Podcast Left Details Component.
 */

/** Dependencies. */
import { usePodcasts } from '@/app/store/podcasts'
import Image from '@/app/components/image'
import Link from 'next/link'
import { Podcast, PodcastEpisode } from '@/app/types'

/** PodcastProps Interface. */
interface PodcastProps {
  podcast: Podcast & { episodes: PodcastEpisode[] }
}

/**
 * Podcasts component that displays a podcast.
 *
 * @param {PodcastProps} props - Component properties that include the podcast.
 * @returns {JSX.Element} - The rendered component displaying the podcast.
 */
const PodcastLeftDetails: React.FC<PodcastProps> = ({ podcast }) => {
  // Use the Podcasts context
  const { getSummary } = usePodcasts()

  return (
    <div className="md:w-1/4 w-full">
      <div className="bg-white rounded-lg shadow-lg px-2 pt-2 pb-4">
        <Link href={`/podcast/${podcast.id}`}>
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
        </Link>
        <p className="text-xs font-bold">Description:</p>
        <p className="text-xs">{getSummary(podcast.id)}</p>
      </div>
    </div>
  )
}

export default PodcastLeftDetails
