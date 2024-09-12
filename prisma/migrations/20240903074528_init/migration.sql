/*
  Warnings:

  - You are about to drop the column `diaryCount` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `likedCount` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `reviewCount` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `likedBy` on the `PlaceDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Place" DROP COLUMN "diaryCount",
DROP COLUMN "likedCount",
DROP COLUMN "reviewCount",
ADD COLUMN     "likedBy" INTEGER[];

-- AlterTable
ALTER TABLE "PlaceDetail" DROP COLUMN "likedBy";
