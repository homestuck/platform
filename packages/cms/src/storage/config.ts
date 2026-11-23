import type { StorageAdapter } from 'payload'

import { s3Storage } from '@payloadcms/storage-s3'

import { env as s3Env } from '@homestuck/env/s3'

export const storageConfigs = [
  s3Storage({
    acl: 'private',

    bucket: s3Env.S3_BUCKET,
    collections: {
      assets: {
        prefix: '',
      },
      icons: {
        prefix: 'assets',
      },
      panels: {
        prefix: '',
      },
    },
    config: {
      credentials: {
        accessKeyId: s3Env.S3_ACCESS_KEY_ID,
        secretAccessKey: s3Env.S3_SECRET_ACCESS_KEY,
      },
      endpoint: s3Env.S3_ENDPOINT,
      region: s3Env.S3_REGION,
    },
  }),
] as const satisfies StorageAdapter[]
