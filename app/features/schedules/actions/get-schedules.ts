"use server";

import { prisma } from "@/src/lib/prisma";

export async function getSchedules() {
  return prisma.workoutSchedule.findMany({
    include: {
      workout: {
        include: {
          exercises: true,
        },
      },
    },
    orderBy: {
      startAt: "asc",
    },
  });
}
