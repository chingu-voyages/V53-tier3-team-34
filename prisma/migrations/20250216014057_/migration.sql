/*
  Warnings:

  - The values [festival,dj,firework,drink,food,game,sport,art,ktv,meet,party,afternoonTea,film,theatre] on the enum `ActivityType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `reason` on the `Event` table. All the data in the column will be lost.
  - Changed the type of `value` on the `Chip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `value` on the `RSVPMood` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MoodType" AS ENUM ('ATTENDING', 'MAYBE', 'REGRETFULLY');

-- CreateEnum
CREATE TYPE "ChipType" AS ENUM ('MUSIC_STYLED', 'FOOD_SERVED', 'BYOY', 'DRESS_CODE', 'SPECIAL_GROUP');

-- CreateEnum
CREATE TYPE "ResponseStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'RSVPED', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "ActivityType_new" AS ENUM ('FESTIVAL', 'DJ', 'FIREWORK', 'DRINK', 'FOOD', 'GAME', 'SPORT', 'ART', 'KTV', 'MEET', 'PARTY', 'AFTERNOON_TEA', 'FILM', 'THEATRE');
ALTER TABLE "Event" ALTER COLUMN "activity" TYPE "ActivityType_new" USING ("activity"::text::"ActivityType_new");
ALTER TYPE "ActivityType" RENAME TO "ActivityType_old";
ALTER TYPE "ActivityType_new" RENAME TO "ActivityType";
DROP TYPE "ActivityType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Chip" DROP COLUMN "value",
ADD COLUMN     "value" "ChipType" NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "reason";

-- AlterTable
ALTER TABLE "RSVPMood" DROP COLUMN "value",
ADD COLUMN     "value" "MoodType" NOT NULL;

-- CreateTable
CREATE TABLE "EventResponse" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "ResponseStatus" NOT NULL,
    "rsvpMoodId" INTEGER,
    "numberOfGuests" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventResponse_eventId_userId_key" ON "EventResponse"("eventId", "userId");

-- AddForeignKey
ALTER TABLE "EventResponse" ADD CONSTRAINT "EventResponse_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventResponse" ADD CONSTRAINT "EventResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventResponse" ADD CONSTRAINT "EventResponse_rsvpMoodId_fkey" FOREIGN KEY ("rsvpMoodId") REFERENCES "RSVPMood"("id") ON DELETE SET NULL ON UPDATE CASCADE;
