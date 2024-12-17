import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/user/user.model'

@ObjectType()
export class Login {
  @Field(() => User)
  user: User

  @Field()
  accessToken: string
}
