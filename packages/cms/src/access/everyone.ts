import type { Access, TypeWithID } from 'payload'

export type EveryoneAccess = Access<TypeWithID>

export const everyoneAccess: EveryoneAccess = () => true
