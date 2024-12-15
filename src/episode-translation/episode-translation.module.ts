import { Module } from '@nestjs/common';
import { EpisodeTranslationService } from './episode-translation.service';
import { EpisodeTranslationResolver } from './episode-translation.resolver';

@Module({
  providers: [EpisodeTranslationService, EpisodeTranslationResolver]
})
export class EpisodeTranslationModule {}
