import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AnimeReview {
  @Field(() => Int)
  id: number

  @Field(() => Int)
  rating: number

  @Field({ nullable: true })
  comment?: string

  @Field(() => Boolean)
  verified: boolean
}
