import { Anime } from '@prisma/client'

export type CreateAnimeDto = Omit<Anime, 'id'>
