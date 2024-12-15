import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AnimeStudio {
  @Field(() => Int)
  id: number

  @Field()
  name: string
}
