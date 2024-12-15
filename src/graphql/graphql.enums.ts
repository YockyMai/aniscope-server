import { registerEnumType } from '@nestjs/graphql'
import {
  AnimeSeason,
  AnimeStatus,
  AnimeType,
  AnimeVideoType,
  Role
} from '@prisma/client'

registerEnumType(Role, {
  name: 'Role'
})
registerEnumType(AnimeType, {
  name: 'AnimeType'
})
registerEnumType(AnimeStatus, {
  name: 'AnimeStatus'
})
registerEnumType(AnimeSeason, {
  name: 'AnimeSeason'
})
registerEnumType(AnimeVideoType, {
  name: 'AnimeVideoType'
})
