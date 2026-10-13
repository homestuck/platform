import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

import { skipValidation } from './helpers/skipValidation'

export const env = createEnv({
  emptyStringAsUndefined: true,
  runtimeEnv: {},
  server: {
    CHROMATIC_PROJECT_TOKEN: z.string(),
  },
  skipValidation,
})
