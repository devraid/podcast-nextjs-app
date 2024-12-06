'use client'
/**
 * @author Miguel Chumillas.
 * @description Main page for the application.
 */

/** Dependencies. */
import Podcasts from '@/app/components/podcasts'
import usePodcasts from '@/app/hooks/use-podcasts'

/**
 * HomePage responsible for client-side fetching and rendering the podcasts list.
 *
 * @returns {JSX.Element} - The page layout structure populated with podcasts.
 */
const HomePage = (): JSX.Element => {
  const { podcasts, loading, error } = usePodcasts()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!podcasts) {
    return <div>Podcasts not found</div>
  }
  return <Podcasts podcasts={podcasts} />
}

export default HomePage
