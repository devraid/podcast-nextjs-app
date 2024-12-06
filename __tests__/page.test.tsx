/**
 * @author Miguel Chumillas.
 * @description HomePage test.
 */

/** Dependencies. */
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import HomePage from '@/app/page.tsx'
import { fetchPodcasts } from '@/app/lib/api/models/podcasts'
import { Podcast } from '@/app/types'

/** Mock the fetchPodcasts. */
jest.mock('@/app/lib/api/models/podcasts', () => ({
  fetchPodcasts: jest.fn(),
}))

/** Mock the Podcasts component. */
jest.mock('@/app/components/podcasts', () =>
  jest.fn(({ podcasts }) => <div>{`Mocked Podcasts: ${podcasts.length}`}</div>),
)

describe('HomePage', () => {
  it('renders the loading state initially', () => {
    render(<HomePage />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders the Podcasts page with fetched data', async () => {
    await act(async () => {
      const mockPodcasts: Podcast[] = [
        {
          id: '1',
          title: 'Podcast 1',
          author: 'Author 1',
          imageUrl: '',
          summary: 'Yahooo, this is working.',
          link: 'TBD',
        },
        {
          id: '2',
          title: 'Podcast 2',
          author: 'Author 2',
          imageUrl: '',
          summary: '',
          link: '',
        },
      ]
      ;(fetchPodcasts as jest.Mock).mockResolvedValue(mockPodcasts)
      render(<HomePage />)
      expect(fetchPodcasts).toHaveBeenCalledTimes(1)
    })
  })
})
