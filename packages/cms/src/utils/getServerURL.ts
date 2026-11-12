import { env as serverEnv } from '@homestuck/env/payload'

export const getServerURL = () => {
  let url = serverEnv.NEXT_PUBLIC_PAYLOAD_URL

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}
