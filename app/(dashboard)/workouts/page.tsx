import { prisma } from "@/src/lib/prisma";
import WorkoutsClient from "./components/WorkoutsClient";

export default async function WorkoutsPage() {
  const workouts = await prisma.workout.findMany({
    include: {
      exercises: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <WorkoutsClient workouts={workouts} />;
}
