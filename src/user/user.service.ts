import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'

import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  public async findUser(id: number) {
    return this.db.user.findUnique({ where: { id } })
  }

  public async createUser(user: CreateUserDto) {
    return this.db.user.create({ data: user })
  }
}
