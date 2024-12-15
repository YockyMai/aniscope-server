import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AnimeGenre {
  @Field(() => Int)
  id: number

  @Field(() => String)
  name: string

  @Field(() => String)
  image: string
}
