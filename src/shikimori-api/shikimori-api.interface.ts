export type ShikimoriAnimeResponse = {
  isCensored: boolean
  id: string
  malId: string
  russian: string
  score: number
  nextEpisodeAt: string
}

export type ShikimoriAnime = {
  id: number
  isCensored?: boolean
  malId?: number
  russian?: string
  english?: string
  score?: number
  nextEpisodeAt?: string
}
