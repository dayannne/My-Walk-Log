/*
  Warnings:

  - You are about to drop the `Place` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlaceDetail" DROP CONSTRAINT "PlaceDetail_placeId_fkey";

-- AlterTable
ALTER TABLE "PlaceDetail" ADD COLUMN     "address" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "categoryName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "distance" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "roadAddress" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "x" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "y" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Place";
