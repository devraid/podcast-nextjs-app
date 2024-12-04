'use client'
/**
 * @author Miguel Chumillas.
 * @description Podcast and Episodes.
 */

/** Dependencies. */
import PodcastDetails from '@/app/components/podcasts/podcast'
import { fetchPodcast } from '@/app/api/models/podcast'
import { FullPodcast } from '@/app/types'
import { useState, useEffect } from 'react'

/**
 * PodcastPage component responsible for client-side fetching and rendering the podcast details.
 *
 * @param {Readonly<{ params: { id: string } }>} - Parameters.
 * @returns {JSX.Element} - The page layout structure populated with podcast and episode details.
 */
const PodcastPage = ({ params }: { params: Promise<{ id: string }> }): JSX.Element => {
  const [podcast, setPodcast] = useState<FullPodcast>()
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState<string>('')

  useEffect(() => {
    const fetchParams = async () => {
      const { id } = await params
      setId(id) // Set the id from params to state
    }
    fetchParams()
  }, [params])

  useEffect(() => {
    const getPodcastData = async () => {
      const podcastData = await fetchPodcast(id)
      setPodcast(podcastData)
      setLoading(false)
    }

    if (id) {
      getPodcastData()
    }
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!podcast) {
    return <div>Podcast not found</div>
  }

  return (
    <PodcastDetails
      podcast={podcast}
      id={id}
    />
  )
}

export default PodcastPage
