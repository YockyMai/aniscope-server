import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { User } from 'src/user/user.model'

import { AuthService } from './auth.service'
import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard'
import { SignupInput } from './input/signup.input'
import { Login } from './model/login.model'
import { Signup } from './model/signup.model'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Login)
  @UseGuards(GqlLocalAuthGuard)
  async login(
    @Args('identifier') identifier: string,
    @Args('password') password: string,
    @CurrentUser() user: User
  ) {
    return await this.authService.login(user)
  }

  @Mutation(() => Signup)
  async signup(@Args('signupInput') signupInput: SignupInput) {
    return await this.authService.signup(signupInput)
  }
}
