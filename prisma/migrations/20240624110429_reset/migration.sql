/*
  Warnings:

  - The primary key for the `PlaceDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `placeId` on the `PlaceDetail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `PlaceDetail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `detail` to the `PlaceDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_placeId_fkey";

-- DropForeignKey
ALTER TABLE "PlaceDetail" DROP CONSTRAINT "PlaceDetail_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_placeDetailId_fkey";

-- DropForeignKey
ALTER TABLE "_PlaceDetailToUser" DROP CONSTRAINT "_PlaceDetailToUser_A_fkey";

-- DropIndex
DROP INDEX "PlaceDetail_placeId_key";

-- DropIndex
DROP INDEX "placeId";

-- AlterTable
ALTER TABLE "PlaceDetail" DROP CONSTRAINT "PlaceDetail_pkey",
DROP COLUMN "placeId",
ADD COLUMN     "detail" JSONB NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PlaceDetail_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PlaceDetail_id_seq";

-- AlterTable
ALTER TABLE "_PlaceDetailToUser" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PlaceDetail_id_key" ON "PlaceDetail"("id");

-- CreateIndex
CREATE INDEX "id" ON "PlaceDetail"("id");

-- AddForeignKey
ALTER TABLE "PlaceDetail" ADD CONSTRAINT "PlaceDetail_id_fkey" FOREIGN KEY ("id") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_placeDetailId_fkey" FOREIGN KEY ("placeDetailId") REFERENCES "PlaceDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlaceDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaceDetailToUser" ADD CONSTRAINT "_PlaceDetailToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "PlaceDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
