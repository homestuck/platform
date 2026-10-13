import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

import { skipValidation } from './helpers/skipValidation'

export const env = createEnv({
  emptyStringAsUndefined: true,
  runtimeEnv: {},
  server: {
    S3_ACCESS_KEY_ID: z.string(),
    S3_BUCKET: z.string(),
    S3_ENDPOINT: z.url(),
    S3_REGION: z.string(),
    S3_SECRET_ACCESS_KEY: z.string(),
  },
  skipValidation,
})
