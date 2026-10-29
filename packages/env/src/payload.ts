import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

import { skipValidation } from './helpers/skipValidation'
import { env as nodeEnv } from './node'

const isDevelopment = nodeEnv.NODE_ENV === 'development'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_PAYLOAD_URL: z.url(),
  },
  clientPrefix: 'NEXT_PUBLIC_',
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
  },
  server: {
    PAYLOAD_PRIVATE_DATABASE_ENGINE: z.enum(['mongo']).default('mongo'),
    PAYLOAD_PRIVATE_DATABASE_URI: isDevelopment ? z.string().optional() : z.string(),
    PAYLOAD_PRIVATE_REVALIDATION_KEY: isDevelopment ? z.string().optional() : z.string(),
    PAYLOAD_PRIVATE_SECRET: isDevelopment ? z.string().optional() : z.string(),
  },
  shared: {},
  skipValidation,
})
