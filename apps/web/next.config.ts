import type { NextConfig } from 'next'
// import path from 'node:path'

import { withPayload } from '@payloadcms/next/withPayload'

import { env } from '@homestuck/env/payload'

import { redirects } from './redirects'

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    qualities: [100],
    remotePatterns: [env.NEXT_PUBLIC_PAYLOAD_URL].map((item) => {
      const url = new URL(item)
      return {
        hostname: url.hostname,
        protocol: url.protocol.replace(':', ''),
      } as URL
    }),
  },
  partialPrefetching: true,
  reactCompiler: true,
  reactStrictMode: true,
  redirects,
  turbopack: {
    rules: {
      '*.css': {
        as: '*.css',
        loaders: ['@tailwindcss/turbopack'],
      },
    },
  },
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (webpackConfig) => {
    // oxlint-disable-next-line @typescript-eslint/no-unsafe-member-access
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    // oxlint-disable-next-line @typescript-eslint/no-unsafe-return
    return webpackConfig
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
})
