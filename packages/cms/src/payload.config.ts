import type { Config } from 'payload'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig, deepMerge } from 'payload'

import { env as payloadEnv } from '@homestuck/env/payload'

import { blockConfigs as blocks } from './blocks/config'
import { collectionConfigs as collections } from './collections/config'
import { editorConfig as editor } from './editor/config'
import { globalConfigs as globals } from './globals/config'
import { localization, i18nConfig as i18n } from './i18n/config'
import { jobsConfig as jobs } from './jobs/config'
import { pluginConfigs as plugins } from './plugins/config'
import { storageConfigs as storage } from './storage/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const payloadConfig = (overrides: Partial<Config> = {}) =>
  buildConfig(
    deepMerge(
      {
        admin: {
          user: 'users',
        },
        blocks,
        collections,
        db: mongooseAdapter({
          url: payloadEnv.PAYLOAD_PRIVATE_DATABASE_URI,
        }),
        editor,
        globals,
        i18n,
        jobs,
        llmInstructions: false,
        localization,
        plugins: plugins,
        secret: payloadEnv.PAYLOAD_PRIVATE_SECRET,
        storage,
        typescript: {
          outputFile: path.resolve(dirname, 'payload.types.ts'),
        },
      } satisfies Config,
      overrides,
    ),
  )

export default payloadConfig()
