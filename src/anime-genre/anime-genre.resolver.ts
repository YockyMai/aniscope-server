import { Query, Resolver } from '@nestjs/graphql'

import { AnimeGenre } from './anime-genre.model'
import { AnimeGenreService } from './anime-genre.service'

@Resolver()
export class AnimeGenreResolver {
  constructor(private readonly animeGenreService: AnimeGenreService) {}

  @Query(() => AnimeGenre)
  genre() {}

  @Query(() => [AnimeGenre])
  genres() {
    return this.animeGenreService.findAll()
  }
}
