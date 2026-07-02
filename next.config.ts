import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Collabculture',
  assetPrefix: '/Collabculture/',
}

export default nextConfig