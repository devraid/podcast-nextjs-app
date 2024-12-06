'use client'
/**
 * @author Miguel Chumillas.
 * @description Podcast and Episodes.
 */

/** Dependencies. */
import { useState, useEffect } from 'react'
import PodcastDetails from '@/app/components/podcasts/podcast'
import usePodcast from '@/app/hooks/use-podcast'

/**
 * PodcastPage component responsible for client-side fetching and rendering the podcast details.
 *
 * @param {Readonly<{ params: { id: string } }>} - Parameters.
 * @returns {JSX.Element} - The page layout structure populated with podcast and episode details.
 */
const PodcastPage = ({ params }: { params: Promise<{ id: string }> }): JSX.Element => {
  const [id, setId] = useState<string>('')

  useEffect(() => {
    const fetchParams = async () => {
      const { id } = await params
      setId(id)
    }
    fetchParams()
  }, [params])

  const { podcast, loading, error } = usePodcast(id)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
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
