import { gql } from '@apollo/client/core'

export const MEDIA_QUERY = gql(`
  query MediaList($perPage: Int, $page: Int, $type: MediaType) {
    Page(perPage: $perPage, page: $page) {
      media(type: $type) {
        id
        idMal
        averageScore
        bannerImage
        chapters
        status    
        countryOfOrigin
        type
        title {
          english
        }
        
        description
        coverImage {
          color
          extraLarge
          large
          medium
        }
        episodes
        format
        genres
        isLicensed
        meanScore
        rankings {
          allTime
          rank
          context
        }
        source
        trailer {
          id
          site
          thumbnail
        }
        tags {
          category
          description
          id
          isAdult
          isGeneralSpoiler
          isMediaSpoiler
          name
          rank
        }
      }
    }
  }
`)
