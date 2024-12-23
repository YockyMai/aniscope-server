import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaClient } from '@prisma/client'
import slugify from 'slugify'
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
    console.log('parsing anime started')

    await this.db.$transaction(async () => {
      try {
        let currentPage = 1

        const shikimoriAnimes: ShikimoriAnime[] = []
        const fillShikimoriAnimes = async () => {
          const pageData = await this.shikimoriApi.fetchAnimes(currentPage, 30)
          shikimoriAnimes.push(...pageData)

          if (pageData.length && currentPage <= 5) {
            currentPage++

            await fillShikimoriAnimes()
          }
        }

        await fillShikimoriAnimes()

        for (const shikimoriAnime of shikimoriAnimes) {
          const anilistAnime = await this.anilistApi.fetchAnimeByMalId(
            shikimoriAnime.malId
          )

          await this.db.anime.upsert({
            where: {
              idShikimori: shikimoriAnime.id
            },
            create: {
              idShikimori: shikimoriAnime.id,
              idAnilist: anilistAnime.id,
              idMyAnimeList: shikimoriAnime.malId,
              banner: anilistAnime.bannerImage,
              color: anilistAnime.coverImage?.color,
              createdAt: new Date(),
              description: anilistAnime.description,
              descriptionRu: anilistAnime.description,
              title: anilistAnime.title.english!,
              titleRu: shikimoriAnime.russian,
              englishTitles: [],
              japanTitles: [],
              isLicensed: anilistAnime.isLicensed,
              format: anilistAnime.format,
              link: slugify(anilistAnime.title.english!, {
                lower: true,
                replacement: '-'
              }),
              minimalAge: 0,
              otherTitles: [],
              poster: anilistAnime.coverImage.large,
              score: 0,
              scoreAnilist: anilistAnime.averageScore,
              scoreShikimori: shikimoriAnime.score,
              ratingMpa: '',
              source: anilistAnime.source,
              release: new Date(),
              status: anilistAnime.status,
              season: anilistAnime.season,
              synonyms: [],
              titleJapan: '',
              updatedAt: new Date()
            },
            update: {
              updatedAt: new Date(),
              scoreAnilist: anilistAnime.meanScore
            }
          })

          await waitAsync(3000)
        }
      } catch (error) {
        console.error('anime parsing error', error)
      }
    })

    console.log('anime successfully parsed')
  }
}
