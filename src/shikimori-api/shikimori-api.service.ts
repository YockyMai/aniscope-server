import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { Injectable } from '@nestjs/common'

import { ANIMES } from './queries/animes'
import { ShikimoriAnimeResponse } from './shikimori-api.interface'

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

  public async fetchAnimes(page: number, limit?: number) {
    const result = await this.client.query<{
      animes: ShikimoriAnimeResponse[]
    }>({
      query: ANIMES,
      variables: {
        page,
        limit: limit ?? 50
      }
    })

    return result.data.animes.map((anime) => ({
      ...anime,
      id: parseInt(anime.id),
      malId: parseInt(anime.malId)
    }))
  }
}
