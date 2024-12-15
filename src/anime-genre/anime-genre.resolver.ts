import { Query, Resolver } from '@nestjs/graphql'

import { AnimeGenre } from './anime-genre.model'

@Resolver()
export class AnimeGenreResolver {
  @Query(() => AnimeGenre)
  async genre() {}

  @Query(() => [AnimeGenre])
  async genres() {}
}
