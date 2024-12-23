export type ShikimoriAnimeResponse = {
  isCensored: boolean
  id: string
  malId: string
  russian: string
  score: number
  nextEpisodeAt: string
}

export type ShikimoriAnime = {
  isCensored: boolean
  id: number
  malId: number
  russian: string
  score: number
  nextEpisodeAt: string
}
