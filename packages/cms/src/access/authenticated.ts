import type { User } from '#payload.types'
import type { Access, TypeWithID } from 'payload'

export type AuthenticatedAccess = Access<TypeWithID>

export const isAuthenticated: (user: null | User) => boolean = Boolean

export const authenticatedAccess: AuthenticatedAccess = ({ req: { user } }) => isAuthenticated(user)
