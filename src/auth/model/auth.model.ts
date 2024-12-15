import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Login {
  @Field(() => Int)
  id: number

  @Field(() => String)
  name: string
}
