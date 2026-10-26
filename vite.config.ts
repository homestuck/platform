import { defineConfig } from 'vite-plus'

import oxfmtConfig from '@homestuck/oxfmt-config'
import oxlintConfig from '@homestuck/oxlint-config'

export default defineConfig({
  fmt: oxfmtConfig,
  lint: {
    ...oxlintConfig,
    options: { reportUnusedDisableDirectives: 'warn', typeAware: true, typeCheck: true },
  },
  run: {
    tasks: {
      check: 'vp check',
    },
  },
  staged: {
    '*': 'vp check --fix',
  },
})
