/*
  Warnings:

  - You are about to drop the column `dateId` on the `auditoriums` table. All the data in the column will be lost.
  - Added the required column `eventdayId` to the `auditoriums` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "auditoriums" DROP CONSTRAINT "auditoriums_dateId_fkey";

-- AlterTable
ALTER TABLE "auditoriums" DROP COLUMN "dateId",
ADD COLUMN     "eventdayId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "auditoriums" ADD CONSTRAINT "auditoriums_eventdayId_fkey" FOREIGN KEY ("eventdayId") REFERENCES "eventdays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
