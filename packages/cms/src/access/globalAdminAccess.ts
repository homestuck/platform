import type { User } from '#payload.types'
import type { FieldAccess, TypeWithID } from 'payload'

export type GlobalAdminAccess = FieldAccess<TypeWithID, User>

export const isGlobalAdmin: (user: null | User) => boolean = (user) => Boolean(user?.isGlobalAdmin)

export const globalAdminAccess: GlobalAdminAccess = ({ req: { user } }) => isGlobalAdmin(user)
