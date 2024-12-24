import { Module } from '@nestjs/common'
import { AnilistApiModule } from 'src/anilist-api/anilist-api.module'
import { ShikimoriApiModule } from 'src/shikimori-api/shikimori-api.module'

import { ParserService } from './parser.service'

@Module({
  imports: [ShikimoriApiModule, AnilistApiModule],
  providers: [ParserService]
})
export class ParserModule {}
