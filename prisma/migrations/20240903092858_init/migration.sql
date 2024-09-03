/*
  Warnings:

  - You are about to drop the column `placeId` on the `PlaceDetail` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "PlaceDetail_placeId_key";

-- AlterTable
ALTER TABLE "PlaceDetail" DROP COLUMN "placeId";
