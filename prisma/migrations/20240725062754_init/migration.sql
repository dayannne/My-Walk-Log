/*
  Warnings:

  - The primary key for the `Diary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Diary` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_DiaryToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DiaryToUser" DROP CONSTRAINT "_DiaryToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_DiaryToUser" DROP CONSTRAINT "_DiaryToUser_B_fkey";

-- AlterTable
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_pkey",
ADD COLUMN     "likedBy" INTEGER[],
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Diary_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "likedDiaries" INTEGER[];

-- DropTable
DROP TABLE "_DiaryToUser";
