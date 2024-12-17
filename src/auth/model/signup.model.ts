import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/user/user.model'

@ObjectType()
export class Signup {
  @Field(() => User)
  user: User

  @Field()
  accessToken: string
}
