import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql'
import { AnimeSeason, AnimeStatus, AnimeType } from '@prisma/client'
import { AnimeEpisode } from 'src/anime-episode/anime-episode.model'
import { AnimeGenre } from 'src/anime-genre/anime-genre.model'
import { AnimeReview } from 'src/anime-review/anime-review.model'
import { AnimeStudio } from 'src/anime-studio/anime-studio.model'

@ObjectType()
export class Anime {
  @Field(() => Int)
  id: number

  @Field()
  title: string

  @Field()
  link: string

  @Field()
  poster: string

  @Field({ nullable: true })
  banner?: string

  @Field(() => AnimeType)
  type: AnimeType

  @Field()
  ratingMpa: string

  @Field(() => Int)
  minimalAge: number

  @Field(() => AnimeStatus)
  status: AnimeStatus

  @Field(() => AnimeSeason)
  season: AnimeSeason

  @Field(() => Int, { nullable: true })
  rating?: number

  @Field({ nullable: true })
  description?: string

  @Field(() => [String])
  otherTitles: string[]

  @Field(() => [String])
  englishTitle: string[]

  @Field(() => [String])
  japanTitles: string[]

  @Field(() => [String])
  synonyms: string[]

  @Field(() => GraphQLISODateTime)
  release: Date

  @Field(() => [AnimeStudio])
  studios: AnimeStudio[]

  @Field(() => [AnimeGenre])
  genres: AnimeGenre[]

  @Field(() => AnimeReview)
  reviews: AnimeReview[]

  @Field(() => AnimeEpisode)
  episodes: AnimeEpisode[]

  // @Field(() => Int)
  // videos       AnimeVideo[]
}
