import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

import { skipValidation } from './helpers/skipValidation'

export const env = createEnv({
  client: {
    PAYLOAD_PUBLIC_PAYLOAD_URL: z.url(),
  },
  clientPrefix: 'PAYLOAD_PUBLIC_',
  emptyStringAsUndefined: true,
  // runtimeEnv: process.env,
  runtimeEnvStrict: {
    PAYLOAD_PRIVATE_DATABASE_ENGINE: process.env.PAYLOAD_PRIVATE_DATABASE_ENGINE,
    PAYLOAD_PRIVATE_DATABASE_URI: process.env.PAYLOAD_PRIVATE_DATABASE_URI,
    PAYLOAD_PRIVATE_REVALIDATION_KEY: process.env.PAYLOAD_PRIVATE_REVALIDATION_KEY,
    PAYLOAD_PRIVATE_SECRET: process.env.PAYLOAD_PRIVATE_SECRET,
    PAYLOAD_PUBLIC_PAYLOAD_URL: process.env.PUBLIC_URL,
    PUBLIC_URL: process.env.PUBLIC_URL,
  },
  server: {
    PAYLOAD_PRIVATE_DATABASE_ENGINE: z.enum(['mongo', 'sqlite']).default('mongo'),
    PAYLOAD_PRIVATE_DATABASE_URI: z.string(),
    PAYLOAD_PRIVATE_REVALIDATION_KEY: z.string(),
    PAYLOAD_PRIVATE_SECRET: z.string(),
    PUBLIC_URL: z.url(),
  },
  shared: {},
  skipValidation,
})
