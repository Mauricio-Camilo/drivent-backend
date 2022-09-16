/*
  Warnings:

  - You are about to drop the column `accommodation` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `ticket` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `reservations` table. All the data in the column will be lost.
  - Added the required column `ticketId` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_userId_fkey";

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "accommodation",
DROP COLUMN "ticket",
DROP COLUMN "userId",
ADD COLUMN     "ticketId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
