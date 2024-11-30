'use client'
/**
 * @author Miguel Chumillas.
 * @description Podcasts Component.
 */

/** Dependencies. */
import { usePodcasts } from '@/app/store/podcasts'
import FilterPodcasts from '@/app/components/podcasts/filter'
import ListPodcasts from '@/app/components/podcasts/list'
import { Podcast } from '@/app/types'

/** PodcastsProps Interface. */
interface PodcastsProps {
  podcasts: Podcast[]
}

/**
 * Podcasts component that displays a list of podcasts.
 * It accepts an array of podcasts and allows filtering by title or author.
 *
 * @param {PodcastsProps} props - Component properties that include the list of podcasts.
 * @returns {JSX.Element} - The rendered component displaying the podcasts.
 */
const Podcasts: React.FC<PodcastsProps> = ({ podcasts }) => {
  // Use the Podcasts context
  const { filter, setFilter } = usePodcasts()

  // Apply filter to podcasts
  const filteredPodcasts = podcasts.filter(
    (podcast) =>
      podcast.title.toLowerCase().includes(filter.toLowerCase()) ||
      podcast.author.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-4">
      {/* Main Title */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold text-blue-500">Podcaster</h1>
      </div>

      {/* Filter Podcasts */}
      <FilterPodcasts
        value={filter}
        onChange={setFilter}
        count={filteredPodcasts.length}
      />

      {/* Podcast List */}
      <ListPodcasts value={filteredPodcasts} />
    </div>
  )
}

export default Podcasts
