import type { Access } from 'payload'

export type EveryoneAccess = Access

export const everyoneAccess: Access = () => true
