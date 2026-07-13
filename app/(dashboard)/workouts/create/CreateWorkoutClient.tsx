"use client";

import { useRouter } from "next/navigation";
import { WorkoutForm } from "../components/WorkoutForm";

export default function CreateWorkoutClient() {
  const router = useRouter();

  return (
    <WorkoutForm
      mode="create"
      onSubmit={async () => {
        router.push("/workouts");
      }}
      onCancel={() => {
        router.push("/workouts");
      }}
    />
  );
}
