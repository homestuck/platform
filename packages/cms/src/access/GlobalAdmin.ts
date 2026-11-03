import type { User } from '#payload.types'
import type { FieldAccess, TypeWithID } from 'payload'

export const isGlobalAdmin: (user: null | User) => boolean = (user) => Boolean(user?.isGlobalAdmin)

type GlobalAdminAccess = FieldAccess<TypeWithID, User>

export const globalAdminAccess: GlobalAdminAccess = ({ req: { user } }) => isGlobalAdmin(user)
