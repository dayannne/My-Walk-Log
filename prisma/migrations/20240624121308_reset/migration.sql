/*
  Warnings:

  - A unique constraint covering the columns `[placeId]` on the table `PlaceDetail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `placeId` to the `PlaceDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlaceDetail" DROP CONSTRAINT "PlaceDetail_id_fkey";

-- AlterTable
ALTER TABLE "PlaceDetail" ADD COLUMN     "placeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PlaceDetail_placeId_key" ON "PlaceDetail"("placeId");

-- AddForeignKey
ALTER TABLE "PlaceDetail" ADD CONSTRAINT "PlaceDetail_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
