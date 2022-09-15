/*
  Warnings:

  - Added the required column `type` to the `hotels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hotels" ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "vacancies" INTEGER;

-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false;
