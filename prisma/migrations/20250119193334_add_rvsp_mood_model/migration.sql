-- CreateTable
CREATE TABLE "RVSPMood" (
    "name" TEXT NOT NULL,
    "emoji" TEXT,
    "eventId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "RVSPMood_name_key" ON "RVSPMood"("name");

-- AddForeignKey
ALTER TABLE "RVSPMood" ADD CONSTRAINT "RVSPMood_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
