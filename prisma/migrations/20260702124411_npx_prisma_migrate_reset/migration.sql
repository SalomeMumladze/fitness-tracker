-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "order" DROP DEFAULT,
ALTER COLUMN "weight" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
