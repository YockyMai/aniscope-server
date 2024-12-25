import { Role } from '@prisma/client'

export const hasRoleAccess = (userRole: Role, requiredRole: Role) => {
  const roleHierarchy: Role[] = [
    Role.USER,
    Role.DEVELOPER,
    Role.MODERATOR,
    Role.ADMIN
  ]

  return roleHierarchy.indexOf(userRole) >= roleHierarchy.indexOf(requiredRole)
}
