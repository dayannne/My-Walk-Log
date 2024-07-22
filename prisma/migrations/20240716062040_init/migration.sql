/*
  Warnings:

  - You are about to drop the column `eval` on the `PlaceDetail` table. All the data in the column will be lost.
  - You are about to drop the column `eval` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `tip` on the `Review` table. All the data in the column will be lost.
  - The `tags` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `hasEntryFee` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walkDuration` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlaceDetail" DROP COLUMN "eval";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "eval",
DROP COLUMN "tip",
ADD COLUMN     "hasEntryFee" BOOLEAN NOT NULL,
ADD COLUMN     "walkDuration" INTEGER NOT NULL,
DROP COLUMN "tags",
ADD COLUMN     "tags" INTEGER[];
