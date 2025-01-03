import { Module } from '@nestjs/common'

import { AnimeGenreResolver } from './anime-genre.resolver'
import { AnimeGenreService } from './anime-genre.service'

@Module({
  providers: [AnimeGenreResolver, AnimeGenreService],
  exports: [AnimeGenreService]
})
export class AnimeGenreModule {}
