import { prisma } from "@/src/lib/prisma";
import type { Workout } from "@/app/features/workouts/data/workouts";

export default async function WorkoutsPage() {
  const workouts: Workout[] = await prisma.workout.findMany();

  return (
    <div>
      {workouts.map((w: Workout) => (
        <p key={w.id}>{w.name}</p>
      ))}
    </div>
  );
}
