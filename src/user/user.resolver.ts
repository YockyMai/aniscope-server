import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver('User')
export class UserResolver {
  @Query()
  async user(@Args('id') id: number) {
    return {
      id,
      name: 'qwe'
    }
  }
}
