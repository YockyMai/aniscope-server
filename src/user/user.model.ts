import { Field, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'
import { Role } from '@prisma/client'

@ObjectType()
export class User {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  email: string

  @Field(() => String, { nullable: true })
  banner: string

  @Field(() => String, { nullable: true })
  avatar: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  birthday: Date

  @Field({ nullable: true })
  login: string

  @Field(() => Role)
  role: Role
}
