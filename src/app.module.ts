import { Module } from '@nestjs/common'

import { AnimeEpisodeModule } from './anime-episode/anime-episode.module'
import { AnimeGenreModule } from './anime-genre/anime-genre.module'
import { AnimeGenreResolver } from './anime-genre/anime-genre.resolver'
import { AnimeReviewModule } from './anime-review/anime-review.module'
import { AnimeReviewResolver } from './anime-review/anime-review.resolver'
import { AnimeReviewService } from './anime-review/anime-review.service'
import { AnimeStudioModule } from './anime-studio/anime-studio.module'
import { AnimeVideoModule } from './anime-video/anime-video.module'
import { AnimeModule } from './anime/anime.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from './config/config.module'
import { DatabaseModule } from './database/database.module'
import { GraphqlModule } from './graphql/graphql.module'
import { UserModule } from './user/user.module'
import { EpisodeTranslationModule } from './episode-translation/episode-translation.module';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    GraphqlModule,
    UserModule,
    ConfigModule,
    AuthModule,
    AnimeReviewModule,
    AnimeModule,
    AnimeStudioModule,
    AnimeGenreModule,
    AnimeVideoModule,
    AnimeEpisodeModule,
    EpisodeTranslationModule
  ],
  providers: [AnimeReviewService, AnimeReviewResolver, AnimeGenreResolver]
})
export class AppModule {}
