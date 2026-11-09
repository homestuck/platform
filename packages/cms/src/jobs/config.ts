import type { JobsConfig } from 'payload'

import { createHomePage } from './tasks/createHomePage'

export const jobsConfig = {
  tasks: [createHomePage],
} as const satisfies JobsConfig
