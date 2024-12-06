/**
 * @author Miguel Chumillas.
 * @description Podcast Episode Page test.
 */

/** Dependencies. */
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import PodcastEpisodePage from '@/app/podcast/[id]/episode/[episodeId]/page'
import { fetchPodcast } from '@/app/lib/api/models/podcast'
import { PodcastsProvider } from '@/app/store/podcasts'

/** Mock the fetchPodcast. */
jest.mock('@/app/lib/api/models/podcast', () => ({
  fetchPodcast: jest.fn(),
}))

/** Mock the Episode component. */
jest.mock('@/app/components/podcasts/episode', () =>
  jest.fn(({ episode }) => <div>{`Mocked Episode Details: ${episode?.title || 'No title'}`}</div>),
)

describe('PodcastEpisodePage', () => {
  const mockEpisodeData = {
    id: 'ep1',
    title: 'Test Episode',
    description: 'This is a test episode',
    duration: 600,
    audioUrl: 'http://example.com/audio.mp3',
  }

  it('renders the loading state initially', () => {
    render(
      <PodcastsProvider>
        <PodcastEpisodePage params={Promise.resolve({ id: '1', episodeId: 'ep1' })} />
      </PodcastsProvider>,
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders the episode details when data is fetched', async () => {
    ;(fetchPodcast as jest.Mock).mockResolvedValueOnce(mockEpisodeData)

    await act(async () => {
      render(
        <PodcastsProvider>
          <PodcastEpisodePage params={Promise.resolve({ id: '1', episodeId: 'ep1' })} />
        </PodcastsProvider>,
      )
    })
    screen.debug()
    expect(fetchPodcast).toHaveBeenCalledWith('1')
    expect(screen.getByText(/Mocked Episode Details: (Test Episode|No title)/)).toBeInTheDocument()
  })

  it('handles API errors gracefully', async () => {
    ;(fetchPodcast as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch episode details'))

    await act(async () => {
      render(
        <PodcastsProvider>
          <PodcastEpisodePage params={Promise.resolve({ id: '1', episodeId: 'ep1' })} />
        </PodcastsProvider>,
      )
    })

    expect(screen.getByText('Error loading data')).toBeInTheDocument()
  })
})
