import { defineConfig } from 'vite-plus'

import fmt from '@homestuck/oxfmt-config'
import lint from '@homestuck/oxlint-config'

export default defineConfig({
  fmt,
  lint: {
    ...lint,
    options: { reportUnusedDisableDirectives: 'warn', typeAware: true, typeCheck: true },
  },
  staged: {
    '*': 'vp check --fix',
  },
})
