import { defineConfig } from 'vite-plus'

import oxfmtConfig from '@homestuck/oxfmt-config'
import oxlintConfig from '@homestuck/oxlint-config'

export default defineConfig({
  fmt: {
    ...oxfmtConfig,
    ignorePatterns: [...oxfmtConfig.ignorePatterns, 'apps/admin/src/app/(payload)/**'],
  },
  lint: {
    ...oxlintConfig,
    ignorePatterns: [...oxlintConfig.ignorePatterns, 'apps/admin/src/app/(payload)/**'],
    options: { reportUnusedDisableDirectives: 'warn', typeAware: true, typeCheck: true },
    overrides: [
      {
        files: ['packages/cms/src/**'],
        rules: {
          'unicorn/filename-case': [
            'error',
            {
              cases: {
                camelCase: true,
              },
              ignore: ['^.*DOM.*$', '^.*URL.*$'],
            },
          ],
        },
      },
      {
        files: ['packages/cms/src/blocks/**', 'packages/cms/src/components/**'],
        rules: {
          'unicorn/filename-case': [
            'error',
            {
              cases: {
                kebabCase: true,
                pascalCase: true,
              },
              ignore: ['^.*DOM.*$', '^.*URL.*$'],
            },
          ],
        },
      },
      {
        files: ['packages/cms/src/collections/**', 'packages/cms/src/globals/**'],
        rules: {
          'unicorn/filename-case': [
            'error',
            {
              cases: {
                camelCase: true,
                pascalCase: true,
              },
              ignore: ['^.*DOM.*$', '^.*URL.*$'],
            },
          ],
        },
      },
      {
        files: ['packages/ui/src/components/**'],
        rules: { 'shadcn/no-restyle': 'off' },
      },
    ],
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
