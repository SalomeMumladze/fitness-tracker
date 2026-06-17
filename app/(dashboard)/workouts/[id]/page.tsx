import { workouts } from "@/app/features/workouts/data/workouts";

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workout = workouts.find((w) => w.id === id);

  if (!workout) {
    return <h1>Workout not found</h1>;
  }

  return <h1>{workout.name}</h1>;
}
