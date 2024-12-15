import { Module } from '@nestjs/common';
import { AnimeVideoService } from './anime-video.service';
import { AnimeVideoResolver } from './anime-video.resolver';

@Module({
  providers: [AnimeVideoService, AnimeVideoResolver]
})
export class AnimeVideoModule {}
