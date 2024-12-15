import { Query, Resolver } from '@nestjs/graphql'

import { AnimeEpisode } from './anime-episode.model'

@Resolver()
export class AnimeEpisodeResolver {
  @Query(() => AnimeEpisode)
  async episode() {}
}
