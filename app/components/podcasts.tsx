'use client'
/**
 * @author Miguel Chumillas.
 * @description Podcasts Component.
 */

/** Dependencies. */
import React, { useState } from 'react'
import Link from 'next/link'
import Image from '@/app/components/image'
import FilterPodcasts from '@/app/components/filter-podcasts'

/** Podcast Interface. */
interface Podcast {
  id: string
  title: string
  author: string
  imageUrl: string
  summary: string
  link: string
}

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
  const [filter, setFilter] = useState('')

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPodcasts.map((podcast) => (
          <Link
            href={`/podcast/${podcast.id}`}
            key={podcast.id}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col items-center cursor-pointer min-h-[220px]">
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
              <div className="text-center mt-2 flex-grow flex flex-col justify-center">
                <h2 className="text-sm font-bold text-gray-600 mb-2 uppercase">{podcast.title}</h2>
                <p className="text-sm font-semibold text-gray-400">Author: {podcast.author}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Podcasts
