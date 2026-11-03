import type { User } from '#payload.types'
import type { FieldAccess, TypeWithID } from 'payload'

export const isAuthenticated: (user: null | User) => boolean = Boolean

export type AuthenticatedAccess = FieldAccess<TypeWithID, User>

export const authenticatedAccess: AuthenticatedAccess = ({ req: { user } }) => isAuthenticated(user)
