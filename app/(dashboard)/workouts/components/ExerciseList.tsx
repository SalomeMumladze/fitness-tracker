"use client";

import { useState } from "react";
import ExerciseCard from "./ExerciseCard";
import EditExerciseModal from "@/app/features/exercises/components/EditExerciseModal";
import EmptyState from "./EmptyState";
import NewExerciseForm from "@/app/features/exercises/components/NewExerciseForm";

export default function ExerciseList({ workout, exercises }: any) {
  const [editing, setEditing] = useState<any>(null);

  return (
    <div className="space-y-3">
      {exercises.length === 0 && <EmptyState />}

      {exercises.map((ex: any) => (
        <ExerciseCard key={ex.id} exercise={ex} onEdit={() => setEditing(ex)} />
      ))}

      <EditExerciseModal
        exercise={editing}
        workoutId={workout.id}
        onClose={() => setEditing(null)}
      />
      <NewExerciseForm workoutId={workout.id} />
    </div>
  );
}
