/*
  Warnings:

  - You are about to drop the `_ReviewToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ReviewToUser" DROP CONSTRAINT "_ReviewToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReviewToUser" DROP CONSTRAINT "_ReviewToUser_B_fkey";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "likedBy" INTEGER[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "likedReviews" INTEGER[];

-- DropTable
DROP TABLE "_ReviewToUser";
