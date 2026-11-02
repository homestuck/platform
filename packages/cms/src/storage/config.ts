import type { StorageAdapter } from 'payload'

import { s3Storage } from '@payloadcms/storage-s3'

import { env } from '@homestuck/env/s3'

export const storageConfigs: StorageAdapter[] = [
  s3Storage({
    acl: 'private',
    bucket: env.S3_BUCKET,
    collections: {
      assets: {
        prefix: '',
      },
    },
    config: {
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY_ID,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY,
      },
      endpoint: env.S3_ENDPOINT,
      region: env.S3_REGION,
    },
  }),
]
