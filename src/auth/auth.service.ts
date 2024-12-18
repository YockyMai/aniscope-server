import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/user.model'
import { UserService } from 'src/user/user.service'

import { SignupInput } from './input/signup.input'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser(identifier: string, password: string) {
    const user = await this.userService.findOneByLoginOrEmail(identifier)

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (user && isPasswordMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }

    return null
  }

  public async login(user: User) {
    const accessToken = this.jwtService.sign(user)

    return {
      user,
      accessToken
    }
  }

  public async signup(user: SignupInput) {
    const createdUser = await this.userService.create(user)

    if (!createdUser) {
      throw new UnauthorizedException()
    }

    const accessToken = this.jwtService.sign(createdUser)

    return { user: createdUser, accessToken }
  }
}
