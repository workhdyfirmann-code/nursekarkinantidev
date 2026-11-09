/*
  Warnings:

  Existing event assignments are copied before `showId` is dropped.

*/
-- AlterTable
ALTER TABLE "Sponsor" ADD COLUMN "isGeneral" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "_ShowToSponsor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ShowToSponsor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ShowToSponsor_B_index" ON "_ShowToSponsor"("B");

-- AddForeignKey
ALTER TABLE "_ShowToSponsor" ADD CONSTRAINT "_ShowToSponsor_A_fkey" FOREIGN KEY ("A") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShowToSponsor" ADD CONSTRAINT "_ShowToSponsor_B_fkey" FOREIGN KEY ("B") REFERENCES "Sponsor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Preserve old event assignments.
INSERT INTO "_ShowToSponsor" ("A", "B")
SELECT "showId", "id" FROM "Sponsor" WHERE "showId" IS NOT NULL;

-- Preserve old sponsors without an event as general sponsors.
UPDATE "Sponsor" SET "isGeneral" = true WHERE "showId" IS NULL;

-- Drop the old event relation after copying its data.
ALTER TABLE "Sponsor" DROP CONSTRAINT "Sponsor_showId_fkey";
ALTER TABLE "Sponsor" DROP COLUMN "showId";
