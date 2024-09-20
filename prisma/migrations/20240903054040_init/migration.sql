/*
  Warnings:

  - You are about to drop the column `likedCount` on the `PlaceDetail` table. All the data in the column will be lost.
  - You are about to drop the column `placeDetail` on the `PlaceDetail` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_placeId_fkey";

-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "diaryCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likedCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PlaceDetail" DROP COLUMN "likedCount",
DROP COLUMN "placeDetail",
ADD COLUMN     "basicInfo" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "findway" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "photo" JSONB NOT NULL DEFAULT '{}';
