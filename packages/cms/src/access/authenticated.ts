import type { User } from '#payload.types'
import type { FieldAccess, TypeWithID } from 'payload'

export const AuthenticatedAccess: FieldAccess<TypeWithID, User> = ({ req: { user } }) =>
  Boolean(user)
