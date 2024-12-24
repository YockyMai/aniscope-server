import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaClient } from '@prisma/client'
import _ from 'lodash'
import slugify from 'slugify'
import { AnilistAnime } from 'src/anilist-api/anilist-api.interface'
import { AnilistApiService } from 'src/anilist-api/anilist-api.service'
import { waitAsync } from 'src/common/utils/wait-async'
import { ShikimoriAnime } from 'src/shikimori-api/shikimori-api.interface'
import { ShikimoriApiService } from 'src/shikimori-api/shikimori-api.service'

import { DELAY_BETWEEN_QUERIES } from './parser.const'

@Injectable()
export class ParserService {
  constructor(
    private readonly shikimoriApi: ShikimoriApiService,
    private readonly anilistApi: AnilistApiService,
    private readonly db: PrismaClient
  ) {}

  onModuleInit() {
    // this.parseAnime()
  }

  @Cron(CronExpression.EVERY_DAY_AT_5AM)
  private async parseAnime() {
    // await this.parseAnilist()
    // await this.parseShikimori()
  }

  private async parseAnilist() {
    try {
      let currentPage = 1

      const animes: AnilistAnime[] = []
      const fetchAnimes = async () => {
        const pageData = await this.anilistApi.fetchAnimesByPage(currentPage)
        animes.push(...pageData)

        if (pageData.length) {
          currentPage++

          // artificial delay because anilist has restrictions on the number of requests per minute
          await waitAsync(DELAY_BETWEEN_QUERIES)

          await fetchAnimes()
        }
      }

      await fetchAnimes()

      for (const anime of animes) {
        const createdAnime = await this.db.anime.upsert({
          where: {
            idAnilist: anime.id
          },
          create: {
            id: anime.id,
            idAnilist: anime.id,
            idMyAnimeList: anime.idMal,
            link: slugify(
              anime.title.english ??
                anime.title.userPreferred ??
                anime.title.native ??
                anime.id.toString(),
              {
                lower: true,
                replacement: '-'
              }
            ),
            banner: anime.bannerImage,
            title: anime.title.english ?? anime.title.romaji,
            titleJapan: anime.title.native,
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

        // create anime genres
        for (const genre of anime.genres) {
          const createdGenre = await this.db.genre.upsert({
            where: {
              name: genre
            },
            create: {
              image: '',
              name: genre
            },
            update: {}
          })

          await this.db.animeGenre.upsert({
            where: {
              animeId_genreId: {
                animeId: createdAnime.id,
                genreId: createdGenre.id
              }
            },
            create: {
              animeId: createdAnime.id,
              genreId: createdGenre.id
            },
            update: {}
          })
        }

        // create anime tags
        for (const tag of anime.tags) {
          const createdTag = await this.db.tag.upsert({
            where: {
              id: tag.id
            },
            create: {
              id: tag.id,
              name: tag.name,
              description: tag.description,
              isAdult: tag.isAdult,
              category: tag.category,
              isGeneralSpoiler: tag.isGeneralSpoiler,
              isMediaSpoiler: tag.isMediaSpoiler,
              rank: tag.rank
            },
            update: {}
          })

          await this.db.animeTag.upsert({
            where: {
              animeId_tagId: {
                animeId: createdAnime.id,
                tagId: createdTag.id
              }
            },
            create: {
              animeId: createdAnime.id,
              tagId: createdTag.id
            },
            update: {}
          })
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  private async parseShikimori() {
    let currentPage = 1

    const animes: ShikimoriAnime[] = []

    const fetchAnimes = async () => {
      const pageData = await this.shikimoriApi.fetchAnimesByPage(currentPage)
      animes.push(...pageData)

      if (pageData.length) {
        currentPage++

        // artificial delay because anilist has restrictions on the number of requests per minute
        await waitAsync(DELAY_BETWEEN_QUERIES)

        await fetchAnimes()
      }
    }

    await fetchAnimes()

    // for (const anime of animes) {
    //   const createdAnime = this.db.anime.upsert({
    //     where: {

    //       idMyAnimeList: anime.malId,
    //     }
    //   })
    // }
  }
}
