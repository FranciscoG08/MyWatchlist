-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PLANNED', 'WATCHING', 'WATCHED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchlistMovie" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PLANNED',
    "userRating" INTEGER,
    "notes" TEXT,
    "progress" TEXT,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchlistMovie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistMovie_userId_movieId_key" ON "WatchlistMovie"("userId", "movieId");

-- AddForeignKey
ALTER TABLE "WatchlistMovie" ADD CONSTRAINT "WatchlistMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
