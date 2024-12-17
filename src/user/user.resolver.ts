import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'

import { User } from './user.model'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args('id') id: number) {
    return await this.userService.findOneById(id)
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User) {
    return user
  }
}
