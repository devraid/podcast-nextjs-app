/**
 * @author Miguel Chumillas.
 * @description Podcast test.
 */

/** Dependencies. */
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import PodcastPage from '@/app/podcast/[id]/page'
import { fetchPodcast } from '@/app/lib/api/models/podcast'
import { PodcastsProvider } from '@/app/store/podcasts'

/** Mock the fetchPodcast. */
jest.mock('@/app/lib/api/models/podcast', () => ({
  fetchPodcast: jest.fn(),
}))

/** Mock the Podcast component. */
jest.mock('@/app/components/podcasts/podcast', () =>
  jest.fn(({ podcast }) => <div>{`Mocked Podcast Details: ${podcast?.title || 'No title'}`}</div>),
)

describe('PodcastPage', () => {
  const mockPodcastData = {
    id: '1',
    title: 'Test Podcast',
    author: 'Test Author',
    description: 'A test description',
    episodes: [
      { id: 'ep1', title: 'Episode 1', duration: 300 },
      { id: 'ep2', title: 'Episode 2', duration: 600 },
    ],
  }

  it('renders the loading state initially', () => {
    render(
      <PodcastsProvider>
        <PodcastPage params={Promise.resolve({ id: '1' })} />
      </PodcastsProvider>,
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders the podcast details when data is fetched', async () => {
    ;(fetchPodcast as jest.Mock).mockResolvedValueOnce(mockPodcastData)

    await act(async () => {
      render(
        <PodcastsProvider>
          <PodcastPage params={Promise.resolve({ id: '1' })} />
        </PodcastsProvider>,
      )
    })

    expect(fetchPodcast).toHaveBeenCalledWith('1')
    expect(screen.getByText('Mocked Podcast Details: Test Podcast')).toBeInTheDocument()
  })

  it('handles API errors gracefully', async () => {
    ;(fetchPodcast as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch podcast details'))

    await act(async () => {
      render(
        <PodcastsProvider>
          <PodcastPage params={Promise.resolve({ id: '1' })} />
        </PodcastsProvider>,
      )
    })

    expect(screen.getByText('Error loading data')).toBeInTheDocument()
  })
})
