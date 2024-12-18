import { Module } from '@nestjs/common';
import { AnilistApiService } from './anilist-api.service';

@Module({
  providers: [AnilistApiService]
})
export class AnilistApiModule {}
