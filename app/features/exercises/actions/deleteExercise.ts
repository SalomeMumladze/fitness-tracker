"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteExercise(exerciseId: string, workoutId: string) {
  await prisma.exercise.delete({
    where: {
      id: exerciseId,
    },
  });

  revalidatePath(`/workouts/${workoutId}`);
}
