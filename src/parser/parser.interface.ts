import { AnilistAnime } from 'src/anilist-api/anilist-api.interface'
import { ShikimoriAnime } from 'src/shikimori-api/shikimori-api.interface'

export type ParsedAnime = {
  shikimori: ShikimoriAnime
  anilist: AnilistAnime
}
