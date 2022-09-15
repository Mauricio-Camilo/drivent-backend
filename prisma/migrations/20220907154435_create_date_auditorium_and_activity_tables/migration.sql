-- CreateTable
CREATE TABLE "dates" (
    "id" SERIAL NOT NULL,
    "weekDay" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditoriums" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "dateId" INTEGER NOT NULL,

    CONSTRAINT "auditoriums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "finishTime" TEXT NOT NULL,
    "vacancies" INTEGER NOT NULL,
    "auditoriumId" INTEGER NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "auditoriums" ADD CONSTRAINT "auditoriums_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "dates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_auditoriumId_fkey" FOREIGN KEY ("auditoriumId") REFERENCES "auditoriums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
