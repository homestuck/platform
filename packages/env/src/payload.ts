import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

import { skipValidation } from './helpers/skipValidation'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_PAYLOAD_URL: z.url(),
  },
  clientPrefix: 'NEXT_PUBLIC_',
  emptyStringAsUndefined: true,
  // runtimeEnv: {
  //   NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
  // },
  runtimeEnv: process.env,
  server: {
    PAYLOAD_PRIVATE_DATABASE_ENGINE: z.enum(['mongo']).default('mongo'),
    PAYLOAD_PRIVATE_DATABASE_URI: z.string(),
    PAYLOAD_PRIVATE_REVALIDATION_KEY: z.string(),
    PAYLOAD_PRIVATE_SECRET: z.string(),
  },
  shared: {},
  skipValidation,
})
