"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSchedule(data: {
  workoutId: string;
  startAt: string;
}) {
  await prisma.workoutSchedule.create({
    data: {
      workoutId: data.workoutId,
      startAt: new Date(data.startAt),
      status: "PLANNED",
    },
  });

  revalidatePath("/schedules/create");
}
