import { ArgsType, Field, Int } from '@nestjs/graphql'

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true, defaultValue: 30 })
  first?: number

  @Field({ nullable: true })
  after?: string
}
