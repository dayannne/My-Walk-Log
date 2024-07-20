/*
  Warnings:

  - You are about to drop the column `hasEntryFee` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "hasEntryFee",
ADD COLUMN     "entryFee" TEXT;
