import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { ShikimoriApiService } from 'src/shikimori-api/shikimori-api.service'

@Injectable()
export class ParserService {
  constructor(private shikimoriApi: ShikimoriApiService) {}

  @Cron(CronExpression.EVERY_DAY_AT_5AM)
  private async parse() {
    let currentPage = 0

    const animes = []
    const fillPage = async () => {
      currentPage++
      const result = await this.shikimoriApi.fetchAnimes(currentPage)

      animes.push(...result.data.animes)

      if (result.data.animes.length) {
        await fillPage()
      }
    }

    await fillPage()
  }
}
