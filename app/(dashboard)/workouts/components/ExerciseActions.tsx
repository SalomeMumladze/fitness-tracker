"use client";

import { deleteExercise } from "@/app/features/exercises/actions/deleteExercise";

export default function ExerciseActions({ exercise, onEdit }: any) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
      >
        Edit
      </button>

      <button
        onClick={() => deleteExercise(exercise.id, exercise.workoutId)}
        className="px-3 py-1 text-sm bg-red-500 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
}
