/*
  Warnings:

  - You are about to drop the `activities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auditoriums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_auditoriumId_fkey";

-- DropForeignKey
ALTER TABLE "auditoriums" DROP CONSTRAINT "auditoriums_dateId_fkey";

-- DropTable
DROP TABLE "activities";

-- DropTable
DROP TABLE "auditoriums";

-- DropTable
DROP TABLE "dates";
