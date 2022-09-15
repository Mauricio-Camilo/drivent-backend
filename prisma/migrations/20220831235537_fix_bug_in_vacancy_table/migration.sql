-- DropForeignKey
ALTER TABLE "vacancies" DROP CONSTRAINT "vacancies_userId_fkey";

-- AlterTable
ALTER TABLE "vacancies" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "userId" DROP DEFAULT;
