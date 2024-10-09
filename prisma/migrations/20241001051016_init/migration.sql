-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_placeId_fkey";

-- AlterTable
ALTER TABLE "Diary" ALTER COLUMN "placeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlaceDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;
