"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { Workout } from "../types/workouts";

export async function createWorkout(data: Workout) {
  await prisma.workout.create({
    data: {
      name: data.name,
      exercises: {
        create: data.exercises,
      },
    },
  });
  revalidatePath("/workouts");
}
