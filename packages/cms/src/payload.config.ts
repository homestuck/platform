import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'

// import { env as nodeEnv } from '@homestuck/env/node'
import { env as payloadEnv } from '@homestuck/env/payload'

import { collectionConfigs } from './collections/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: collectionConfigs,
  db: mongooseAdapter({
    url: payloadEnv.PAYLOAD_PRIVATE_DATABASE_URI ?? '',
  }),
  secret: payloadEnv.PAYLOAD_PRIVATE_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload.types.ts'),
  },
})
