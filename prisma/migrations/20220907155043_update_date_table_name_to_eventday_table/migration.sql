/*
  Warnings:

  - You are about to drop the `dates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "auditoriums" DROP CONSTRAINT "auditoriums_dateId_fkey";

-- DropTable
DROP TABLE "dates";

-- CreateTable
CREATE TABLE "eventdays" (
    "id" SERIAL NOT NULL,
    "weekDay" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "eventdays_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "auditoriums" ADD CONSTRAINT "auditoriums_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "eventdays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
