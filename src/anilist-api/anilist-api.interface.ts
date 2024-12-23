import { Media } from './anilist-api.schema'

export type AnilistAnime = {
  id: number
  idMal: number
  averageScore: Pick<Media, 'averageScore'>['averageScore']
  bannerImage: Pick<Media, 'bannerImage'>['bannerImage']
  status: Pick<Media, 'status'>['status']
  countryOfOrigin: Pick<Media, 'countryOfOrigin'>['countryOfOrigin']
  type: Pick<Media, 'type'>['type']
  description: Pick<Media, 'description'>['description']
  coverImage: Pick<Media, 'coverImage'>['coverImage']
  episodes: Pick<Media, 'episodes'>['episodes']
  format: Pick<Media, 'format'>['format']
  genres: Pick<Media, 'genres'>['genres']
  isLicensed: Pick<Media, 'isLicensed'>['isLicensed']
  meanScore: Pick<Media, 'meanScore'>['meanScore']
  trending: Pick<Media, 'trending'>['trending']
  source: Pick<Media, 'source'>['source']
  trailer: Pick<Media, 'trailer'>['trailer']
  tags: Pick<Media, 'tags'>['tags']
  title: Pick<Media, 'title'>['title']
  season: Pick<Media, 'season'>['season']
}
