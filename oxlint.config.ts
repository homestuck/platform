import { defineConfig } from 'oxlint'

import baseConfig from '@homestuck/oxlint-config'

export default defineConfig({
  extends: [baseConfig],
  options: {
    reportUnusedDisableDirectives: 'warn',
    typeAware: true,
    typeCheck: true,
  },
})
