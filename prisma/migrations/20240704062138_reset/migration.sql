-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profileImage" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "likedPlaces" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "placeName" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "roadAddress" TEXT NOT NULL,
    "distance" TEXT NOT NULL,
    "x" TEXT NOT NULL,
    "y" TEXT NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceDetail" (
    "id" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "placeName" TEXT NOT NULL,
    "likedCount" INTEGER NOT NULL DEFAULT 0,
    "eval" INTEGER NOT NULL DEFAULT 0,
    "placeDetail" JSONB NOT NULL,
    "likedBy" INTEGER[],

    CONSTRAINT "PlaceDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "reviewImages" TEXT[],
    "description" TEXT NOT NULL,
    "tip" TEXT,
    "likedCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eval" INTEGER NOT NULL,
    "tags" TEXT[],
    "placeId" TEXT NOT NULL,
    "placeDetailId" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diary" (
    "id" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "diaryImages" TEXT[],
    "content" TEXT NOT NULL,
    "likedCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "weather" TEXT NOT NULL,
    "tags" TEXT[],
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trail" (
    "ESNTL_ID" TEXT NOT NULL,
    "WLK_COURS_FLAG_NM" TEXT NOT NULL,
    "WLK_COURS_NM" TEXT NOT NULL,
    "COURS_DC" TEXT NOT NULL,
    "SIGNGU_NM" TEXT NOT NULL,
    "COURS_LEVEL_NM" TEXT NOT NULL,
    "COURS_LT_CN" TEXT NOT NULL,
    "COURS_DETAIL_LT_CN" TEXT NOT NULL,
    "ADIT_DC" TEXT NOT NULL,
    "COURS_TIME_CN" TEXT NOT NULL,
    "OPTN_DC" TEXT NOT NULL,
    "TOILET_DC" TEXT NOT NULL,
    "CVNTL_NM" TEXT NOT NULL,
    "LNM_ADDR" TEXT NOT NULL,
    "COURS_SPOT_LA" TEXT NOT NULL,
    "COURS_SPOT_LO" TEXT NOT NULL,

    CONSTRAINT "Trail_pkey" PRIMARY KEY ("ESNTL_ID")
);

-- CreateTable
CREATE TABLE "_ReviewToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DiaryToUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Place_id_key" ON "Place"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PlaceDetail_placeId_key" ON "PlaceDetail"("placeId");

-- CreateIndex
CREATE INDEX "id" ON "PlaceDetail"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ReviewToUser_AB_unique" ON "_ReviewToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ReviewToUser_B_index" ON "_ReviewToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiaryToUser_AB_unique" ON "_DiaryToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DiaryToUser_B_index" ON "_DiaryToUser"("B");

-- AddForeignKey
ALTER TABLE "PlaceDetail" ADD CONSTRAINT "PlaceDetail_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_placeDetailId_fkey" FOREIGN KEY ("placeDetailId") REFERENCES "PlaceDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "PlaceDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewToUser" ADD CONSTRAINT "_ReviewToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewToUser" ADD CONSTRAINT "_ReviewToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiaryToUser" ADD CONSTRAINT "_DiaryToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Diary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiaryToUser" ADD CONSTRAINT "_DiaryToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
