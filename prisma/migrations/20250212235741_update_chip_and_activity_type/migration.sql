/*
  Warnings:

  - A unique constraint covering the columns `[value,eventId]` on the table `Chip` will be added. If there are existing duplicate values, this will fail.
  - Made the column `eventId` on table `Chip` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('festival', 'dj', 'firework', 'drink', 'food', 'game', 'sport', 'art', 'ktv', 'meet', 'party', 'afternoonTea', 'film', 'theatre');

-- DropForeignKey
ALTER TABLE "Chip" DROP CONSTRAINT "Chip_eventId_fkey";

-- DropIndex
DROP INDEX "Chip_value_key";

-- AlterTable
ALTER TABLE "Chip" ALTER COLUMN "eventId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "activity" "ActivityType";

-- CreateIndex
CREATE UNIQUE INDEX "Chip_value_eventId_key" ON "Chip"("value", "eventId");

-- AddForeignKey
ALTER TABLE "Chip" ADD CONSTRAINT "Chip_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
