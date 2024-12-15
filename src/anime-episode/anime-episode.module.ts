import { Module } from '@nestjs/common';
import { AnimeEpisodeService } from './anime-episode.service';
import { AnimeEpisodeResolver } from './anime-episode.resolver';

@Module({
  providers: [AnimeEpisodeService, AnimeEpisodeResolver]
})
export class AnimeEpisodeModule {}
