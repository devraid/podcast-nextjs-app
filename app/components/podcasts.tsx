'use client'
/**
 * @author Miguel Chumillas.
 * @description Podcasts Component.
 */

/** Dependencies. */
import { useEffect } from 'react'
import { usePodcasts } from '@/app/store/podcasts'
import { fetchPodcasts } from '@/app/api/models/podcasts'
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
 * @param {PodcastsProps} props - Component properties.
 * @returns {JSX.Element} - The rendered component displaying the podcasts.
 */
const Podcasts: React.FC<PodcastsProps> = ({ podcasts }: PodcastsProps): JSX.Element => {
  // Use the Podcasts context
  const { filter, setFilter, setPodcasts } = usePodcasts()

  // Set podcasts in the context when the component is ready
  useEffect(() => {
    setPodcasts(podcasts)

    // Note: After 24 hours we call the API again to update podcasts.
    const interval = setInterval(
      () => {
        fetchPodcasts()
      },
      24 * 60 * 60 * 1000, // 24 hours.
    ) // 24 hours
    return () => clearInterval(interval)
  }, [podcasts, setPodcasts])

  // Apply filter to podcasts
  const filteredPodcasts = podcasts.filter(
    (podcast) =>
      podcast.title.toLowerCase().includes(filter.toLowerCase()) ||
      podcast.author.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div>
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
