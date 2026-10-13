import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

import { skipValidation } from './helpers/skipValidation'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
  },
  clientPrefix: 'NEXT_PUBLIC_',
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.PUBLIC_URL,
  },
  server: {
    PUBLIC_URL: z.url(),
  },
  shared: {},
  skipValidation,
})
