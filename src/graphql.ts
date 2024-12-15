
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum AnimeSeason {
    FALL = "FALL",
    SPRING = "SPRING",
    SUMMER = "SUMMER",
    WINTER = "WINTER"
}

export enum AnimeStatus {
    RELEASED = "RELEASED"
}

export enum AnimeType {
    MOVIE = "MOVIE"
}

export enum Role {
    ADMIN = "ADMIN",
    DEVELOPER = "DEVELOPER",
    MODERATOR = "MODERATOR",
    USER = "USER"
}

export interface Anime {
    banner?: Nullable<string>;
    description?: Nullable<string>;
    englishTitle: string[];
    episodes: AnimeEpisode;
    genres: AnimeGenre[];
    id: number;
    japanTitles: string[];
    link: string;
    minimalAge: number;
    otherTitles: string[];
    poster: string;
    rating?: Nullable<number>;
    ratingMpa: string;
    release: DateTime;
    reviews: AnimeReview;
    season: AnimeSeason;
    status: AnimeStatus;
    studios: AnimeStudio[];
    synonyms: string[];
    title: string;
    type: AnimeType;
}

export interface AnimeEpisode {
    description?: Nullable<string>;
    id: number;
    image?: Nullable<string>;
    name: string;
    translations: EpisodeTranslation;
}

export interface AnimeGenre {
    id: number;
    image: string;
    name: string;
}

export interface AnimeReview {
    comment?: Nullable<string>;
    id: number;
    rating: number;
    verified: boolean;
}

export interface AnimeStudio {
    id: number;
    name: string;
}

export interface EpisodeTranslation {
    description?: Nullable<string>;
    id: number;
    image?: Nullable<string>;
    name?: Nullable<string>;
}

export interface IQuery {
    anime(link: string): Anime | Promise<Anime>;
    episode(): AnimeEpisode | Promise<AnimeEpisode>;
    genre(): AnimeGenre | Promise<AnimeGenre>;
    genres(): AnimeGenre[] | Promise<AnimeGenre[]>;
    user(id: number): User | Promise<User>;
}

export interface User {
    avatar?: Nullable<string>;
    banner?: Nullable<string>;
    birthday?: Nullable<DateTime>;
    email: string;
    id: number;
    login?: Nullable<string>;
    name: string;
    role: Role;
}

export type DateTime = any;
type Nullable<T> = T | null;
