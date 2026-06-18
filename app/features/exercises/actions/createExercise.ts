"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createExercise(
  workoutId: string,
  name: string,
  sets: number,
  reps: number,
) {
  await prisma.exercise.create({
    data: {
      name,
      sets,
      reps,
      workoutId,
    },
  });

  revalidatePath(`/workouts/${workoutId}`);
}
