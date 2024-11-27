/**
 * @author Miguel Chumillas.
 * @description Configuration for the application.
 */

/** Dependencies. */
import type { NextConfig } from 'next'

/** Configuration. */
const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    loader: 'custom',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
}

/** Export configuration. */
export default nextConfig
