import { Module } from '@nestjs/common'
import { AnimeGenreModule } from 'src/anime-genre/anime-genre.module'

import { AnimeResolver } from './anime.resolver'
import { AnimeService } from './anime.service'

@Module({
  imports: [AnimeGenreModule, AnimeGenreModule],
  providers: [AnimeService, AnimeResolver],
  exports: [AnimeService]
})
export class AnimeModule {}
