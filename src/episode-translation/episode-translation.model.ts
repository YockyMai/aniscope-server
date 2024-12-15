import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class EpisodeTranslation {
  @Field(() => Int)
  id: number

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  image?: string
}
