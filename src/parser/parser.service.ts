import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Genre, PrismaClient } from '@prisma/client'
import slugify from 'slugify'
import { AnilistAnime } from 'src/anilist-api/anilist-api.interface'
import { AnilistApiService } from 'src/anilist-api/anilist-api.service'
import { AnimeService } from 'src/anime/anime.service'
import { waitAsync } from 'src/common/utils/wait-async'
import { ShikimoriAnime } from 'src/shikimori-api/shikimori-api.interface'
import { ShikimoriApiService } from 'src/shikimori-api/shikimori-api.service'

@Injectable()
export class ParserService {
  constructor(
    private readonly shikimoriApi: ShikimoriApiService,
    private readonly anilistApi: AnilistApiService,
    private readonly animeService: AnimeService,
    private readonly db: PrismaClient
  ) {}

  onModuleInit() {
    this.parseAnime()
  }

  @Cron(CronExpression.EVERY_DAY_AT_5AM)
  private async parseAnime() {
    await this.parseAnilist()

    await this.parseShikimori()

    console.log('anime successfully parsed')
  }

  private async parseAnilist() {
    await this.db.$transaction(async () => {
      try {
        let currentPage = 1

        const animes: AnilistAnime[] = []
        const fetchAnimes = async () => {
          const pageData = await this.anilistApi.fetchAnimes(currentPage)
          animes.push(...pageData)

          if (pageData.length && currentPage <= 5) {
            currentPage++

            await fetchAnimes()
          }
        }

        await fetchAnimes()

        for (const anime of animes) {
          const animeGenres = await Promise.all(
            anime.genres.map(
              async (name) =>
                await this.db.genre.upsert({
                  where: {
                    name
                  },
                  create: {
                    image: '',
                    name
                  },
                  update: {}
                })
            )
          )

          const animeTags = await Promise.all(
            anime.tags.map(
              async (tag) =>
                await this.db.tag.upsert({
                  where: {
                    id: tag.id
                  },
                  create: {
                    name: tag.name,
                    category: tag.category,
                    description: tag.description,
                    id: tag.id,
                    isAdult: tag.isAdult,
                    isGeneralSpoiler: tag.isGeneralSpoiler,
                    isMediaSpoiler: tag.isMediaSpoiler,
                    rank: tag.rank
                  },
                  update: {}
                })
            )
          )

          await this.db.anime.upsert({
            where: {
              idAnilist: anime.id
            },
            create: {
              id: anime.id,
              idAnilist: anime.id,
              idMyAnimeList: anime.idMal,
              link: slugify(anime.title.english, {
                lower: true,
                replacement: '-'
              }),
              banner: anime.bannerImage,
              genres: {
                connect: animeGenres.map((genre) => ({
                  animeId_genreId: {
                    animeId: anime.id,
                    genreId: genre.id
                  }
                }))
              },
              tags: {
                connect: animeTags.map((tag) => ({
                  tagId_animeId: {
                    tagId: tag.id,
                    animeId: anime.id
                  }
                }))
              },
              scoreAnilist: anime.averageScore,
              score: 0,
              description: anime.description,
              color: anime.coverImage.color,
              poster: anime.coverImage.medium,
              isLicensed: anime.isLicensed,
              season: anime.season,
              source: anime.source,
              format: anime.format,
              status: anime.status
            },
            update: {}
          })
        }
      } catch (error) {
        console.error(error)
      }
    })
  }

  private parseShikimori() {}
}
