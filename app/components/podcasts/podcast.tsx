'use client'
/**
 * @author Miguel Chumillas.
 * @description Podcast Detail Component.
 */

/** Dependencies. */
import Link from 'next/link'
import { Podcast, PodcastEpisode } from '@/app/types'
import PodcastLeftDetails from '@/app/components/podcasts/details'

/** PodcastDetailsProps Interface. */
interface PodcastProps {
  id: string
  podcast: Podcast & { episodes: PodcastEpisode[] }
}

/**
 * Podcasts component that displays a podcast.
 *
 * @param {PodcastProps} props - Component properties.
 * @returns {JSX.Element} - The rendered component.
 */
const PodcastDetails: React.FC<PodcastProps> = ({ podcast }: PodcastProps): JSX.Element => {
  return (
    <div>
      {/* Left Column and Right Column */}
      <div className="flex flex-col md:flex-row gap-6 lg:gap-20">
        {/* Left Column: Podcast Details */}
        <PodcastLeftDetails podcast={podcast} />

        {/* Right Column: Episode List */}
        <div className="md:w-3/4 w-full">
          <div className="bg-white rounded-lg shadow-lg px-4 pb-2 mb-2">
            <h2 className="text-lg font-semibold">Episodes: {podcast.episodes.length}</h2>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
            <div className="mb-2 pb-0">
              {/* Header Row */}
              <div className="flex justify-between text-xs font-semibold pb-2 border-b">
                <span className="w-1/2 text-left">Title</span>
                <span className="w-1/4 text-center">Date</span>
                <span className="w-1/4 text-right">Duration</span>
              </div>
            </div>
            {/* Episodes List */}
            <ul className="space-y-2 text-xs">
              {podcast.episodes.map((episode) => (
                <li
                  key={episode.id}
                  className="rounded flex justify-between items-center"
                >
                  {/* Title Link */}
                  <span className="w-1/2 truncate">
                    <Link
                      href={`/podcast/${podcast.id}/episode/${episode.id}`}
                      className="text-blue-500 font-bold hover:underline"
                    >
                      {episode.title}
                    </Link>
                  </span>
                  {/* Release Date */}
                  <span className="text-gray-600 w-1/4 text-center">{episode.releaseDate}</span>
                  {/* Duration */}
                  <span className="text-gray-600 w-1/4 text-right">{episode.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PodcastDetails
