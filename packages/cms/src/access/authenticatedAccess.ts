import type { User } from '#payload.types'
import type { FieldAccess, TypeWithID } from 'payload'

export type AuthenticatedAccess = FieldAccess<TypeWithID, User>

export const isAuthenticated: (user: null | User) => boolean = Boolean

export const authenticatedAccess: AuthenticatedAccess = ({ req: { user } }) => isAuthenticated(user)
