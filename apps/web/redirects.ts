import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        key: 'user-agent',
        type: 'header' as const,
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  return [internetExplorerRedirect]
}
