/*
  Warnings:

  - You are about to drop the `ExerciseLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseLog" DROP CONSTRAINT "ExerciseLog_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "weight" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "ExerciseLog";
