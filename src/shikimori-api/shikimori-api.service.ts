import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { Injectable } from '@nestjs/common'

import { ANIMES } from './queries/animes'
import {
  ShikimoriAnime,
  ShikimoriAnimeResponse
} from './shikimori-api.interface'

@Injectable()
export class ShikimoriApiService {
  private readonly client: ApolloClient<any>

  constructor() {
    this.client = new ApolloClient({
      uri: 'https://shikimori.one/api/graphql',
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: 'no-cache'
        }
      }
    })
  }

  public async fetchAnimesByMalIds(ids: number[], page: number) {
    const result = await this.client.query<{
      animes: ShikimoriAnimeResponse[]
    }>({
      query: ANIMES,
      variables: {
        page
      }
    })

    return result.data.animes
      .map((anime) => ({
        ...anime,
        id: parseInt(anime.id),
        malId: parseInt(anime.malId)
      }))
      .filter(({ malId }) => ids.includes(malId)) as ShikimoriAnime[]
  }

  public async fetchAnimesByPage(page: number) {
    const result = await this.client.query<{
      animes: ShikimoriAnimeResponse[]
    }>({
      query: ANIMES,
      variables: {
        page
      }
    })

    return result.data.animes.map((anime) => ({
      ...anime,
      id: parseInt(anime.id),
      malId: parseInt(anime.malId)
    }))
  }
}
