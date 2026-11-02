import type { User } from '#payload.types'
import type { FieldAccess, TypeWithID } from 'payload'

export const isGlobalAdmin: (user: null | User) => boolean = (user) => Boolean(user?.isGlobalAdmin)

export const GlobalAdminAccess: FieldAccess<TypeWithID, User> = ({ req: { user } }) =>
  isGlobalAdmin(user)
