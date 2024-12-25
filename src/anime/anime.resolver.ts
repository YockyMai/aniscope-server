import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AnimeGenre } from 'src/anime-genre/anime-genre.model'
import { AnimeGenreService } from 'src/anime-genre/anime-genre.service'

import { AnimeService } from './anime.service'
import { Anime } from './dto/anime.model'
import { AnimesArgs } from './dto/animes.input'
import { Animes } from './dto/animes.model'

@Resolver(() => Anime)
export class AnimeResolver {
  constructor(
    private readonly animeService: AnimeService,
    private readonly animeGenreService: AnimeGenreService
  ) {}

  @Query(() => Anime)
  async anime(@Args('id') id: number) {
    return this.animeService.findById(id)
  }

  @Query(() => Animes)
  animes(@Args() args: AnimesArgs) {
    return this.animeService.findAll(args)
  }

  @ResolveField(() => AnimeGenre, { nullable: true })
  genres(@Parent() anime: Anime) {
    return this.animeGenreService.findByAnimeId(anime.id)
  }
}
