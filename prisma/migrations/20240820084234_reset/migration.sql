-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profileImage" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "likedReviews" INTEGER[],
    "likedDiaries" INTEGER[],
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
    "placeDetail" JSONB NOT NULL,
    "likedBy" INTEGER[],

    CONSTRAINT "PlaceDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "reviewImages" TEXT[],
    "description" TEXT NOT NULL,
    "keywords" INTEGER[],
    "walkDuration" INTEGER NOT NULL,
    "entryFee" TEXT,
    "likedCount" INTEGER NOT NULL DEFAULT 0,
    "likedBy" INTEGER[],
    "placeId" TEXT NOT NULL,
    "placeDetailId" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diary" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "placeId" TEXT NOT NULL,
    "placeDetailId" TEXT NOT NULL,
    "diaryImages" TEXT[],
    "content" TEXT NOT NULL,
    "weather" TEXT NOT NULL,
    "tags" TEXT[],
    "likedCount" INTEGER NOT NULL DEFAULT 0,
    "likedBy" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Place_id_key" ON "Place"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PlaceDetail_placeId_key" ON "PlaceDetail"("placeId");

-- CreateIndex
CREATE INDEX "id" ON "PlaceDetail"("id");

-- AddForeignKey
ALTER TABLE "PlaceDetail" ADD CONSTRAINT "PlaceDetail_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_placeDetailId_fkey" FOREIGN KEY ("placeDetailId") REFERENCES "PlaceDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_placeDetailId_fkey" FOREIGN KEY ("placeDetailId") REFERENCES "PlaceDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
