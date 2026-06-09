/*
  Warnings:

  - You are about to drop the `TaskAssignment` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `domain` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Domain" AS ENUM ('FRONTEND', 'BACKEND', 'CLOUD', 'AIML');

-- DropForeignKey
ALTER TABLE "TaskAssignment" DROP CONSTRAINT "TaskAssignment_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskAssignment" DROP CONSTRAINT "TaskAssignment_userId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "domain",
ADD COLUMN     "domain" "Domain" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "domain" "Domain";

-- DropTable
DROP TABLE "TaskAssignment";
