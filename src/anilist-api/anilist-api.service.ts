import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { Injectable } from '@nestjs/common'

import { Media } from './anilist-api.schema'
import { GET_MEDIA } from './queries/get-media-by-id'

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

  public async fetchAnimeById(id: number) {
    const result = await this.client.query<Media>({
      query: GET_MEDIA,
      variables: {
        mediaId: id
      }
    })
  }
}
