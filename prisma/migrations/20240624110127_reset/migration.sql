/*
  Warnings:

  - The primary key for the `PlaceDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `detail` on the `PlaceDetail` table. All the data in the column will be lost.
  - The `id` column on the `PlaceDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[placeId]` on the table `PlaceDetail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `placeId` to the `PlaceDetail` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `A` on the `_PlaceDetailToUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_placeId_fkey";

-- DropForeignKey
ALTER TABLE "PlaceDetail" DROP CONSTRAINT "PlaceDetail_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_placeDetailId_fkey";

-- DropForeignKey
ALTER TABLE "_PlaceDetailToUser" DROP CONSTRAINT "_PlaceDetailToUser_A_fkey";

-- DropIndex
DROP INDEX "PlaceDetail_id_key";

-- DropIndex
DROP INDEX "id";

-- AlterTable
ALTER TABLE "PlaceDetail" DROP CONSTRAINT "PlaceDetail_pkey",
DROP COLUMN "detail",
ADD COLUMN     "placeId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PlaceDetail_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_PlaceDetailToUser" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PlaceDetail_placeId_key" ON "PlaceDetail"("placeId");

-- CreateIndex
CREATE INDEX "placeId" ON "PlaceDetail"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "_PlaceDetailToUser_AB_unique" ON "_PlaceDetailToUser"("A", "B");

-- AddForeignKey
ALTER TABLE "PlaceDetail" ADD CONSTRAINT "PlaceDetail_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_placeDetailId_fkey" FOREIGN KEY ("placeDetailId") REFERENCES "PlaceDetail"("placeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlaceDetail"("placeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaceDetailToUser" ADD CONSTRAINT "_PlaceDetailToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "PlaceDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
