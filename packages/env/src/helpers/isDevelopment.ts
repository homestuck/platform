import { env as nodeEnv } from '../node'

export const isDevelopment = nodeEnv.NODE_ENV === 'development'
