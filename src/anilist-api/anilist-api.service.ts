import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { Injectable } from '@nestjs/common'

import { AnilistAnime } from './anilist-api.interface'
import { MEDIA_QUERY } from './queries/media'

@Injectable()
export class AnilistApiService {
  private readonly client: ApolloClient<any>

  constructor() {
    this.client = new ApolloClient({
      uri: 'https://graphql.anilist.co',
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: 'no-cache'
        }
      }
    })
  }

  public async fetchAnimesByPage(page: number) {
    const result = await this.client.query({
      query: MEDIA_QUERY,
      variables: {
        page,
        perPage: 50,
        type: 'ANIME'
      }
    })

    return result.data.Page.media as AnilistAnime[]
  }
}
