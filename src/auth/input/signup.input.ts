import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql'

@InputType()
export class SignupInput {
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

  @Field()
  password: string
}
