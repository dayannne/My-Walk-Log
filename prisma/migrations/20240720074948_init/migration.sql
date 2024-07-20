/*
  Warnings:

  - You are about to drop the column `tags` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "tags",
ADD COLUMN     "keywords" INTEGER[];
