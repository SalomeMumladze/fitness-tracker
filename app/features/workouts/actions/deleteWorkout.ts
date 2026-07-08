"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteWorkout(workoutId: string) {
  if (!workoutId) {
    throw new Error("workoutId is required");
  }

  await prisma.workout.delete({
    where: { id: workoutId },
  });

  revalidatePath("/workouts");
}
