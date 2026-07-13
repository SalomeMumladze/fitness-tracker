"use client";

import { useRouter } from "next/navigation";
import WorkoutDialog from "../../../components/WorkoutDialog";
import { WorkoutForm } from "../../../components/WorkoutForm";

export default function CreateWorkoutModal() {
  const router = useRouter();

  return (
    <WorkoutDialog
      open
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <WorkoutForm
        mode="create"
        onSubmit={async () => {
          router.back();
        }}
        onCancel={() => router.back()}
      />
    </WorkoutDialog>
  );
}
