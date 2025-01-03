import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { User } from 'src/user/user.model'

import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'identifier',
      passwordField: 'password'
    })
  }

  async validate(identifier: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(identifier, password)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
