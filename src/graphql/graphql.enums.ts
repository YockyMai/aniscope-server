import { registerEnumType } from '@nestjs/graphql'
import { Format, Source, Status, Season, VideoType, Role } from '@prisma/client'

registerEnumType(Role, {
  name: 'Role'
})
registerEnumType(Season, {
  name: 'Season'
})
registerEnumType(Status, {
  name: 'Status'
})
registerEnumType(Source, {
  name: 'Source'
})
registerEnumType(VideoType, {
  name: 'VideoType'
})
registerEnumType(Format, {
  name: 'Format'
})
