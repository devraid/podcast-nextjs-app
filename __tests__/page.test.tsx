import { render } from '@testing-library/react'
import HomePage from './HomePage'
import { fetchPodcasts } from '@/app/api/models/podcasts'

// Mock the fetchPodcasts function
jest.mock('@/app/api/models/podcasts', () => ({
  fetchPodcasts: jest.fn(),
}))

jest.mock('@/app/components/podcasts', () => jest.fn(() => <div>Mocked Podcasts Component</div>))

describe('HomePage', () => {
  const mockPodcasts = [
    { id: '1', title: 'Podcast 1', episodes: [] },
    { id: '2', title: 'Podcast 2', episodes: [] },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches podcasts and renders the Podcasts component when the cache is empty', async () => {
    // Mock fetchPodcasts to return mockPodcasts
    ;(fetchPodcasts as jest.Mock).mockResolvedValue(mockPodcasts)

    // Render the HomePage component
    const { findByText } = render(await HomePage())

    // Check if fetchPodcasts is called
    expect(fetchPodcasts).toHaveBeenCalledTimes(1)

    // Check if Podcasts component is rendered with fetched data
    expect(await findByText('Mocked Podcasts Component')).toBeInTheDocument()
  })

  it('uses the cached podcasts when the cache is valid', async () => {
    // Set up cached data and a valid fetch time
    const now = Date.now()
    const cacheDuration = 24 * 60 * 60 * 1000 // 24 hours.
    const validLastFetchTime = now - cacheDuration + 1000 // within cache duration

    const mockCache = jest.requireActual('./HomePage')
    mockCache.cachedPodcasts = mockPodcasts
    mockCache.lastFetchTime = validLastFetchTime

    // Render the HomePage component
    const { findByText } = render(await HomePage())

    // Check that fetchPodcasts was NOT called
    expect(fetchPodcasts).not.toHaveBeenCalled()

    // Verify that the cached podcasts are used
    expect(await findByText('Mocked Podcasts Component')).toBeInTheDocument()
  })

  it('fetches new podcasts when the cache is stale', async () => {
    // Set up stale cache data
    const now = Date.now()
    const cacheDuration = 24 * 60 * 60 * 1000 // 24 hours.
    const staleLastFetchTime = now - cacheDuration - 1000 // beyond cache duration

    const mockCache = jest.requireActual('./HomePage')
    mockCache.cachedPodcasts = mockPodcasts
    mockCache.lastFetchTime = staleLastFetchTime

    // Mock fetchPodcasts to return updated podcasts
    const updatedPodcasts = [{ id: '3', title: 'Podcast 3', episodes: [] }](
      fetchPodcasts as jest.Mock,
    ).mockResolvedValue(updatedPodcasts)

    // Render the HomePage component
    const { findByText } = render(await HomePage())

    // Verify fetchPodcasts is called
    expect(fetchPodcasts).toHaveBeenCalledTimes(1)

    // Verify that Podcasts component renders with the updated data
    expect(await findByText('Mocked Podcasts Component')).toBeInTheDocument()
  })
})
