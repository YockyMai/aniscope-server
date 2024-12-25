import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import slugify from 'slugify'
import { AnilistAnime } from 'src/anilist-api/anilist-api.interface'
import { ShikimoriAnime } from 'src/shikimori-api/shikimori-api.interface'

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

    const edges = animes.slice(0, take).map((anime) => ({
      cursor: Buffer.from(anime.id.toString()).toString('base64'),
      node: anime
    }))

    const pageInfo = {
      hasNextPage: animes.length > take,
      endCursor: edges.length ? edges[edges.length - 1].cursor : null
    }
    console.log({ edges, pageInfo })
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

  public async createOneFromAnilistData(dto: AnilistAnime) {
    const createdAnime = await this.db.anime.upsert({
      where: {
        idAnilist: dto.id
      },
      create: {
        id: dto.id,
        idAnilist: dto.id,
        idMyAnimeList: dto.idMal,
        link: slugify(
          dto.title.english ??
            dto.title.userPreferred ??
            dto.title.native ??
            dto.id.toString(),
          {
            lower: true,
            replacement: '-'
          }
        ),
        banner: dto.bannerImage,
        title: dto.title.english ?? dto.title.romaji,
        titleJapan: dto.title.native,
        scoreAnilist: dto.averageScore,
        score: 0,
        description: dto.description,
        color: dto.coverImage.color,
        poster: dto.coverImage.medium,
        isLicensed: dto.isLicensed,
        season: dto.season,
        source: dto.source,
        format: dto.format,
        status: dto.status
      },
      update: {}
    })

    return createdAnime
  }

  public async createOneFromShikimoriData(dto: ShikimoriAnime) {
    const createdAnime = await this.db.anime.upsert({
      where: {
        idShikimori: dto.id,
        idMyAnimeList: dto.malId
      },
      create: {
        idShikimori: dto.id,
        idMyAnimeList: dto.malId,
        link: slugify(dto.english ?? dto.russian ?? dto.id.toString(), {
          lower: true,
          replacement: '-'
        })
      },
      update: {}
    })

    return createdAnime
  }
}
