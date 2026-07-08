"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { workoutSchema } from "@/app/features/workouts/schemas/workout";

export async function updateWorkout(data: unknown) {
  const parsed = workoutSchema.parse(data);
  if (!parsed.id) throw new Error("Missing workout id");

  await prisma.$transaction([
    prisma.exercise.deleteMany({ where: { workoutId: parsed.id } }),
    prisma.workout.update({
      where: { id: parsed.id },
      data: {
        name: parsed.name,
        exercises: {
          create: parsed.exercises.map((ex) => ({
            order: ex.order,
            name: ex.name,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight,
          })),
        },
      },
    }),
  ]);

  revalidatePath("/workouts");
}
