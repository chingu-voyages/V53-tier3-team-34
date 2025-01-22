/*
  Warnings:

  - You are about to drop the column `eventAddress` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `eventFee` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `eventReason` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `guestsNumber` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `outdoor` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `publicEvent` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "eventAddress",
DROP COLUMN "eventFee",
DROP COLUMN "eventReason",
DROP COLUMN "guestsNumber",
DROP COLUMN "outdoor",
DROP COLUMN "publicEvent",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "costPerPerson" DOUBLE PRECISION,
ADD COLUMN     "guestCount" INTEGER,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "isOutdoor" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reason" TEXT,
ADD COLUMN     "style" TEXT;
