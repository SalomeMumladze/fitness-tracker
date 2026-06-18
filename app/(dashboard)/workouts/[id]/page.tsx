import { prisma } from "@/src/lib/prisma";
import ExerciseList from "../components/ExerciseList";

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workout = await prisma.workout.findUnique({
    where: { id },
    include: {
      exercises: {},
    },
  });

  if (!workout) return <div>Workout not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{workout.name}</h1>
      </div>

      <ExerciseList workout={workout} exercises={workout.exercises} />
    </div>
  );
}
