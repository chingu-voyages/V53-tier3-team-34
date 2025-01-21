/*
  Warnings:

  - You are about to drop the column `guestCount` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `RVSPMood` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RVSPMood" DROP CONSTRAINT "RVSPMood_eventId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "guestCount",
ADD COLUMN     "maxGuestLimit" INTEGER,
ADD COLUMN     "userGuestLimit" INTEGER;

-- DropTable
DROP TABLE "RVSPMood";

-- CreateTable
CREATE TABLE "RSVPMood" (
    "value" TEXT NOT NULL,
    "emoji" TEXT,
    "eventId" TEXT
);

-- CreateTable
CREATE TABLE "Chip" (
    "value" TEXT NOT NULL,
    "inputValue" TEXT NOT NULL,
    "eventId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "RSVPMood_value_key" ON "RSVPMood"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Chip_value_key" ON "Chip"("value");

-- AddForeignKey
ALTER TABLE "RSVPMood" ADD CONSTRAINT "RSVPMood_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chip" ADD CONSTRAINT "Chip_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
