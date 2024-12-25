import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { CreateAnimeDto } from './anime.interface'
import { AnimesArgs } from './dto/animes.input'

@Injectable()
export class AnimeService {
  constructor(private readonly db: PrismaClient) {}

  public async findById(id: number) {
    const anime = await this.db.anime.findUnique({ where: { id } })

    return anime
  }

  public async findAll(args?: AnimesArgs) {
    const { after, first } = args

    const take = first ?? 30
    const cursor = after
      ? { id: Number(Buffer.from(after, 'base64').toString('ascii')) }
      : undefined

    const animes = await this.db.anime.findMany({
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor,
      orderBy: { id: 'asc' }
    })

    const edges = animes.slice(0, take).map((post) => ({
      cursor: Buffer.from(post.id.toString()).toString('base64'),
      node: post
    }))

    const pageInfo = {
      hasNextPage: animes.length > take,
      endCursor: edges.length ? edges[edges.length - 1].cursor : null
    }

    return {
      edges,
      pageInfo
    }
  }

  public async createOne(dto: CreateAnimeDto) {
    const createdAnime = await this.db.anime.create({
      data: {
        id: dto.idAnilist,
        ...dto
      }
    })

    return createdAnime
  }
}
