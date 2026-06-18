import { prisma } from "@/src/lib/prisma";
import type { Workout } from "@/app/features/workouts/data/workouts";
import Link from "next/link";

export default async function WorkoutsPage() {
  const workouts: Workout[] = await prisma.workout.findMany();

  return (
    <div className="grid">
      {workouts.map((w: Workout) => (
        <Link href={`workouts/${w.id}`} key={w.id}>
          {w.name}
        </Link>
      ))}
    </div>
  );
}
