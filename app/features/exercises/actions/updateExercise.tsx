"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

type UpdateExerciseParams = {
  id: string;
  workoutId: string;
  name: string;
  sets: number;
  reps: number;
};

export async function updateExercise(data: UpdateExerciseParams) {
  await prisma.exercise.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      sets: data.sets,
      reps: data.reps,
    },
  });

  revalidatePath(`/workouts/${data.workoutId}`);
}
