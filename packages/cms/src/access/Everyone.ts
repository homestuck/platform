import type { User } from '#payload.types'
import type { FieldAccess, TypeWithID } from 'payload'

export const EveryoneAccess: FieldAccess<TypeWithID, User> = () => true
