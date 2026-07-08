"use client";

import WorkoutForm from "../components/WorkoutForm/WorkoutForm";
import { createWorkout } from "@/app/features/workouts/actions/createWorkout";
import { Workout } from "@/app/features/workouts/types/workouts";

export default function NewWorkoutPage() {
  async function handleSubmit(data: Workout) {
    await createWorkout(data);
  }

  return <WorkoutForm onSubmit={handleSubmit} />;
}
