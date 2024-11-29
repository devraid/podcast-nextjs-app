/**
 * @author Miguel Chumillas.
 * @description Root layout for the application.
 */

/** Dependencies. */
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { PodcastsProvider } from '@/app/store/podcasts'
import { PodcastDetailProvider } from '@/app/store/detail/podcast'
import '@/app/globals.scss'

/** Fonts Configuration. */
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
})

/** Metadata Configuration. */
export const metadata: Metadata = {
  title: 'Podcaster Next App',
  description: 'A Podcast app built with Next.js',
}

/** Viewport. */
export const viewport = 'width=device-width, initial-scale=1'

/**
 * Root layout component wrapping all pages.
 *
 * @param {Readonly<{ children: ReactNode }>} props - Layout properties.
 * @returns {JSX.Element} - The root layout structure.
 */
const RootLayout: React.FC<Readonly<{ children: ReactNode }>> = ({
  children,
}: Readonly<{ children: ReactNode }>): JSX.Element => (
  <PodcastsProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PodcastDetailProvider>{children}</PodcastDetailProvider>
      </body>
    </html>
  </PodcastsProvider>
)

export default RootLayout
