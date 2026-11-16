import type { User } from '#payload.types'
import type { Access, FieldAccess, TypeWithID } from 'payload'

export type AuthenticatedAccess = Access<TypeWithID> & FieldAccess<TypeWithID>

export const isAuthenticated: (user: null | User) => boolean = Boolean

export const authenticatedAccess: AuthenticatedAccess = ({ req: { user } }) => isAuthenticated(user)
