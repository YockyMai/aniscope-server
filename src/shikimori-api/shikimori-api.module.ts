import { Module } from '@nestjs/common'

import { ShikimoriApiService } from './shikimori-api.service'

@Module({
  providers: [ShikimoriApiService],
  exports: [ShikimoriApiService]
})
export class ShikimoriApiModule {}
