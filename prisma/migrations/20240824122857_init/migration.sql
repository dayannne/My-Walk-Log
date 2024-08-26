/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - Made the column `introduction` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
ADD COLUMN     "adress" JSONB NOT NULL DEFAULT '{}',
ALTER COLUMN "introduction" SET NOT NULL,
ALTER COLUMN "introduction" SET DEFAULT '';
