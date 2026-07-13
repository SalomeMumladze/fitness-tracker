"use client";

import { useRouter } from "next/navigation";

import WorkoutDialog from "../../../components/WorkoutDialog";
import { WorkoutForm } from "../../../components/WorkoutForm";
import { updateWorkout } from "@/app/features/workouts/actions/updateWorkout";

type Props = {
  workout: {
    id: string;
    name: string;
    exercises: {
      id: string;
      name: string;
      sets: number;
      reps: number;
      weight: number;
      order: number;
    }[];
  };
};

export default function EditWorkoutModalClient({ workout }: Props) {
  const router = useRouter();

  async function handleSubmit(data: any) {
    await updateWorkout({
      ...data,
      id: workout.id,
    });

    router.back();
  }

  return (
    <WorkoutDialog
      open
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <WorkoutForm
        mode="edit"
        defaultValues={workout}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </WorkoutDialog>
  );
}
