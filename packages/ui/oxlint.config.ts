import { defineConfig } from 'oxlint'

import baseConfig from '@homestuck/oxlint-config'

export default defineConfig({
  extends: [baseConfig],
  overrides: [
    {
      files: ['src/components/**'],
      rules: { 'shadcn/no-restyle': 'off' },
    },
  ],
})
