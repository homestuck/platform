import type { User } from '#payload.types'
import type { Access, FieldAccess, TypeWithID } from 'payload'

export type GlobalAdminAccess = Access<TypeWithID> & FieldAccess<TypeWithID>

export const isGlobalAdmin: (user: null | User) => boolean = (user) => Boolean(user?.isGlobalAdmin)

export const globalAdminAccess: GlobalAdminAccess = ({ req: { user } }) => isGlobalAdmin(user)
