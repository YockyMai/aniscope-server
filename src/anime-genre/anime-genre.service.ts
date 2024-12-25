import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class AnimeGenreService {
  constructor(private readonly db: PrismaClient) {}

  public async findAll() {
    return await this.db.genre.findMany()
  }

  public async findByAnimeId(animeId: number) {
    const animeGenres = await this.db.animeGenre.findMany({
      where: { animeId },
      select: { genre: true }
    })

    return animeGenres.map(({ genre }) => genre)
  }
}
