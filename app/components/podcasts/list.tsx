'use client'
/**
 * @author Miguel Chumillas.
 * @description List of Podcasts Component.
 */

/** Dependencies. */
import React from 'react'
import Link from 'next/link'
import Image from '@/app/components/image'
import { Podcast } from '@/app/types'

/** ListPodcastsProps Interface. */
interface ListPodcastsProps {
  value: Podcast[]
}

/**
 * ListPodcasts component that provides a list podcasts.
 *
 * @param {ListPodcastsProps} props - Component properties containing the list of podcasts.
 * @returns {JSX.Element} - The rendered list of podcasts.
 */
const ListPodcasts: React.FC<ListPodcastsProps> = ({ value }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {value.map((podcast) => (
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
            <div className="text-center p-2 flex-grow flex flex-col justify-center">
              <h2 className="text-sm font-bold text-gray-600 mb-2 uppercase">{podcast.title}</h2>
              <p className="text-sm font-semibold text-gray-400">Author: {podcast.author}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ListPodcasts
