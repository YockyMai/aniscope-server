import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AnimeGenre {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  image: string
}
