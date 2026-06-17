"use server";

import { prisma } from "@/src/lib/prisma";

export async function createWorkout(name: string) {
  await prisma.workout.create({
    data: {
      name,
    },
  });
}
