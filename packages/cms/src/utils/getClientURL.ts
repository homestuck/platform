import { env as clientEnv } from '@homestuck/env/next'
import { canUseDOM } from '@homestuck/utils/canUseDOM'

export const getClientURL = () => {
  if (canUseDOM) {
    const protocol = globalThis.location.protocol
    const domain = globalThis.location.hostname
    const port = globalThis.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return clientEnv.NEXT_PUBLIC_APP_URL || ''
}
