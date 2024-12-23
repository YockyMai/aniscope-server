import { Module } from '@nestjs/common'

import { AnilistApiService } from './anilist-api.service'

@Module({
  providers: [AnilistApiService],
  exports: [AnilistApiService]
})
export class AnilistApiModule {}
