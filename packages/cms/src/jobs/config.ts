import type { JobsConfig } from 'payload'

import { createHomePage } from './tasks/createHomePage'

export const jobsConfig: JobsConfig = {
  tasks: [createHomePage],
}
