import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { Injectable } from '@nestjs/common'

import { GET_ANIMES } from './queries/get-animes'

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

  public async fetchAnimes(page: number) {
    const result = await this.client.query({
      query: GET_ANIMES,
      variables: {
        page,
        limit: 50
      }
    })

    return result
  }
}
