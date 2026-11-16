import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

import { skipValidation } from './helpers/skipValidation'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
  },
  clientPrefix: 'NEXT_PUBLIC_',
  emptyStringAsUndefined: true,
  runtimeEnvStrict: {
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  server: {
    APP_URL: z.url(),
  },
  shared: {},
  skipValidation,
})
