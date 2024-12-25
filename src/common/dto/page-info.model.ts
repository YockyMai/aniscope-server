import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PageInfo {
  @Field(() => Boolean)
  hasNextPage: boolean

  @Field()
  endCursor: string
}
