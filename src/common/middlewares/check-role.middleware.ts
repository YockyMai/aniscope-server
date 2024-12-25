import { ForbiddenException } from '@nestjs/common'
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql'
import { Role, User } from '@prisma/client'

import { hasRoleAccess } from '../lib/has-role-access'

/**
 * Checks access to `graphql field` from the passed role
 *
 * For use:
 *
 * `@Field({ middlewares: [checkRoleMiddleware] })`
 *
 * `@Extension({ role: Role.[ROLE] })`
 */
export const checkRoleMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn
) => {
  const { info } = ctx
  const { extensions } = info.parentType.getFields()[info.fieldName]

  const userRole = (ctx.source as User).role

  if (!hasRoleAccess(userRole, extensions.role as Role)) {
    throw new ForbiddenException(
      `User does not have sufficient permissions to access "${info.fieldName}" field.`
    )
  }

  return next()
}
