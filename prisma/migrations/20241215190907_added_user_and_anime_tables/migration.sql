-- CreateEnum
CREATE TYPE "role" AS ENUM ('USER', 'DEVELOPER', 'MODERATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "anime_type" AS ENUM ('MOVIE');

-- CreateEnum
CREATE TYPE "anime_status" AS ENUM ('RELEASED');

-- CreateEnum
CREATE TYPE "anime_season" AS ENUM ('SUMMER', 'WINTER', 'SPRING', 'FALL');

-- CreateEnum
CREATE TYPE "AnimeVideoType" AS ENUM ('TRAILER', 'OPENING', 'ENDING', 'OTHER');

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
CREATE TABLE "anime" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "banner" TEXT,
    "type" "anime_type" NOT NULL,
    "rating_mpa" TEXT NOT NULL,
    "minimal_age" INTEGER NOT NULL,
    "status" "anime_status" NOT NULL,
    "season" "anime_season" NOT NULL,
    "rating" INTEGER,
    "description" TEXT,
    "other_titles" TEXT[],
    "english_titles" TEXT[],
    "japan_titles" TEXT[],
    "synonyms" TEXT[],
    "release" TIMESTAMP(3) NOT NULL,
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
    "animeId" INTEGER NOT NULL,
    "studioId" INTEGER NOT NULL,

    CONSTRAINT "anime_studio_pkey" PRIMARY KEY ("animeId","studioId")
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
    "animeId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "anime_genre_pkey" PRIMARY KEY ("animeId","genreId")
);

-- CreateTable
CREATE TABLE "anime_review" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "animeId" INTEGER,

    CONSTRAINT "anime_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episode" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "image" TEXT,
    "animeId" INTEGER,

    CONSTRAINT "episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translation" (
    "id" SERIAL NOT NULL,
    "studio" TEXT NOT NULL,

    CONSTRAINT "translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episode_translation" (
    "episodeId" INTEGER NOT NULL,
    "translationId" INTEGER NOT NULL,

    CONSTRAINT "episode_translation_pkey" PRIMARY KEY ("episodeId","translationId")
);

-- CreateTable
CREATE TABLE "anime_video" (
    "id" SERIAL NOT NULL,
    "type" "AnimeVideoType" NOT NULL DEFAULT 'OTHER',
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "animeId" INTEGER,

    CONSTRAINT "anime_video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "anime_link_key" ON "anime"("link");

-- AddForeignKey
ALTER TABLE "anime_studio" ADD CONSTRAINT "anime_studio_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_studio" ADD CONSTRAINT "anime_studio_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "studio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_genre" ADD CONSTRAINT "anime_genre_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_genre" ADD CONSTRAINT "anime_genre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_review" ADD CONSTRAINT "anime_review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_review" ADD CONSTRAINT "anime_review_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode" ADD CONSTRAINT "episode_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode_translation" ADD CONSTRAINT "episode_translation_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episode_translation" ADD CONSTRAINT "episode_translation_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "translation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_video" ADD CONSTRAINT "anime_video_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE SET NULL ON UPDATE CASCADE;
