-- CreateEnum
CREATE TYPE "role" AS ENUM ('USER', 'DEVELOPER', 'MODERATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "activity_action" AS ENUM ('POST_CREATED', 'EPSIODE_WATCHED', 'ANIME_STATUS_CHANGED', 'ANIME_REVIEWED', 'FRIEND_ADDED', 'SUBCRIBED_TO_USER', 'SUBCRIBED_TO_ANIME', 'USER_AVATAR_CHANGED', 'USER_BANNER_CHANGED', 'PREMIUM_PURCHASED');

-- CreateEnum
CREATE TYPE "format" AS ENUM ('TV', 'TV_SHORT', 'MOVIE', 'SPECIAL', 'OVA', 'ONA', 'MUSIC', 'MANGA', 'NOVEL', 'ONE_SHOT');

-- CreateEnum
CREATE TYPE "source" AS ENUM ('ORIGINAL', 'MANGA', 'LIGHT_NOVEL', 'VISUAL_NOVEL', 'VIDEO_GAME', 'OTHER', 'NOVEL', 'DOUJINSHI', 'ANIME', 'WEB_NOVEL', 'LIVE_ACTION', 'GAME', 'COMIC', 'MULTIMEDIA_PROJECT', 'PICTURE_BOOK');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('FINISHED', 'RELEASING', 'NOT_YET_RELEASED', 'CANCELLED', 'HIATUS');

-- CreateEnum
CREATE TYPE "season" AS ENUM ('SUMMER', 'WINTER', 'SPRING', 'FALL');

-- CreateEnum
CREATE TYPE "video_type" AS ENUM ('TRAILER', 'OPENING', 'ENDING', 'OTHER');

-- CreateEnum
CREATE TYPE "user_anime_status" AS ENUM ('COMPLETED', 'DROPPED', 'WATCHING');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "banner" TEXT,
    "avatar" TEXT,
    "birthday" TIMESTAMP(3),
    "login" TEXT,
    "role" "role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity" (
    "id" SERIAL NOT NULL,
    "action" "activity_action" NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime" (
    "id" SERIAL NOT NULL,
    "id_shikimori" INTEGER,
    "id_my_anime_list" INTEGER,
    "id_anilist" INTEGER,
    "link" TEXT NOT NULL,
    "title" TEXT,
    "title_ru" TEXT,
    "title_japan" TEXT,
    "other_titles" TEXT[],
    "synonyms" TEXT[],
    "poster" TEXT,
    "banner" TEXT,
    "rating_mpa" TEXT,
    "minimal_age" INTEGER,
    "format" "format",
    "status" "status",
    "season" "season",
    "source" "source",
    "score" INTEGER,
    "score_anilist" INTEGER,
    "rating_shikimori" INTEGER,
    "popularity_anilist" INTEGER,
    "description" TEXT,
    "description_ru" TEXT,
    "is_licensed" BOOLEAN DEFAULT false,
    "color" VARCHAR(8),
    "release" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studio" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "studio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime_studio" (
    "anime_id" INTEGER NOT NULL,
    "studio_id" INTEGER NOT NULL,

    CONSTRAINT "anime_studio_pkey" PRIMARY KEY ("anime_id","studio_id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime_genre" (
    "anime_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "anime_genre_pkey" PRIMARY KEY ("anime_id","genre_id")
);

-- CreateTable
CREATE TABLE "anime_review" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,
    "anime_id" INTEGER NOT NULL,

    CONSTRAINT "anime_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episode" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "image" TEXT,
    "anime_id" INTEGER NOT NULL,

    CONSTRAINT "episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watched_episode" (
    "timing" INTEGER NOT NULL,
    "episodeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "watched_episode_pkey" PRIMARY KEY ("episodeId","userId")
);

-- CreateTable
CREATE TABLE "episode_comment" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "episodeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "episode_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translation" (
    "id" SERIAL NOT NULL,
    "studio" TEXT NOT NULL,

    CONSTRAINT "translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episode_translation" (
    "episode_id" INTEGER NOT NULL,
    "translation_id" INTEGER NOT NULL,

    CONSTRAINT "episode_translation_pkey" PRIMARY KEY ("episode_id","translation_id")
);

-- CreateTable
CREATE TABLE "anime_video" (
    "id" SERIAL NOT NULL,
    "type" "video_type" NOT NULL DEFAULT 'OTHER',
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "animeId" INTEGER NOT NULL,

    CONSTRAINT "anime_video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime_tag" (
    "tag_id" INTEGER NOT NULL,
    "anime_id" INTEGER NOT NULL,

    CONSTRAINT "anime_tag_pkey" PRIMARY KEY ("anime_id","tag_id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "rank" INTEGER,
    "is_general_spoiler" BOOLEAN,
    "is_media_spoiler" BOOLEAN,
    "is_adult" BOOLEAN,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime_list" (
    "id" SERIAL NOT NULL,
    "status" "user_anime_status" NOT NULL,
    "userId" INTEGER NOT NULL,
    "animeId" INTEGER NOT NULL,

    CONSTRAINT "anime_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "anime_id_shikimori_key" ON "anime"("id_shikimori");

-- CreateIndex
CREATE UNIQUE INDEX "anime_id_my_anime_list_key" ON "anime"("id_my_anime_list");

-- CreateIndex
CREATE UNIQUE INDEX "anime_id_anilist_key" ON "anime"("id_anilist");

-- CreateIndex
CREATE UNIQUE INDEX "anime_link_key" ON "anime"("link");

-- CreateIndex
CREATE UNIQUE INDEX "genre_name_key" ON "genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "anime_list_userId_animeId_key" ON "anime_list"("userId", "animeId");

-- AddForeignKey
ALTER TABLE "anime_studio" ADD CONSTRAINT "anime_studio_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_studio" ADD CONSTRAINT "anime_studio_studio_id_fkey" FOREIGN KEY ("studio_id") REFERENCES "studio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_genre" ADD CONSTRAINT "anime_genre_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_genre" ADD CONSTRAINT "anime_genre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_review" ADD CONSTRAINT "anime_review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_review" ADD CONSTRAINT "anime_review_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode" ADD CONSTRAINT "episode_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watched_episode" ADD CONSTRAINT "watched_episode_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watched_episode" ADD CONSTRAINT "watched_episode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode_comment" ADD CONSTRAINT "episode_comment_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode_comment" ADD CONSTRAINT "episode_comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode_translation" ADD CONSTRAINT "episode_translation_episode_id_fkey" FOREIGN KEY ("episode_id") REFERENCES "episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode_translation" ADD CONSTRAINT "episode_translation_translation_id_fkey" FOREIGN KEY ("translation_id") REFERENCES "translation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_video" ADD CONSTRAINT "anime_video_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_tag" ADD CONSTRAINT "anime_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_tag" ADD CONSTRAINT "anime_tag_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_list" ADD CONSTRAINT "anime_list_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_list" ADD CONSTRAINT "anime_list_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
