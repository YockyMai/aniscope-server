import { Field, ObjectType } from '@nestjs/graphql'
import { PageInfo } from 'src/common/dto/page-info.model'

import { Anime } from './anime.model'

@ObjectType()
export class Animes {
  @Field(() => [AnimeEdge])
  edges: AnimeEdge[]

  @Field(() => PageInfo)
  pageInfo: PageInfo
}

@ObjectType()
class AnimeEdge {
  @Field(() => [Anime])
  nodes: Anime[]

  @Field()
  cursor: string
}
