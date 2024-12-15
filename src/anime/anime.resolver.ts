import { Args, Query, Resolver } from '@nestjs/graphql'

import { Anime } from './anime.model'

@Resolver()
export class AnimeResolver {
  @Query(() => Anime)
  async anime(@Args('link') link: string) {
    return {}
  }
}
