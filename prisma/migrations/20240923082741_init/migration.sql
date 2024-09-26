/*
  Warnings:

  - The `basicInfo` column on the `PlaceDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `findway` column on the `PlaceDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `photo` column on the `PlaceDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `address` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PlaceDetail" DROP COLUMN "basicInfo",
ADD COLUMN     "basicInfo" JSONB,
DROP COLUMN "findway",
ADD COLUMN     "findway" JSONB,
DROP COLUMN "photo",
ADD COLUMN     "photo" JSONB;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
ADD COLUMN     "address" JSONB;
