/**
 * @author Miguel Chumillas.
 * @description Configuration for the application.
 */

/** Dependencies. */
import type { NextConfig } from 'next'
import path from 'path'

/** Configuration. */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    silenceDeprecations: ['legacy-js-api'],
  },
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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|svg)$/i,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 10 * 1024,
        },
      },
    })

    return config
  },
}

/** Export configuration. */
export default nextConfig
