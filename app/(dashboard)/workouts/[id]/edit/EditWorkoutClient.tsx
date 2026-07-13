"use client";

import { useRouter } from "next/navigation";
import { WorkoutForm } from "../../components/WorkoutForm";
import { updateWorkout } from "@/app/features/workouts/actions/updateWorkout";

export default function EditWorkoutClient({ workout }: { workout: any }) {
  const router = useRouter();

  async function handleSubmit(data: any) {
    await updateWorkout({
      ...data,
      id: workout.id,
    });

    router.push("/workouts");
  }

  return (
    <WorkoutForm
      mode="edit"
      defaultValues={workout}
      onSubmit={handleSubmit}
      onCancel={() => {
        router.push("/workouts");
      }}
    />
  );
}
