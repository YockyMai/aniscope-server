import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { SignupInput } from 'src/auth/input/signup.input'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  public async findOneByLoginOrEmail(identifier: string) {
    const user =
      (await this.findOneByEmail(identifier)) ??
      (await this.findOneByLogin(identifier))

    if (!user) {
      return null
    }

    return user
  }

  public async findOneById(id: number) {
    return await this.db.user.findUnique({ where: { id } })
  }

  public async findOneByEmail(email: string) {
    const user = await this.db.user.findUnique({
      where: { email }
    })

    return user
  }

  public async findOneByLogin(login: string) {
    const user = await this.db.user.findUnique({
      where: { login }
    })

    return user
  }

  public async create(user: SignupInput) {
    const password = await bcrypt.hash(user.password, 10)

    const createdUser = await this.db.user.create({
      data: {
        ...user,
        password
      }
    })

    return createdUser
  }
}
