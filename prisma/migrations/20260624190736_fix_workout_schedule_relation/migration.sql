-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('PLANNED', 'COMPLETED', 'MISSED', 'CANCELLED');

-- CreateTable
CREATE TABLE "WorkoutSchedule" (
    "id" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "status" "ScheduleStatus" NOT NULL DEFAULT 'PLANNED',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "WorkoutSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutSchedule" ADD CONSTRAINT "WorkoutSchedule_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSchedule" ADD CONSTRAINT "WorkoutSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
