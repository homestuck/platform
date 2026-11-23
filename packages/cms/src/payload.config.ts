import type { Config } from 'payload'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { sharpTransformer } from '@payloadcms/transformer-sharp'
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
import { getServerURL } from './utils/getServerURL'

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
        cors: [getServerURL()].filter(Boolean),
        db: mongooseAdapter({
          url: payloadEnv.PAYLOAD_PRIVATE_DATABASE_URI,
        }),
        defaultDepth: 1,
        editor,
        globals,
        i18n,
        jobs,
        llmInstructions: false,
        localization,
        plugins,
        secret: payloadEnv.PAYLOAD_PRIVATE_SECRET,
        storage,
        typescript: {
          outputFile: path.resolve(dirname, 'payload.types.ts'),
        },
        upload: {
          transformers: [
            sharpTransformer({
              collections: {
                icons: {
                  variants: [
                    {
                      height: 16,
                      name: '16x16',
                      position: 'centre',
                      width: 16,
                    },
                    {
                      height: 32,
                      name: '32x32',
                      position: 'centre',
                      width: 32,
                    },
                    {
                      height: 48,
                      name: '48x48',
                      position: 'centre',
                      width: 48,
                    },
                    {
                      height: 180,
                      name: 'apple-touch-icon-180x180',
                      position: 'centre',
                      width: 180,
                    },
                    {
                      height: 192,
                      name: 'android-chrome-192x192',
                      position: 'centre',
                      width: 192,
                    },
                    {
                      height: 512,
                      name: 'android-chrome-512x512',
                      position: 'centre',
                      width: 512,
                    },
                  ],
                },
              },
            }),
          ],
        },
      } satisfies Config,
      overrides,
    ),
  )

export default payloadConfig()
