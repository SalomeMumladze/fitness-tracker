"use client";

import { deleteExercise } from "../actions/deleteExercise";

export default function DeleteExerciseButton({
  exerciseId,
  workoutId,
}: {
  exerciseId: string;
  workoutId: string;
}) {
  return (
    <button onClick={() => deleteExercise(exerciseId, workoutId)}>
      Delete
    </button>
  );
}
