import { Module } from '@nestjs/common';
import { AnimeStudioService } from './anime-studio.service';
import { AnimeStudioResolver } from './anime-studio.resolver';

@Module({
  providers: [AnimeStudioService, AnimeStudioResolver]
})
export class AnimeStudioModule {}
