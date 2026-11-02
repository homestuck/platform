import { env as clientEnv } from '@homestuck/env/next'
import { env as serverEnv } from '@homestuck/env/payload'
import { canUseDOM } from '@homestuck/utils/canUseDOM'

export const getServerSideURL = () => {
  let url = serverEnv.NEXT_PUBLIC_PAYLOAD_URL

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = globalThis.location.protocol
    const domain = globalThis.location.hostname
    const port = globalThis.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return clientEnv.NEXT_PUBLIC_APP_URL || ''
}
