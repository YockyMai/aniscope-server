import { Field, Int, ObjectType } from '@nestjs/graphql'
import { EpisodeTranslation } from 'src/episode-translation/episode-translation.model'

@ObjectType()
export class AnimeEpisode {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  image?: string

  @Field(() => EpisodeTranslation)
  translations: EpisodeTranslation[]
}
