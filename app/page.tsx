'use client'
/**
 * @author Miguel Chumillas.
 * @description Homepage for the application.
 */

/** Dependencies. */
import { useState } from 'react'
import { usePodcastContext } from '../app/store/podcast'
import Image from '../app/components/image'
import Link from 'next/link'

/**
 * Home Page.
 *
 * @returns {JSX.Element} - The page layout structure.
 */
const HomePage = (): JSX.Element => {
  const { podcasts } = usePodcastContext()
  const [searchTerm, setSearchTerm] = useState('')

  // Filter podcasts based on search term
  const filteredPodcasts = podcasts.filter(
    (podcast) =>
      podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <Link href="/">
          <h1 className="text-sm font-bold text-blue-500 cursor-pointer flex-shrink-0">Podcaster</h1>
        </Link>
        <div className="flex flex-wrap items-center w-full sm:w-auto gap-2 sm:gap-4">
          <div className="bg-blue-500 text-white text-sm font-semibold rounded-full px-3 py-1 mb-2 sm:mb-0">
            {filteredPodcasts.length}
          </div>
          <input
            type="text"
            placeholder="Search podcasts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>
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

export default HomePage
