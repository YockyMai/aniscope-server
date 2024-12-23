import { Status } from '@prisma/client'

export type AnilistAnime = {
  id: number
  averageScore: number
  bannerImage: string
  status: Status
  countryOfOrigin: str
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
