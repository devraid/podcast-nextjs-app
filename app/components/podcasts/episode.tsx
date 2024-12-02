'use client'
/**
 * @author Miguel Chumillas.
 * @description Podcast Episode Component.
 */

/** Dependencies. */
import Header from '@/app/components/layout/header'
import { Podcast, PodcastEpisode } from '@/app/types'
import PodcastLeftDetails from '@/app/components/podcasts/details'

/** PodcastEpisodeProps Interface. */
interface PodcastProps {
  episodeId: string
  podcast: Podcast & { episodes: PodcastEpisode[] }
}

/**
 * Podcasts component that displays a podcast episode.
 *
 * @param {PodcastProps} props - Component properties that include the podcast episode.
 * @returns {JSX.Element} - The rendered component displaying the podcast episode.
 */
const PodcastDetailsEpisode: React.FC<PodcastProps> = ({ episodeId, podcast }) => {
  const currentEpisode = podcast.episodes.find((episode) => episode.id === episodeId)

  console.log(podcast.episodes)
  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <Header />

      {/* Left Column and Right Column */}
      <div className="flex flex-col md:flex-row gap-6 lg:gap-20">
        {/* Left Column: Podcast Details */}
        <PodcastLeftDetails podcast={podcast} />

        {/* Right Column: Episode List */}
        <div className="md:w-3/4 w-full">
          <div className="bg-white rounded-lg shadow-lg p-4">
            {/* Reproductor de audio */}
            {currentEpisode?.episodeUrl ? (
              <div className="flex flex-col">
                {/* Title and Description */}
                <h1 className="text-lg font-bold mb-2">{currentEpisode.title}</h1>
                {currentEpisode.description && (
                  <p className="text-xs text-gray-600 italic mb-6">{currentEpisode.description}</p>
                )}
                {/* Reproductor de audio */}
                <audio
                  className="w-full"
                  src={currentEpisode.episodeUrl}
                  controls
                >
                  Tu navegador no soporta el reproductor de audio.
                </audio>
              </div>
            ) : (
              <p className="text-sm text-gray-600">Audio no disponible para este episodio.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PodcastDetailsEpisode
