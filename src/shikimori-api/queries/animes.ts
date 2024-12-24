import { gql } from '@apollo/client/core'

export const ANIMES = gql(`
  query Animes($page: PositiveInt, $limit: PositiveInt, $ids: String) {
    animes(page: $page, limit: $limit, ids: $ids) {
      isCensored
      id
      malId
      russian
      score
      nextEpisodeAt
      # externalLinks {
      #   url
      #   id
      # }
    }
  }
`)
