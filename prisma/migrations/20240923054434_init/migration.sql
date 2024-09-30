/*
  Warnings:

  - You are about to drop the column `placeDetailId` on the `Diary` table. All the data in the column will be lost.
  - You are about to drop the column `placeDetailId` on the `Review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_placeDetailId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_placeDetailId_fkey";

-- AlterTable
ALTER TABLE "Diary" DROP COLUMN "placeDetailId",
ADD COLUMN     "placeAddress" TEXT,
ADD COLUMN     "placeName" TEXT;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "placeDetailId",
ADD COLUMN     "placeAddress" TEXT,
ADD COLUMN     "placeName" TEXT;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlaceDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlaceDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
