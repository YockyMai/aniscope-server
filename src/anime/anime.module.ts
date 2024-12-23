import { Module } from '@nestjs/common'

import { AnimeResolver } from './anime.resolver'
import { AnimeService } from './anime.service'

@Module({
  providers: [AnimeService, AnimeResolver],
  exports: [AnimeService]
})
export class AnimeModule {}
