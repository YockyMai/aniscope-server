import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { CreateAnimeDto } from './anime.interface'

@Injectable()
export class AnimeService {
  constructor(private readonly db: PrismaClient) {}

  async createOne(dto: CreateAnimeDto) {
    const createdAnime = await this.db.anime.create({
      data: {
        id: dto.alId,
        ...dto
      }
    })

    return createdAnime
  }
}
