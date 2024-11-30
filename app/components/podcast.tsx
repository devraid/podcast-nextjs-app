'use client'
/**
 * @author Miguel Chumillas.
 * @description Podcast Detail Component.
 */

/** Dependencies. */
import Image from '@/app/components/image'
import { Podcast, PodcastEpisode } from '@/app/types'

/** PodcastDetailsProps Interface. */
interface PodcastProps {
  podcast: Podcast & { episodes: PodcastEpisode[] }
}

/**
 * Podcasts component that displays a podcast.
 *
 * @param {PodcastProps} props - Component properties that include the podcast.
 * @returns {JSX.Element} - The rendered component displaying the podcast.
 */
const PodcastDetails: React.FC<PodcastProps> = ({ podcast }) => {
  return (
    <div className="flex gap-8">
      {/* Left Column: Podcast Details */}
      <div className="w-1/3">
        <Image
          src={podcast.imageUrl}
          alt={podcast.title}
          width={128}
          height={128}
          unoptimized
          priority
        />
        <h1 className="text-2xl font-bold mb-2">{podcast.title}</h1>
        <p>
          <strong>Author:</strong> {podcast.author}
        </p>
        <p className="my-2">
          <strong>Summary:</strong> {podcast.summary}
        </p>
        <a
          href={podcast.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          View on iTunes
        </a>
      </div>

      {/* Right Column: Episode List */}
      <div className="w-2/3">
        <h2 className="text-xl font-semibold mb-4">Episodes</h2>
        <ul className="space-y-4">
          {podcast.episodes.map((episode) => (
            <li
              key={episode.id}
              className="border p-4 rounded"
            >
              <h3 className="text-lg font-bold">{episode.title}</h3>
              <p className="text-sm text-gray-600">Release Date: {episode.releaseDate}</p>
              <p className="text-sm text-gray-600">Duration: {episode.duration}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PodcastDetails
