import { gql } from '@apollo/client/core'

export const ANIMES = gql(`
  query Animes($page: PositiveInt, $limit: PositiveInt) {
    animes(page: $page, limit: $limit) {
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
