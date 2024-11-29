'use client'
/**
 * @author Miguel Chumillas.
 * @description Filter Podcasts Component.
 */

/** Dependencies. */
import React from 'react'

/** FilterPodcastsProps Interface. */
interface FilterPodcastsProps {
  value: string
  onChange: (value: string) => void
  count: number
}

/**
 * FilterPodcasts component that provides a search input to filter podcasts.
 * It also displays the count of filtered podcasts.
 *
 * @param {FilterPodcastsProps} props - Component properties containing the filter value, change handler, and podcast count.
 * @returns {JSX.Element} - The rendered filter section with a count and search input.
 */
const FilterPodcasts: React.FC<FilterPodcastsProps> = ({ value, onChange, count }) => {
  return (
    <div className="flex items-center gap-4 mb-6 justify-between sm:justify-end">
      {/* Count Bubble */}
      <div className="bg-blue-500 text-white text-sm font-semibold rounded-lg px-3 py-1">{count}</div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Filter podcasts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:max-w-[325px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default FilterPodcasts
